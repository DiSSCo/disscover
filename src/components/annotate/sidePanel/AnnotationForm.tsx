/* Import Dependencies */
import { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { isEmpty, get } from 'lodash';
import KeycloakService from 'keycloak/Keycloak';
import Select, { OptionsOrGroups, SelectInstance } from 'react-select';
import { ConstructTargetPropertiesLists, ExtractFromSchema, SearchNestedLevels, CheckPathForRoot } from 'app/utilities/AnnotationUtilities';
import AnnotationFormBuilder from 'components/general/annotationFormBuilder/AnnotationFormBuilder';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getAnnotateTarget, setAnnotateTarget, getEditAnnotation, setHighlightAnnotationId
} from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { AnnotationTemplate, Dict } from 'app/Types';

/* Import Sources */
import AnnotationMotivations from 'sources/annotationMotivations.json';

/* Import API */
import InsertAnnotation from 'api/annotate/InsertAnnotation';
import PatchAnnotation from 'api/annotate/PatchAnnotation';

/* Import Components */
import FormTemplate from './form/FormTemplate';
import FormBottom from './form/FormBottom';
import ExistingInstance from './ExistingInstance';


/* Props Typing */
interface Props {
    UpdateAnnotationView: Function
};


const AnnotationForm = (props: Props) => {
    const { UpdateAnnotationView } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const targetFieldRef = useRef<SelectInstance>(null);

    /* Base variables */
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const editAnnotation = useAppSelector(getEditAnnotation);
    const annotationMotivations = { ...AnnotationMotivations };
    const [targetClassOptions, setTargetClassOptions] = useState<OptionsOrGroups<any, any>>();
    const [targetPropertyOptions, setTargetPropertyOptions] = useState<OptionsOrGroups<any, any>>();
    const [existingInstances, setExistingInstances] = useState<Dict[]>([]);
    const [initialValues, setInitialValues] = useState<Dict>({});
    const [classFormFields, setClassFormFields] = useState<Dict>({});

    /* Function to determine which field or class source to use */
    const DetermineFieldOrClass = () => {
        let targetField: string = '';
        let targetClass: string = '';
        let motivation: string | undefined = '';

        if (!isEmpty(editAnnotation)) {
            if (editAnnotation['oa:target']['oa:selector']?.['ods:field']) {
                targetField = editAnnotation['oa:target']?.['oa:selector']?.['ods:field'] as string;
            } else if (editAnnotation['oa:target']['oa:selector']?.['oa:class']) {
                targetClass = editAnnotation['oa:target']?.['oa:selector']?.['oa:class'] as string;
            }

            motivation = editAnnotation['oa:motivation'] as string;
        } else if (annotateTarget.targetProperty.type === 'field') {
            targetField = annotateTarget.targetProperty.name;
            motivation = annotateTarget.motivation;
        } else if (annotateTarget.targetProperty.type === 'class') {
            targetClass = annotateTarget.targetProperty.name;
            motivation = annotateTarget.motivation;
        }

        return {
            targetField: targetField,
            targetClass: targetClass,
            motivation: motivation
        }
    }

    /* OnLoad or change of Annotate Target: Prepare initial form values */
    useEffect(() => {
        let classProperties = {};
        let annotationValue: unknown[] = [];

        /* Determine presence of target field or class, and motivation */
        const { targetField, targetClass, motivation } = DetermineFieldOrClass();

        /* If annotating a class instance, grab all fields from schema */
        if (targetClass) {
            /* Get last class of path by removing indexes and dot notations */
            let classSchemaName: string = targetClass;

            if (classSchemaName.endsWith(']')) {
                classSchemaName = classSchemaName.split('[').shift() as string;
            } else {
                classSchemaName = classSchemaName.split(']').pop() as string;
                classSchemaName = classSchemaName.split('.').pop() as string;
            }

            const schemaProperties = ExtractFromSchema(classSchemaName);
            let propertyData: Dict[] | undefined = undefined;

            if (!isEmpty(editAnnotation)) {
                propertyData = [JSON.parse(editAnnotation['oa:body']['oa:value'][0] as string)[targetClass.replace('$.', '')]] as Dict[];
            } else if (!isEmpty(annotateTarget.currentValue)) {
                propertyData = annotateTarget.currentValue as Dict[];
            } else if (get(annotateTarget.target, targetClass)) {
                propertyData = [get(annotateTarget.target, targetClass)] as Dict[];
            }

            const classForm = AnnotationFormBuilder(schemaProperties, targetClass, propertyData);

            classProperties = classForm.initialValues;

            /* Set Class form fields */
            setClassFormFields(classForm.formFields);
        } else {
            annotationValue = !isEmpty(editAnnotation) ? editAnnotation['oa:body']['oa:value'] : get(annotateTarget.target, targetField) as unknown[];
        }

        /* Set initial form values */
        setInitialValues({
            targetField: targetField,
            targetClass: targetClass,
            motivation: motivation,
            annotationValue: annotationValue,
            additionalFields: {
                ...(!isEmpty(editAnnotation) && editAnnotation['oa:body']['dcterms:reference'] && { reference: editAnnotation['oa:body']['dcterms:reference'] })
            },
            classProperties: classProperties
        });
    }, [annotateTarget]);

    /* OnLoad: Get all available classes and properties of target */
    useEffect(() => {
        const propertyLists = ConstructTargetPropertiesLists(annotateTarget.targetType);

        setTargetClassOptions(propertyLists.classes);
        setTargetPropertyOptions(propertyLists.properties);
    }, []);

    /* Function for checking for existing instances */
    const CheckInstances = (option: { label: string, value: string }, targetType: string = 'field') => {
        const existingInstances: Dict[] = [];

        /* Function to push to existing instances */
        const PushToExistingInstances = (instance: Dict) => {
            existingInstances.push(instance);
        }

        const CheckForExistingInstances = (nestingLevels: string[]) => {
            const parentLevel: string = nestingLevels[nestingLevels.length - 2];
            let localNestingLevels = [...nestingLevels];
            let localTargetType: string = targetType;

            /* If target type is field and parent class is present: search for existing instances of parent class */
            if (parentLevel && targetType === 'field') {
                nestingLevels.splice(nestingLevels.length - 1);

                localTargetType = 'class';
            }

            if (['DigitalSpecimen', 'DigitalMedia'].includes(nestingLevels[0])) {
                nestingLevels.shift();
            }

            /* Search nested levels for all instances of class */
            SearchNestedLevels(annotateTarget.target, nestingLevels, localTargetType, PushToExistingInstances);

            /* Splice last index from local nesting levels for parent class validation */
            localNestingLevels.splice(localNestingLevels.length - 1);

            return localNestingLevels;
        }

        /* Determine class or field property */
        if (option.value) {
            let nestingLevels: string[] = [];
            let localNestingLevels: string[] | undefined;

            /* Determine property indicator, keep nesting in mind */
            if (option.value.includes('.')) {
                nestingLevels = option.value.split('.');
            } else {
                nestingLevels.push(option.value);
            }

            do {
                localNestingLevels = CheckForExistingInstances(localNestingLevels ?? nestingLevels);
            } while (isEmpty(existingInstances) && targetType === 'field');

            /* Continue with current level of existing (parent) classes */
            setExistingInstances(existingInstances);
        } else {
            setExistingInstances([]);
        }
    }

    /* Function for refining properties based upon chosen class */
    const RefineProperties = (classValue: string, fieldValue: string, SetFieldValue: Function) => {
        const propertyLists = ConstructTargetPropertiesLists(annotateTarget.targetType, classValue, fieldValue);

        /* If property no longer in new class selection, reset property field */
        if (fieldValue && !propertyLists.fieldAdheres) {
            SetFieldValue('targetField', '');

            /* Reset React Select value of target field */
            targetFieldRef?.current?.clearValue();
        }

        setTargetPropertyOptions(propertyLists.properties);
    }

    /* Function for intiating the addition of a new instance with annotation */
    const AnnotateNewInstance = (targetPropertyType: string, targetPropertyName: string) => {
        const copyAnnotateTarget = { ...annotateTarget };

        /* Set Annotate target to chosen class or property */
        copyAnnotateTarget.targetProperty = {
            type: targetPropertyType,
            name: targetPropertyName
        }

        /* Set Annotate target motivation */
        copyAnnotateTarget.motivation = 'ods:adding';

        dispatch(setAnnotateTarget(copyAnnotateTarget));
    }

    const CraftAnnotation = (form: Dict, bodyValue: (string | Dict)[], targetType: string, targetPath?: string, ) => {
        /* Prepare new Annotation object */
        const annotation: AnnotationTemplate = {
            ...(!isEmpty(editAnnotation) && { "ods:id": editAnnotation['ods:id'] }),
            "oa:motivation": form.motivation,
            "oa:target": {
                "ods:id": annotateTarget.target['ods:id'],
                "ods:type": annotateTarget.target['ods:type'] as string ?? annotateTarget.targetType,
                ...((form.targetField || form.targetClass) && {
                    "oa:selector": {
                        "ods:type": form.targetField ? "FieldSelector" : "ClassSelector",
                        ...(form.targetField && { "ods:field": targetPath }),
                        ...(form.targetClass && { "oa:class": targetPath })
                    }
                })
            },
            "oa:body": {
                "ods:type": targetType,
                "oa:value": bodyValue,
                ...(!isEmpty(form.additionalFields) && { ...form.additionalFields }),
            }
        };

        return annotation;
    }

    /* Function for submitting a new Annotation */
    const SubmitAnnotation = (form: Dict) => {
        /* Define type of target property: field or class */
        const targetType = form.targetField ? 'FieldSelector' : 'ClassSelector';

        /* Define value of body */
        const bodyValue: (string | Dict)[] = [];
        let targetPath: string | undefined;

        /* If annotationValue is present, use that as the field, otherwise expect a class to be annotated */
        if (form.annotationValue && form.targetField) {
            bodyValue.push(form.annotationValue);

            targetPath = form.targetField.replace('DigitalSpecimen.', '').replace('DigitalMedia.', '') as string;

            targetPath = CheckPathForRoot(targetPath);
        } else if (form.targetClass) {
            targetPath = form.targetClass as string;

            bodyValue.push(JSON.stringify({ [targetPath.replace('$.', '')]: form.classProperties }));

            targetPath = CheckPathForRoot(targetPath);
        } else {
            bodyValue.push(form.annotationValue);
        }

        /* Craft Annotation */
        const annotation = CraftAnnotation(form, bodyValue, targetType, targetPath);

        /* Check if to post or patch */
        if (!isEmpty(editAnnotation)) {
            /* Patch Annotation */
            PatchAnnotation(annotation, editAnnotation['ods:id'], KeycloakService.GetToken()).then((annotation) => {
                UpdateAnnotationView(annotation);

                dispatch(setHighlightAnnotationId(annotation['ods:id']));
            }).catch(error => {
                console.warn(error);
            });
        } else {
            /* Post Annotation */
            InsertAnnotation(annotation, KeycloakService.GetToken()).then((annotation) => {
                UpdateAnnotationView(annotation);

                dispatch(setHighlightAnnotationId(annotation['ods:id']));
            }).catch(error => {
                console.warn(error);
            });
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (form) => {
                await new Promise((resolve) => setTimeout(resolve, 500));

                /* Submit new Annotation */
                SubmitAnnotation(form);
            }}
        >
            {({ values, setFieldValue }) => (
                <Form className="h-100 d-flex flex-column overflow-hidden">
                    {/* Initial form fields: target property and, or class; and motivation */}
                    <Row>
                        <Col>
                            {/* If not present, choose a Target Class or Property */}
                            {(!annotateTarget.targetProperty.name && annotateTarget.targetProperty.type !== 'superClass') && isEmpty(editAnnotation) &&
                                <Row className="mt-5">
                                    <Col>
                                        <p className="formFieldTitle fs-3"> Select the target of your annotation </p>
                                        <p className="fs-4">
                                            Annotations target parts of a digital object. <br />
                                            These consist out of classes and fields, each class holds fields. <br />
                                            The digital object functions as a super class, which can also be targeted. <br />
                                            Classes can contain sub classes, which can contain even more classes, and so on.
                                        </p>

                                        <button type="button" className="secondaryButton fs-4 px-3 py-1 mt-3"
                                            onClick={() => {
                                                const copyAnnotateTarget = { ...annotateTarget };

                                                copyAnnotateTarget.targetProperty = {
                                                    name: '',
                                                    type: 'superClass'
                                                };

                                                dispatch(setAnnotateTarget(copyAnnotateTarget));
                                            }}
                                        >
                                            Make annotation on whole {annotateTarget.targetType}
                                        </button>

                                        <p className="formFieldTitle fs-3 mt-3"> Select Class or Property </p>

                                        <Select options={targetClassOptions}
                                            className="mt-2"
                                            onChange={(option: any) => {
                                                if (option) {
                                                    setFieldValue('targetClass', option?.value);
                                                    CheckInstances(option as unknown as { label: string, value: string }, 'class');
                                                    RefineProperties(option?.value as string, values.targetField, setFieldValue);
                                                }
                                            }}
                                        />

                                        <Select options={targetPropertyOptions}
                                            ref={targetFieldRef}
                                            className="mt-2"
                                            onChange={(option: any) => {
                                                if (option) {
                                                    setFieldValue('targetField', option.value as string);
                                                    CheckInstances(option as unknown as { label: string, value: string }, 'field');
                                                }
                                            }}
                                        />
                                    </Col>
                                </Row>
                            }
                            {/* Motivation */}
                            {(annotateTarget.targetProperty.name || annotateTarget.targetProperty.type === 'superClass') &&
                                <Row className="mt-3">
                                    <Col>
                                        <p className="formFieldTitle pb-1"> Annotation type </p>
                                        <Field name="motivation" as="select"
                                            className="formField w-100"
                                            disabled={annotateTarget.motivation && values.motivation}
                                        >
                                            <option value="" disabled={true}>
                                                Select annotation type
                                            </option>

                                            {Object.keys(annotationMotivations).map((motivation) => {
                                                const motivationObject = annotationMotivations[motivation as keyof typeof annotationMotivations];

                                                return (
                                                    <option key={motivation} value={motivation}>
                                                        {motivationObject.displayName}
                                                    </option>
                                                );
                                            })}
                                        </Field>
                                    </Col>
                                </Row>
                            }
                        </Col>
                    </Row>
                    {/* Generate Annotation form, based on chosen motivation */}
                    <Row className={`${(values.motivation || annotateTarget.motivation) && 'flex-grow-1 overflow-hidden'} mt-3`}>
                        <Col className="h-100">
                            {(values.motivation || annotateTarget.motivation) &&
                                <FormTemplate motivation={annotateTarget.motivation ? annotateTarget.motivation : values.motivation}
                                    classValue={values.targetClass ? values.targetClass : ''}
                                    formValues={values}
                                    classFormFields={classFormFields}
                                />
                            }
                        </Col>
                    </Row>
                    {/* Existing instances */}
                    {(!isEmpty(existingInstances) && !annotateTarget.targetProperty.name) &&
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        {values.targetField ?
                                            <p className="fs-3 fw-lightBold"> Existing instances of property </p>
                                            : <p className="fs-3 fw-lightBold"> Existing instances of class </p>
                                        }
                                    </Col>
                                </Row>
                                <Row className="overflow-y-scroll mt-2">
                                    <Col>
                                        {existingInstances.map((existingInstance, index) => {
                                            const key = `instance-${index}`;

                                            return <ExistingInstance key={key}
                                                targetPropertyName={values.targetField ? values.targetField : values.targetClass}
                                                targetPropertyType={values.targetField ? 'field' : 'class'}
                                                instance={existingInstance}
                                                index={index}
                                            />;
                                        })}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    }
                    <FormBottom values={values}
                        AnnotateNewInstance={(targetPropertyType: string, targetPropertyName: string) => AnnotateNewInstance(targetPropertyType, targetPropertyName)}
                    />
                </Form>
            )}
        </Formik >
    );
}

export default AnnotationForm;
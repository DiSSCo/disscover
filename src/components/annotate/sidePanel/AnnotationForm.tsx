/* Import Dependencies */
import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { isEmpty } from 'lodash';
import KeycloakService from 'keycloak/Keycloak';
import Select, {OptionsOrGroups} from 'react-select';
import ConstructTargetPropertiesLists from 'app/utilities/ConstructTargetPropertyLists';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getAnnotateTarget, setAnnotateTarget, getEditAnnotation, setAnnotationFormToggle,
    setEditAnnotation, setHighlightAnnotationId
} from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { AnnotationTemplate, Dict } from 'app/Types';
import { Annotation } from 'app/types/Annotation';

/* Import Sources */
import AnnotationMotivations from 'sources/annotationMotivations.json';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/* Import API */
import InsertAnnotation from 'api/annotate/InsertAnnotation';
import PatchAnnotation from 'api/annotate/PatchAnnotation';

/* Import Components */
import FormTemplate from './form/FormTemplate';
import ExistingInstance from './ExistingInstance';


/* Props Typing */
interface Props {
    UpdateAnnotationView: Function
};


const AnnotationForm = (props: Props) => {
    const { UpdateAnnotationView } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const editAnnotation = useAppSelector(getEditAnnotation);
    const annotationMotivations = { ...AnnotationMotivations };
    const [targetClassOptions, setTargetClassOptions] = useState<OptionsOrGroups<any, any>>();
    const [targetPropertyOptions, setTargetPropertyOptions] = useState<OptionsOrGroups<any, any>>();
    const [existingInstances, setExistingInstances] = useState<Dict[]>([]);
    let targetField: string = '';
    let targetClass: string = '';
    let motivation: string = '';

    /* OnLoad: Get all available classes and properties of target */
    useEffect(() => {
        const propertyLists = ConstructTargetPropertiesLists();

        console.log(propertyLists.properties);

        setTargetClassOptions(propertyLists.classes);
        setTargetPropertyOptions(propertyLists.properties);
    }, []);

    /* Determine presence of target field or class */
    if (!isEmpty(editAnnotation)) {
        targetField = editAnnotation['oa:target']['oa:selector']?.['ods:field'] as string;
        motivation = editAnnotation['oa:motivation'] as string;
    } else if (annotateTarget.targetProperty.type === 'field') {
        targetField = annotateTarget.targetProperty.name;
    } else if (annotateTarget.targetProperty.type === 'class') {
        targetClass = annotateTarget.targetProperty.name;
    }

    /* Determine motivation */
    if (annotateTarget.motivation) {
        motivation = annotateTarget.motivation;
    }

    /* Function for searching in nested levels */
    const SearchNestedLevels = (level: Dict | Dict[], nestingLevels: string[], PushToExistingInstances: Function) => {
        /* Check type of level */
        if (!(Array.isArray(level)) && nestingLevels.length) {
            const localLevel = level as Dict;
            const nextLevel: Dict[] = localLevel[nestingLevels[0]] as Dict[];
            nestingLevels.shift();

            SearchNestedLevels(nextLevel, nestingLevels, PushToExistingInstances);
        } else if (Array.isArray(level) && nestingLevels.length) {
            level.forEach((nextLevel: Dict) => {
                SearchNestedLevels(nextLevel, nestingLevels, PushToExistingInstances);
            });
        } else if (Array.isArray(level)) {
            level.forEach((instance: Dict) => {
                PushToExistingInstances(instance as Dict);
            });
        } else {
            PushToExistingInstances(level as Dict);
        }
    }

    /* Function for checking existing instances */
    const CheckInstances = (option: { label: string, value: string }, targetType: string = 'field') => {
        const existingInstances: Dict[] = [];

        /* Function to push to existing instances */
        const PushToExistingInstances = (instance: Dict) => {
            existingInstances.push(instance);
        }

        /* Determine class or field property */
        if (targetType === 'class') {
            let nestingLevels: string[] = [];

            /* Determine property indicator, keep nesting in mind */
            if (option.value.includes('_')) {
                nestingLevels = option.value.split('_');
            } else {
                nestingLevels.push(option.value);
            }

            /* Search nested levels for all instances of class */
            SearchNestedLevels(annotateTarget.target, nestingLevels, PushToExistingInstances);

            setExistingInstances(existingInstances);
        } else {

        }
    }

    /* Function for refining properties based upon chosen class */
    const RefineProperties = (classValue: string) => {
        const propertyLists = ConstructTargetPropertiesLists(annotateTarget.targetType, classValue);

        console.log(propertyLists.properties);
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

    /* Function for submitting a new Annotation */
    const SubmitAnnotation = (form: Dict) => {
        /* Prepare new Annotation object */
        const annotation: AnnotationTemplate = {
            ...(!isEmpty(editAnnotation) && { "ods:id": editAnnotation['ods:id'] }),
            "oa:motivation": form.motivation,
            "oa:target": {
                "ods:id": annotateTarget.target['ods:id'],
                "ods:type": annotateTarget.targetType,
                "oa:selector": {
                    "ods:type": "FieldSelector",
                    "ods:field": form.targetProperty
                }
            },
            "oa:body": {
                "ods:type": form.targetProperty,
                "oa:value": [form.annotationValue],
                ...(!isEmpty(form.additionalFields) && { ...form.additionalFields }),
            }
        };

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
            initialValues={{
                targetClass: targetClass,
                targetField: targetField,
                motivation: motivation,
                annotationValue: !isEmpty(editAnnotation) ? editAnnotation['oa:body']['oa:value'] : '',
                additionalFields: {
                    ...(!isEmpty(editAnnotation) && editAnnotation['oa:body']['dcterms:reference'] && { reference: editAnnotation['oa:body']['dcterms:reference'] })
                }
            }}
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
                            {!annotateTarget.targetProperty.name && isEmpty(editAnnotation) &&
                                <Row className="mt-5">
                                    <Col>
                                        <p className="fs-3 formFieldTitle"> Select Class or Property </p>

                                        <Select options={targetClassOptions}
                                            className="mt-2"
                                            onChange={(option: any) => {
                                                setFieldValue('targetClass', option?.value);
                                                CheckInstances(option as unknown as { label: string, value: string }, 'class');
                                                RefineProperties(option?.value as string);
                                            }}
                                        />

                                        <Select options={targetPropertyOptions}
                                            className="mt-2"
                                            onChange={(option: any) => {
                                                setFieldValue('targetField', option.value as string);
                                                CheckInstances(option as unknown as { label: string, value: string }, 'field');
                                            }}
                                        />
                                    </Col>
                                </Row>
                            }
                            {/* Motivation */}
                            {annotateTarget.targetProperty.name &&
                                <Row className="mt-3">
                                    <Col>
                                        <p className="formFieldTitle pb-1"> Annotation type </p>
                                        <Field name="motivation" as="select"
                                            className="formField w-100" disabled={annotateTarget.motivation && values.motivation}
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
                        <Col>
                            {(values.motivation || annotateTarget.motivation) &&
                                <FormTemplate motivation={annotateTarget.motivation ? annotateTarget.motivation : values.motivation} />
                            }
                        </Col>
                    </Row>
                    {/* Existing instances */}
                    {(!isEmpty(existingInstances) && !annotateTarget.targetProperty.name) &&
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <p className="fs-3 fw-lightBold"> Existing instances of class </p>
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
                    {/* Annotate new instance of class button */}
                    {(values.targetClass && !annotateTarget.targetProperty.name) &&
                        <Row className="flex-grow-1 py-3">
                            <Col>
                                <button type="button" className="secondaryButton w-100"
                                    onClick={() => AnnotateNewInstance(
                                        values.targetField ? 'field' : 'class',
                                        values.targetField ? values.targetField : values.targetClass
                                    )}
                                >
                                    Annotate new instance of class

                                    <FontAwesomeIcon icon={faPlus} className="mx-2" />
                                </button>
                            </Col>
                        </Row>
                    }
                    {/* Submit Button */}
                    <Row className={`${(!values.motivation && !annotateTarget.motivation) && 'flex-grow-1 align-items-end'}`}>
                        <Col>
                            <button type="button"
                                className="primaryButton cancel px-4 py-1"
                                onClick={() => {
                                    dispatch(setEditAnnotation({} as Annotation));
                                    dispatch(setAnnotationFormToggle(false));
                                }}
                            >
                                Cancel
                            </button>
                        </Col>
                        <Col className="col-md-auto">
                            <button type="submit"
                                className={`primaryButton ${(!values.motivation || !values.annotationValue) && 'disabled'} px-4 py-1`}
                                disabled={(!values.motivation || !values.annotationValue)}
                            >
                                Save
                            </button>
                        </Col>
                    </Row>
                </Form>
            )
            }
        </Formik >
    );
}

export default AnnotationForm;
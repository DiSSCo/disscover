/* Import Dependencies */
import { isEmpty, cloneDeep } from 'lodash';
import jp from 'jsonpath';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Utitlties */
import { GenerateAnnotationFormFieldProperties, GetAnnotationMotivations } from "app/utilities/AnnotateUtilities";

/* Import Hooks */
import { useAppSelector, useTrigger } from "app/Hooks";

/* Import Store */
import { getAnnotationTarget } from 'redux-store/AnnotateSlice';

/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";
import { DigitalMedia } from "app/types/DigitalMedia";
import { AnnotationFormProperty, Dict, DropdownItem } from "app/Types";

/* Import Components */
import AnnotationFormSegment from './AnnotationFormSegment';
import { Dropdown, InputTextArea } from "components/elements/customUI/CustomUI";


/* Props Type */
type Props = {
    superClass: DigitalSpecimen | DigitalMedia | Dict,
    schemaName: string,
    formValues?: Dict,
    SetFieldValue?: Function,
    SetFormValues?: Function
};


/**
 * Component that renders the third and final step in the annotation wizard for defining the motivation and actual values
 * @param superClass The selected digital object
 * @param schemaName The name of the 
 * @param formValues The values of the annotation form
 * @param SetFieldValue Funtion to set a value to a single field in the form
 * @param SetFormValues Function to set all of the values in the form
 * @returns JSX Component
 */
const AnnotationFormStep = (props: Props) => {
    const { superClass, schemaName, formValues, SetFieldValue, SetFormValues } = props;

    /* Hooks */
    const trigger = useTrigger();

    /* Base variables */
    const annotationTarget = useAppSelector(getAnnotationTarget);
    const [annotationFormFieldProperties, setAnnotationFormFieldProperties] = useState<{ [propertyName: string]: AnnotationFormProperty }>({});
    const annotationMotivations = GetAnnotationMotivations(formValues?.motivation, annotationTarget?.type);
    let baseObjectFormFieldProperty: AnnotationFormProperty | undefined;
    let subClassObjectFormFieldProperties: Dict = {};

    /* Construct annotation motivation dropdown items */
    const annotationMotivationDropdownItems: DropdownItem[] = Object.entries(annotationMotivations).map(([value, label]) => ({
        label,
        value
    }));

    /* OnLoad, generate field properties for annotation form */
    trigger.SetTrigger(() => {
        if (formValues) {
            /* Either take JSON path from form values or the annotation target (when editing an annotation) */
            let jsonPath: string = formValues.jsonPath ?? annotationTarget?.jsonPath;
            let localSuperClass: DigitalSpecimen | DigitalMedia | Dict = cloneDeep(superClass);

            console.log(annotationTarget?.annotation?.values?.[0]);

            if (annotationTarget?.annotation && jsonPath === '$') {

            } else if (annotationTarget?.annotation) {
                console.log(jp.value(superClass, jsonPath));

                const currentValue = jp.value(superClass, jsonPath);
                const count: number | undefined = Array.isArray(currentValue) ? currentValue.length : undefined;

                console.log(count);

                jsonPath = `${jsonPath}${count ? `[${count}]` : ''}`;

                jp.value(localSuperClass, jsonPath, JSON.parse(annotationTarget.annotation.values[0]));
            }

            console.log(jsonPath);
            console.log(localSuperClass);

            /* For selected class, get annotation form field properties and their values */
            GenerateAnnotationFormFieldProperties(jsonPath, localSuperClass, schemaName).then(({ annotationFormFieldProperties, newFormValues }) => {
                console.log(newFormValues);
                console.log(formValues.annotationValues);

                /* Set form values state with current values, based upon annotation form field properties */
                const newSetFormValues = {
                    ...formValues,
                    annotationValues: {
                        ...newFormValues,
                        ...formValues.annotationValues
                    },
                    /* Set JSON path from this checkpoint if editing an annotation */
                    ...(annotationTarget?.annotation && {
                        jsonPath: jsonPath,
                        motivation: annotationTarget.annotation.motivation
                    })
                };

                /* Set form values */
                SetFormValues?.(newSetFormValues);

                /* Set annotation form field properties */
                setAnnotationFormFieldProperties(annotationFormFieldProperties);
            });
        }
    }, []);

    /* From annotation form field properties, extract base object and its properties */
    if (!isEmpty(annotationFormFieldProperties) && formValues) {
        baseObjectFormFieldProperty = Object.values(annotationFormFieldProperties).find(annotationFormFieldProperty => annotationFormFieldProperty.jsonPath === formValues.jsonPath);

        /* From annotation form field properties, extract sub class objects and their properties */
        Object.values(annotationFormFieldProperties).filter(
            annotationFormFieldProperty => annotationFormFieldProperty.jsonPath !== formValues.jsonPath
        ).forEach(annotationFormFieldProperty => {
            const jsonPath = `$${annotationFormFieldProperty.jsonPath.replace(baseObjectFormFieldProperty?.jsonPath ?? '', '')}`;

            let parentPath: string = '$';
            let localExtendedPath: string = '';

            jp.parse(jsonPath).slice(1, -1).forEach(pathSegment => {
                parentPath = parentPath.concat(`['${pathSegment.expression.value}']['properties']`);
            });

            if (parentPath.split('properties').length >= 3) {
                let properties: boolean = false;

                jp.parse(parentPath).forEach(pathSegment => {
                    let path = pathSegment.expression.value;

                    let index: number | undefined;

                    if (path === 'properties') {
                        properties = true;
                    } else if (properties) {
                        /* Find index of sub class in parent properties array */
                        index = jp.value(subClassObjectFormFieldProperties, localExtendedPath)?.findIndex((fieldProperty: AnnotationFormProperty) =>
                            jp.parse(fieldProperty.jsonPath).pop().expression.value === path
                        );

                        properties = false;
                    }

                    if (typeof (index) !== 'undefined' && index >= 0) {
                        localExtendedPath = localExtendedPath.concat(`[${index}]`);
                    } else {
                        localExtendedPath = localExtendedPath.concat(path === '$' ? '$' : `['${path}']`);
                    }
                });
            }

            if (parentPath !== '$') {
                /* Remove last properties part from parent path and treat as local path */
                const localPath: string = localExtendedPath ? localExtendedPath.split('[').slice(0, -1).join('[') : parentPath.split('[').slice(0, -1).join('[');

                jp.value(subClassObjectFormFieldProperties, localPath, {
                    ...jp.value(subClassObjectFormFieldProperties, localPath),
                    properties: [
                        ...(jp.value(subClassObjectFormFieldProperties, `${localPath}['properties']`) ?? []),
                        annotationFormFieldProperty
                    ]
                });
            } else {
                /* Create local path for parent sub class */
                const localPath: string = jp.parse(jsonPath).pop().expression.value;

                subClassObjectFormFieldProperties = {
                    ...subClassObjectFormFieldProperties,
                    [localPath]: annotationFormFieldProperty
                };
            }
        });
    }

    return (
        <div className="h-100 d-flex flex-column">
            {/* Annotation motivation, will be disabled if pre defined by instance selection */}
            <Row>
                <Col>
                    <p>
                        What motivates you to make this annotation?
                    </p>

                    <Row className="mt-3">
                        <Col>
                            <Dropdown items={annotationMotivationDropdownItems}
                                selectedItem={formValues?.motivation && {
                                    label: annotationMotivations[formValues.motivation as keyof typeof annotationMotivations],
                                    value: formValues.motivation
                                }}
                                placeholder="Select a motivation"
                                disabled={formValues?.motivation === 'ods:adding' || !!annotationTarget?.annotation}
                                styles={{
                                    background: '#ffffff',
                                    border: true,
                                    borderRadius: '8px'
                                }}
                                OnChange={(option: {
                                    label: string,
                                    value: string
                                }) => {
                                    SetFieldValue?.('motivation', option.value)
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* Annotation form properties */}
            <Row className="mt-3">
                <Col>
                    <p>
                        {(['ods:adding', 'oa:editing'].includes(formValues?.motivation) && annotationTarget?.type === 'class') ?
                            'Specify which value(s) you want to annotate'
                            : 'Write your annotation value'
                        }
                    </p>
                </Col>
            </Row>
            <Row className="flex-grow-1 mt-3 overflow-scroll">
                <Col>
                    {/* If motivation is either adding or editing, render the complete digital object as a form, else a generic text area */}
                    {(annotationFormFieldProperties && formValues && ['ods:adding', 'oa:editing'].includes(formValues.motivation) && annotationTarget?.type === 'class') ?
                        <>
                            {/* Render base class' form fields */}
                            {baseObjectFormFieldProperty &&
                                <AnnotationFormSegment annotationFormFieldProperty={baseObjectFormFieldProperty}
                                    formValues={formValues}
                                />
                            }
                            {!isEmpty(subClassObjectFormFieldProperties) &&
                                <>
                                    <p className="fs-4 fw-lightBold mb-2">
                                        {`Sub classes of ${baseObjectFormFieldProperty?.name}`}
                                    </p>
                                    {Object.entries(subClassObjectFormFieldProperties).map(([key, annotationFormFieldProperty]) => {
                                        return (
                                            <AnnotationFormSegment key={key}
                                                annotationFormFieldProperty={annotationFormFieldProperty}
                                                formValues={formValues}
                                            />
                                        );
                                    })}
                                </>
                            }
                        </>
                        : <InputTextArea name="annotationValues.value" />
                    }
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationFormStep;
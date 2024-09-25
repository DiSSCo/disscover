/* Import Dependencies */
import { isEmpty } from 'lodash';
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
    formValues?: Dict,
    SetFieldValue?: Function,
    SetFormValues?: Function
};


/**
 * Component that renders the third and final step in the annotation wizard for defining the motivation and actual values
 * @param superClass The selected digital object
 * @param formValues The values of the annotation form
 * @param SetFieldValue Funtion to set a value to a single field in the form
 * @param SetFormValues Function to set all of the values in the form
 * @returns JSX Component
 */
const AnnotationFormStep = (props: Props) => {
    const { superClass, formValues, SetFieldValue, SetFormValues } = props;

    /* Hooks */
    const trigger = useTrigger();

    /* Base variables */
    const annotationTarget = useAppSelector(getAnnotationTarget);
    const [annotationFormFieldProperties, setAnnotationFormFieldProperties] = useState<{ [propertyName: string]: AnnotationFormProperty }>({});
    const annotationMotivations = GetAnnotationMotivations(formValues?.motivation);
    let baseObjectFormFieldProperty: AnnotationFormProperty | undefined;
    let subClassObjectFormFieldProperties: AnnotationFormProperty[] = [];

    /* Construct annotation motivation dropdown items */
    const annotationMotivationDropdownItems: DropdownItem[] = Object.entries(annotationMotivations).map(([value, label]) => ({
        label,
        value
    }));

    /* OnLoad, generate field properties for annotation form */
    trigger.SetTrigger(() => {
        if (formValues) {
            /* For selected class, get annotation form field properties and their values */
            GenerateAnnotationFormFieldProperties(formValues.jsonPath, superClass).then(({ annotationFormFieldProperties, newFormValues }) => {
                /* Set form values state with current values, based upon annotation form field properties */
                const newSetFormValues = {
                    ...formValues,
                    annotationValues: {
                        ...newFormValues,
                        ...formValues.annotationValues,
                    }
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
        subClassObjectFormFieldProperties = Object.values(annotationFormFieldProperties).filter(
            annotationFormFieldProperty => annotationFormFieldProperty.jsonPath !== formValues.jsonPath
        );
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
                                disabled={formValues?.motivation === 'ods:adding'}
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
                                    {/* Render optional, additional sub classes' form fields, if present */}
                                    {subClassObjectFormFieldProperties.sort(
                                        (a) => a.type !== 'object' ? 1 : 0
                                    ).map(
                                        annotationFormFieldProperty => (
                                            <AnnotationFormSegment key={annotationFormFieldProperty.jsonPath}
                                                annotationFormFieldProperty={annotationFormFieldProperty}
                                                formValues={formValues}
                                            />
                                        )
                                    )}
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
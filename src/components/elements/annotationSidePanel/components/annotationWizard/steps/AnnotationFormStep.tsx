/* Import Dependencies */
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Utitlties */
import { GenerateAnnotationFormFieldProperties, GetAnnotationMotivations } from "app/utilities/AnnotateUtilities";

/* Import Hooks */
import { useAppSelector, useTrigger } from "app/Hooks";

/* Import Store */
import { getAnnotationTarget } from "redux-store/AnnotateSlice";

/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";
import { DigitalMedia } from "app/types/DigitalMedia";
import { AnnotationFormProperty, Dict, DropdownItem } from "app/Types";

/* Import Components */
import AnnotationFormSegment from './AnnotationFormSegment';
import { Dropdown } from "components/elements/customUI/CustomUI";


/* Props Type */
type Props = {
    schema: Dict,
    superClass: DigitalSpecimen | DigitalMedia | Dict,
    formValues?: Dict,
    SetFieldValue?: Function
};


/**
 * Component that renders the third and final step in the annotation wizard for defining the motivation and actual values
 * @returns JSX Component
 */
const AnnotationFormStep = (props: Props) => {
    const { schema, superClass, formValues, SetFieldValue } = props;

    /* Hooks */
    const trigger = useTrigger();

    /* Base variables */
    const annotationTarget = useAppSelector(getAnnotationTarget);
    const [annotationFormFieldProperties, setAnnotationFormFieldProperties] = useState<{ [propertyName: string]: AnnotationFormProperty }>();
    const annotationMotivations = GetAnnotationMotivations();
    let baseObjectFormFieldProperty: AnnotationFormProperty | undefined;

    /* Construct annotation motivation dropdown items */
    const annotationMotivationDropdownItems: DropdownItem[] = Object.entries(annotationMotivations).map(([value, label]) => ({
        label,
        value
    }));

    /* OnLoad, generate field properties for annotation form */
    trigger.SetTrigger(() => {
        if (formValues) {
            GenerateAnnotationFormFieldProperties(formValues.jsonPath, superClass, schema.title).then(annotationFormFieldProperties => {
                setAnnotationFormFieldProperties(annotationFormFieldProperties);
            });
        }
    }, []);

    /* OnChange of annotation form field properties, check for existing values within super class and append to annotation form */
    // trigger.SetTrigger(() => {
    //     const annotationValues: Dict = {};

    //     /* For each class, add potential form values as placeholders, if possible with existing values */
    //     annotationFormFieldProperties.forEach()

    //     console.log(annotationFormFieldProperties);
    // }, [annotationFormFieldProperties]);

    /* From annotation form field properties, extract base object and its properties */
    if (annotationFormFieldProperties && formValues) {
        baseObjectFormFieldProperty = Object.values(annotationFormFieldProperties).find(annotationFormFieldProperty => annotationFormFieldProperty.jsonPath === formValues.jsonPath);
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
                        Specify which value(s) you want to annotate
                    </p>
                </Col>
            </Row>
            <Row className="flex-grow-1 mt-3 overflow-scroll">
                <Col>
                    {(annotationFormFieldProperties && formValues) ?
                        <>
                            {/* Render base class' form fields */}
                            {baseObjectFormFieldProperty &&
                                <AnnotationFormSegment annotationFormFieldProperty={baseObjectFormFieldProperty}
                                    formValues={formValues}
                                />
                            }
                            <p className="fs-4 fw-lightBold mb-2">
                                {`Sub classes of ${baseObjectFormFieldProperty?.name}`}
                            </p>
                            {/* Render optional, additional sub classes' form fields */}
                            {Object.values(annotationFormFieldProperties).filter(
                                annotationFormFieldProperty => annotationFormFieldProperty.jsonPath !== formValues.jsonPath
                            ).sort(
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
                        : <p>Loading</p>
                    }
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationFormStep;
/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Field, FieldArray } from 'formik';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { AnnotationFormProperty, Dict } from 'app/Types';

/* Import Icons */
import { faChevronUp, faChevronDown, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    annotationFormFieldProperty: AnnotationFormProperty,
    formValues?: Dict,
    index?: number,
    Remove?: Function
};


/**
 * Component that returns a segment of the annotation form based upon the provided annotation form field property
 * @param annotationFormFieldProperty The annotation form field property (and its children) to render
 * @param formValues The current form values of the annotation form
 * @param index An index indicating the instance of a property in the parent array
 * @param Remove Function to remove this selected instance from the parent array
 * @returns JSX Component
 */
const AnnotationFormSegment = (props: Props) => {
    const { annotationFormFieldProperty, formValues, index, Remove } = props;

    /* Base variables */
    const [isHidden, setIsHidden] = useState<boolean>(annotationFormFieldProperty.jsonPath !== formValues?.jsonPath);

    /* Class Names */
    const formFieldsDivClass = classNames({
        'd-none': isHidden
    });

    /* Render form segment based on the type of the annotation form field property */
    switch (annotationFormFieldProperty.type) {
        case 'object':
            /* Determine annotation form field property title */
            const annotationFormFieldPropertyTitle: string = `${annotationFormFieldProperty.name}${annotationFormFieldProperty.jsonPath !== formValues?.jsonPath &&
                typeof (index) !== 'undefined' ? ` #${Number(index) + 1}` : ''
                }`;

            return (
                <div className="b-grey br-corner mb-3 px-3 py-2">
                    <Row className="py-1">
                        <Col className="d-flex align-items-center">
                            <p className="tc-primary fw-lightBold">
                                {annotationFormFieldPropertyTitle}
                            </p>
                        </Col>

                        {Remove &&
                            <Col lg="auto"
                                className="pe-1"
                            >
                                <Button type="button"
                                    variant="blank"
                                    className="px-0 py-0"
                                    OnClick={() => {
                                        if (window.confirm(`Are you sure, you want to remove the sub class: ${annotationFormFieldPropertyTitle}?`)) {
                                            Remove();
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrashCan}
                                        size="lg"
                                        className="tc-error"
                                    />
                                </Button>
                            </Col>
                        }
                        <Col lg="auto"
                            className="d-flex align-items-center"
                        >
                            <Button type="button"
                                variant="blank"
                                className="px-0 py-0"
                                OnClick={() => setIsHidden(!isHidden)}
                            >
                                <FontAwesomeIcon icon={isHidden ? faChevronDown : faChevronUp}
                                    className="tc-primary"
                                    size="lg"
                                />
                            </Button>
                        </Col>
                    </Row>

                    {annotationFormFieldProperty.properties?.map(fieldProperty => {
                        let fieldName: string = ``;
                        let fieldValue: string = '';

                        fieldName = fieldName.concat(`${annotationFormFieldProperty.jsonPath.replaceAll('.', '_').replaceAll('][', '_').replaceAll('[', '').replaceAll(']', '')}`);

                        if (typeof(index) !== 'undefined') {
                            fieldValue = formValues?.annotationValues?.[fieldName]?.[index]?.[`${fieldProperty.key}`];
                            fieldName = fieldName.concat(`[${index}]`);
                        } else {
                            fieldValue = formValues?.annotationValues?.[fieldName]?.[`${fieldProperty.key}`];
                        }

                        fieldName = fieldName.concat(`[${fieldProperty.key}]`);

                        return (
                            <Row key={fieldProperty.jsonPath}
                                className={`${formFieldsDivClass} mb-2`}
                            >
                                <Col>
                                    <p className="fs-4">
                                        {fieldProperty.name}
                                    </p>

                                    <Field name={`annotationValues.${fieldName}`}
                                        value={fieldValue ?? ''}
                                        className="w-100 b-grey br-corner mt-1 py-1 px-2"
                                    />
                                </Col>
                            </Row>
                        );
                    })}
                </div>
            );
        case 'array':
            /* Format field name for field array sub class */
            const fieldName = `${annotationFormFieldProperty.jsonPath.replaceAll('.', '_').replaceAll('][', '_').replaceAll('[', '').replaceAll(']', '')}`;

            return (
                <div>
                    <FieldArray name={`annotationValues.${fieldName}`}>
                        {({ push, remove }) => (
                            <>
                                <div className="bgc-primary tc-white b-grey br-corner mb-3 px-3 py-2">
                                    <Row className="py-1">
                                        <Col className="d-flex align-items-center">
                                            <p className="fw-bold">
                                                {`${annotationFormFieldProperty.name}s`}
                                            </p>
                                        </Col>
                                        <Col lg="auto"
                                            className="d-flex align-items-center"
                                        >
                                            <Button type="button"
                                                variant="blank"
                                                className="px-0 py-0"
                                                OnClick={() => push({})}
                                            >
                                                <FontAwesomeIcon icon={faPlus}
                                                    size="lg"
                                                />
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>

                                {/* For each sub class index, render an annotation form segment */}
                                {formValues?.annotationValues?.[fieldName]?.map((_classObject: Dict, index: number) => {
                                    /* Set sub class as object and render form segment */
                                    const key = `${fieldName}_${index}`;
                                    const annotationFormFieldSubProperty: AnnotationFormProperty = { ...annotationFormFieldProperty };

                                    annotationFormFieldSubProperty.type = 'object';

                                    return (
                                        <div key={key}
                                            className="ms-4"
                                        >
                                            <AnnotationFormSegment annotationFormFieldProperty={annotationFormFieldSubProperty}
                                                formValues={formValues}
                                                index={index}
                                                Remove={() => remove(index)}
                                            />
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </FieldArray>
                </div>
            );
    };
};

export default AnnotationFormSegment;
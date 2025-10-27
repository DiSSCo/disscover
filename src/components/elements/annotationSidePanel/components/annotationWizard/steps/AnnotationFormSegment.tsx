/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FieldArray } from 'formik';
import jp from 'jsonpath';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { AnnotationFormProperty, Dict } from 'app/Types';

/* Import Icons */
import { faChevronUp, faChevronDown, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import FormField from './formFields/FormField';
import { Button } from 'components/elements/customUI/CustomUI';

/* Import utilities */
import { ExtractLastSegmentFromPath } from 'app/utilities/SchemaUtilities';


/* Props Type */
type Props = {
    annotationFormFieldProperty: AnnotationFormProperty,
    formValues?: Dict,
    index?: number,
    Remove?: Function,
    SetFieldValue?: Function
};


/**
 * Component that returns a segment of the annotation form based upon the provided annotation form field property
 * @param annotationFormFieldProperty The annotation form field property (and its children) to render
 * @param formValues The current form values of the annotation form
 * @param index An index indicating the instance of a property in the parent array
 * @param Remove Function to remove this selected instance from the parent array
 * @param SetFieldValue Function to set the value of a field in the annotation wizard form
 * @returns JSX Component
 */
const AnnotationFormSegment = (props: Props) => {
    const { annotationFormFieldProperty, formValues, index, Remove, SetFieldValue } = props;

    /* Base variables */
    const [isHidden, setIsHidden] = useState<boolean>(annotationFormFieldProperty.jsonPath !== formValues?.jsonPath);
    const isIdentificationAnnotation = annotationFormFieldProperty.key === 'TaxonIdentification';

    /* Class Names */
    const formFieldsDivClass = classNames({
        'd-none': isHidden
    });

    /* Render form segment based on the type of the annotation form field property */
    switch (annotationFormFieldProperty.type) {
        case 'object': {
            /* Determine annotation form field property title */
            const annotationFormFieldPropertyTitle: string = `${annotationFormFieldProperty.name}${annotationFormFieldProperty.jsonPath !== formValues?.jsonPath &&
                typeof (index) !== 'undefined' ? ` #${Number(index) + 1}` : ''
                }`;

            return (
                <div className="b-grey br-corner mb-3 px-3 py-2">
                    <Row className="py-1">
                        <Col className="d-flex align-items-center">
                            <p className="tc-primary fw-lightBold">
                                {formValues?.jsonPath ? ExtractLastSegmentFromPath(formValues.jsonPath) : annotationFormFieldPropertyTitle}
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
                        let fieldName: string = '';
                        let fieldValue: string = '';
                        let annotationFormFieldSubProperty: AnnotationFormProperty = fieldProperty;

                        /* Concatenate the base path of parent to the field name */
                        fieldName = fieldName.concat(`${annotationFormFieldProperty.jsonPath.replaceAll('.', '_').replaceAll('][', '_').replaceAll('[', '').replaceAll(']', '')}`);

                        /* Check if parent is array with index and index should be added to the field name */
                        if (typeof (index) !== 'undefined') {
                            /* Check if child is object or of a simple data type */
                            if (['object', 'array'].includes(fieldProperty.type)) {
                                /* Add index and prefix of JSON path to field name */
                                fieldName = fieldName.concat(`_${index}_'${jp.parse(fieldProperty.jsonPath).at(-1).expression.value}'`);

                                /* Construct property field name for form reference as JSON path */
                                let propertyFieldName: string = '$';

                                fieldName.replace('$', '').split('_').forEach(path => {
                                    propertyFieldName = propertyFieldName.concat(`[${path}]`);
                                });

                                /* Update form field sub property with updated path */
                                annotationFormFieldSubProperty = {
                                    ...fieldProperty,
                                    jsonPath: propertyFieldName
                                };
                            } else {
                                fieldValue = formValues?.annotationValues?.[fieldName]?.[index]?.[`${fieldProperty.key}`];
                                fieldName = fieldName.concat(`[${index}]`);
                            }
                        } else if (['object', 'array'].includes(fieldProperty.type)) {
                            /* Add prefix of JSON path to field name */
                            fieldName = fieldName.concat(`_'${jp.parse(fieldProperty.jsonPath).at(-1).expression.value}'`);

                            /* Construct property field name for form reference as JSON path */
                            let propertyFieldName: string = '$';

                            fieldName.replace('$', '').split('_').forEach(path => {
                                propertyFieldName = propertyFieldName.concat(`[${path}]`);
                            });

                            /* Update form field sub property with updated path */
                            annotationFormFieldSubProperty = {
                                ...fieldProperty,
                                jsonPath: propertyFieldName
                            };
                        } else {
                            /* Treat as singular object term and get field value from form */
                            fieldValue = formValues?.annotationValues?.[fieldName]?.[`${fieldProperty.key}`];
                        }

                        /* If key is present in field property, add it to end of field name */
                        if (fieldProperty.key) {
                            fieldName = fieldName.concat(`[${fieldProperty.key}]`);
                        }

                        return (
                            <Row key={fieldProperty.jsonPath}
                                className={`${formFieldsDivClass} mb-2`}
                            >
                                <Col>
                                    {['object', 'array'].includes(fieldProperty.type) ?
                                        <AnnotationFormSegment annotationFormFieldProperty={annotationFormFieldSubProperty}
                                            formValues={formValues}
                                            SetFieldValue={SetFieldValue}
                                        />
                                        : 
                                        <FormField fieldProperty={fieldProperty}
                                            fieldName={fieldName}
                                            fieldValue={fieldValue}
                                            motivation=''
                                            SetFieldValue={SetFieldValue}
                                            isIdentificationAnnotation={isIdentificationAnnotation}
                                            formValues={formValues}
                                        />
                                    }
                                </Col>
                            </Row>
                        );
                    })}
                </div>
            );
        } case 'array': {
            /* Format field name for field array sub class */
            let fieldName = `${annotationFormFieldProperty.jsonPath.replaceAll('.', '_').replaceAll('][', '_').replaceAll('[', '').replaceAll(']', '')}`;

            /* If index is present, add it in between of the latest property and its parent class which is the array */
            if (typeof (index) !== 'undefined') {
                const fieldNameSplitPrefix = fieldName.split('_').slice(0, -1);
                const fieldNameSplitSuffix = fieldName.split('_').slice(-1);

                fieldName = `${fieldNameSplitPrefix.join('_')}_${index}_${fieldNameSplitSuffix[0]}`;
            }

            const RemoveExtraUnderscoreNumbers = (string: string) => {
                let firstUnderscoreNumber = /_\d+_/.exec(string);

                if (!firstUnderscoreNumber) {
                    return string;
                }

                let remainingString = string.slice(firstUnderscoreNumber.index + firstUnderscoreNumber[0].length);
                remainingString = remainingString.replace(/_\d+_/g, '_');

                return string.slice(0, firstUnderscoreNumber.index + firstUnderscoreNumber[0].length) + remainingString;
            };

            fieldName = RemoveExtraUnderscoreNumbers(fieldName);

            return (
                <div>
                    <FieldArray name={`annotationValues.${fieldName}`}>
                        {({ push, remove }) => (
                            <>
                                <div className="bgc-primary tc-white b-grey br-corner mb-3 px-3 py-2">
                                    <Row className="py-1">
                                        <Col className="d-flex align-items-center">
                                            <p className="fw-bold">
                                                {`${annotationFormFieldProperty.name}`}
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
                                {formValues?.annotationValues?.[fieldName]?.map((_classObject: Dict, localIndex: number) => {
                                    /* Set sub class as object and render form segment */
                                    const key = `${fieldName}_${localIndex}`;
                                    let propertyFieldName: string = '$';

                                    fieldName.replace('$', '').split('_').forEach(path => {
                                        propertyFieldName = propertyFieldName.concat(`[${path}]`);
                                    });

                                    const annotationFormFieldSubProperty: AnnotationFormProperty = {
                                        ...annotationFormFieldProperty,
                                        jsonPath: propertyFieldName,
                                        type: 'object'
                                    };

                                    return (
                                        <div key={key}
                                            className="ms-4"
                                        >
                                            <AnnotationFormSegment annotationFormFieldProperty={annotationFormFieldSubProperty}
                                                formValues={formValues}
                                                index={localIndex}
                                                SetFieldValue={SetFieldValue}
                                                Remove={() => remove(localIndex)}
                                            />
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </FieldArray>
                </div>
            );
        }
    };
};

export default AnnotationFormSegment;
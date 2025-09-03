/* Import Dependencies */
import { useState } from 'react';

/* Import Types */
import { AnnotationFormProperty, Dict, MultiSelectItem } from 'app/Types';

/* Import API */
import GetTaxonomicIdentification from 'api/taxonomicIdentification/GetTaxonomicIdentification';

/* Import Components */
import { Field, FieldArray } from 'formik';
import { Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { TaxonomicIdentificationMapper } from 'components/elements/annotationSidePanel/utilities/AnnotationMappers';

/* Props Type */
type Props = {
    name: string,
    namePrefix?: string,
    SetFieldValue?: Function,
    fieldProperty: AnnotationFormProperty,
    fieldValue?: string,
    formValues?: Dict
};


/**
 * Component that renders a select filter
 * @param name The name of the search filter
 * @param SetFieldValue Function to set the value of the search filter
 * @param SubmitForm Function to submit the search filters form
 * @returns JSX Component
 */
const SearchSelectField = (props: Props) => {
    const { name, namePrefix, SetFieldValue, fieldProperty, fieldValue, formValues } = props;

    /* Base variables */
    const [multiSelectTrigger, setMultiSelectTrigger] = useState<boolean>(false);
    const [multiSelectItems, setMultiSelectItems] = useState<(MultiSelectItem & { originalItem: any })[]>([]);
    const checkIfDisabled = fieldProperty.key !== 'dwc:scientificName' && fieldValue;
    const MultiSelectListClass = !multiSelectTrigger || !multiSelectItems.length ? "d-none" : "d-block";

    /**
     * Function to call the GetTaxonomicIdentification to retrieve taxonomic data based on rank and value
     * and set the multiSelectItems with the response of the taxonomic data.
     * @param rank The current rank of the selected digital specimen in the form field
     * @param value The value or the name of the digital specimen in the form field
     */
    const handleTaxonomicIdentificationInput = async (shortRank: string, value: string): Promise<void> => {
        const rank = shortRank.replaceAll('dwc:', '');
        const params = shortRank === 'dwc:scientificName' ? { value } : { rank, value };

        const results = await GetTaxonomicIdentification(params);
        const newMultiSelectItems = (results || []).flatMap((item: any) => {
            const label = item?.usage?.label;

            return (label)
                ? [{ label, value: label, originalItem: item }]
                : [];
        });
        setMultiSelectItems(newMultiSelectItems);
    };

    /**
     * Function to populate specific field values with newly selected taxonomic info through SetFieldValue
     * @param originalItem Current taxonomic tree of digital specimen
     */
    const handleSetFieldValue = (taxonomicTree: any): void => {
        Object.entries(formValues?.annotationValues["$'ods:hasIdentifications'_0_'ods:hasTaxonIdentifications'_0"])?.forEach(([key, value]) => {
            const fieldValue = TaxonomicIdentificationMapper(taxonomicTree, [key, value]);
            const fieldName = `${namePrefix}.$'ods:hasIdentifications'_0_'ods:hasTaxonIdentifications'_0[${key}]`;
            
            SetFieldValue?.(fieldName, fieldValue);
        });
    }

    return (
        <div>
            <p className="fs-4">
                {fieldProperty.name}
            </p>
            <FieldArray name={`${namePrefix}.${name}`}>
                {() => (
                    <Row>
                        <Col>
                            <div className="position-relative">
                                <Row>
                                    {/* Visible select field */}
                                    <Col className="position-relative d-flex align-items-center">
                                        <Field
                                            disabled={checkIfDisabled}
                                            name={`${namePrefix}.${name}`}
                                            placeholder={'Type at least 4 characters to start your search'}
                                            className={'w-100 fs-4 px-3 py-1 b-primary br-round'}
                                            onChange={(field: {
                                                target: {
                                                    value: string
                                                }
                                            }) => {
                                                /* Set field value */
                                                SetFieldValue?.(`${namePrefix}.${name}`, field.target.value);

                                                /* Either get taxonomic identification or set the dropdown items to [] again */
                                                field.target.value.length > 3 
                                                    ? handleTaxonomicIdentificationInput( `${fieldProperty.key}`, `${field.target.value}`)
                                                    : setMultiSelectItems([]);;
                                            }}
                                            onClick={() => {
                                                setMultiSelectTrigger(!multiSelectTrigger);
                                                if (fieldValue) handleTaxonomicIdentificationInput( `${fieldProperty.key}`, `${fieldValue?.substring(0, fieldValue?.indexOf(' '))}`)
                                            }}
                                        />

                                        {/* Absolute chevron up or down */}
                                        <Button type="button"
                                            variant="blank"
                                            className="position-absolute end-0 me-1"
                                            onClick={() => {
                                                setMultiSelectTrigger(!multiSelectTrigger);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={multiSelectTrigger ? faChevronUp : faChevronDown}
                                                className="tc-primary"
                                            />
                                        </Button>
                                    </Col>
                                </Row>

                                {/* Select list */}
                                <div className={`${MultiSelectListClass} bgc-white b-primary br-corner mt-2 px-2 py-1 z-1`}>
                                    {multiSelectItems.map((item) => (
                                        <button key={item.originalItem.id}
                                            type="button"
                                            className="button-no-style"
                                            onClick={() => {
                                                /* Set field value */
                                                handleSetFieldValue(item.originalItem);
                                                
                                                setMultiSelectTrigger(false);
                                            }}
                                        >
                                            <Row key={item.value}>
                                                <Col>
                                                    <div className={'px-2 py-1 br-corner tr-fast'}>
                                                        <Row>
                                                            <Col className="d-flex align-items-center">
                                                                <p className="fs-5">{item.label}</p>
                                                            </Col>
                                                        </Row>  
                                                    </div>
                                                </Col>
                                            </Row>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                )}
            </FieldArray>
        </div>
    );
};

export default SearchSelectField;

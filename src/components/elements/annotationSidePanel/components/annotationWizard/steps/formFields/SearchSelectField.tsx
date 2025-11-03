/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';

/* Import Types */
import { AnnotationFormProperty, Dict, MultiSelectItem, TaxonomicIdentificationItem } from 'app/Types';

/* Import API */
import GetTaxonomicIdentification from 'api/taxonomicIdentification/GetTaxonomicIdentification';

/* Import Components */
import { Field, FieldArray } from 'formik';
import { Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { TaxonomicIdentificationMapper } from 'components/elements/annotationSidePanel/utilities/AnnotationMappers';
import { AnnotationFormFields } from 'app/utilities/AnnotateUtilities';

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
    const annotationTaxonomicFields = AnnotationFormFields('TaxonIdentification');

    const multiSelectListClass = classNames({
        'd-none': !multiSelectTrigger,
        'd-block': multiSelectTrigger && multiSelectItems.length > 0
    });

    /**
     * Function to call the GetTaxonomicIdentification to retrieve taxonomic data based on rank and value
     * and set the multiSelectItems with the response of the taxonomic data. But only if there is a value.
     * @param rank The current rank of the selected digital specimen in the form field
     * @param value The value or the name of the digital specimen in the form field
     */
    const handleTaxonomicIdentificationInput = async (shortRank: string, value: string): Promise<void> => {
        if (value) {
            setMultiSelectTrigger(true);
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
        }
    };

    /**
     * Function to populate specific annotation field values based on newly selected taxonomic info
     * and the standard taxonomic identification annotation fields through SetFieldValue
     * @param taxonomicTree Current taxonomic tree of digital specimen
     */
    const handleSetFieldValue = (taxonomicTree: TaxonomicIdentificationItem): void => {
        /* Declare variables */
        const taxonIdentificationsPath = `$'ods:hasIdentifications'_0_'ods:hasTaxonIdentifications'_0`;
        const basePath = `${namePrefix}.${taxonIdentificationsPath}`;
        const existingValues = formValues?.annotationValues?.[taxonIdentificationsPath] || {};

        /* Create a new set of keys to loop through with existing annotation values and the standard
        taxonomic identification annotation fields */
        const allKeys = new Set([
            ...Object.keys(existingValues),
            ...annotationTaxonomicFields,
        ]);

        allKeys.forEach((key) => {
            const value = annotationTaxonomicFields.includes(key)
                ? ''
                : (existingValues[key] as string) || '';

            const item = { key, value };
            const fieldValue = TaxonomicIdentificationMapper(taxonomicTree, item);
            const fieldName = `${basePath}[${key}]`;

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
                                            autoComplete='off'
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
                                                setChangedField(true);
                                                /* Set multiselectitems to empty if there is no field value */
                                                if (field.target.value === '') setMultiSelectItems([]);

                                                /* Either get taxonomic identification or set the dropdown items to [] again */
                                                field.target.value.length > 3 
                                                    ? handleTaxonomicIdentificationInput( `${fieldProperty.key}`, `${field.target.value}`)
                                                    : setMultiSelectItems([]);
                                            }}
                                            onClick={() => {
                                                if (fieldValue) handleTaxonomicIdentificationInput( `${fieldProperty.key}`, `${fieldValue?.substring(0, fieldValue?.indexOf(' '))}`)
                                            }}
                                        />

                                        {/* Absolute chevron up or down */}
                                        <Button type="button"
                                            variant="blank"
                                            className="position-absolute end-0 me-1 b-none"
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
                                {multiSelectItems.length > 0 &&
                                    <div className={`${multiSelectListClass} bgc-white b-primary br-corner mt-2 px-2 py-1 z-1`}>
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
                                }
                            </div>
                        </Col>
                    </Row>
                )}
            </FieldArray>
        </div>
    );
};

export default SearchSelectField;

/* Import Dependencies */
import { useState } from 'react';

/* Import Hooks */
import { useAppSelector, useDynamicSearch, useFetch } from 'app/Hooks';

/* Import Types */
import { AnnotationFormProperty, MultiSelectItem } from 'app/Types';

/* Import API */
import GetTaxonomicIdentification from 'api/taxonomicIdentification/GetTaxonomicIdentification';

/* Import Components */
import { MultiSelect } from 'components/elements/customUI/CustomUI';
import { Field, FieldArray } from 'formik';
import { Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';


/* Props Type */
type Props = {
    name: string,
    namePrefix?: string,
    SetFieldValue?: Function,
    fieldProperty: AnnotationFormProperty
};


/**
 * Component that renders a select filter
 * @param name The name of the search filter
 * @param SetFieldValue Function to set the value of the search filter
 * @param SubmitForm Function to submit the search filters form
 * @returns JSX Component
 */
const SearchSelectField = (props: Props) => {
    const { name, namePrefix, SetFieldValue, fieldProperty } = props;

    /* Base variables */
    const [multiSelectTrigger, setMultiSelectTrigger] = useState<boolean>(false);
    const [multiSelectItems, setMultiSelectItems] = useState<(MultiSelectItem & { originalItem: any })[]>([]);


    const MultiSelectListClass = () => {
        return classNames({
            "d-block": multiSelectTrigger,
            "d-none": !multiSelectTrigger || !multiSelectItems.length
        });
    };

    // Write function to retrieve the taxonomic identification fields based on fieldProperty.name.toLowercase() and whatever data comes back from the api call
    // Fill the dropdown based on the current input field with the options based on the 
    const handleTaxonomicIdentificationInput = async (rank: string, value: string) => {
        const results = await GetTaxonomicIdentification({ rank, value });
        const newMultiSelectItems = results
            .map((item: { usage: { label: string, name: { scientificName: string } } }) => ({
                label: item.usage.label,
                value: item.usage.name.scientificName,
                originalItem: item, // Keep the original object to use on selection
            }))
            .filter((item: { label: any; }) => item.label); // Filter out any results that might not have a name
        console.log(newMultiSelectItems);
        setMultiSelectItems(newMultiSelectItems);
    };

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
                                            name={`${namePrefix}.${name}`}
                                            placeholder={'Type at least 4 characters to start your search'}
                                            className={'w-100 fs-4 px-3 py-1 b-primary br-round'}
                                            onChange={(field: {
                                                target: {
                                                    value: string
                                                }
                                            }) => {
                                                console.log(field.target.value);
                                                /* Set field value */
                                                SetFieldValue?.(`${namePrefix}.${name}`, field.target.value);
                                                if(field.target.value.length > 3) {
                                                    handleTaxonomicIdentificationInput( `${fieldProperty.name}`.toLowerCase(), `${field.target.value}`);
                                                }
                                            }}
                                            onClick={(e: { target: { value: any; }; }) => {
                                                console.log(e.target.value);
                                                // setMultiSelectTrigger(!multiSelectTrigger);
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
                                <div className={`${MultiSelectListClass()} bgc-white b-primary br-corner mt-2 px-2 py-1 z-1`}>
                                    {multiSelectItems.map((item) => (
                                        <button key={item.label}
                                            type="button"
                                            className="button-no-style"
                                            onClick={() => {
                                                /* Set field value */
                                                SetFieldValue?.(`${namePrefix}.${name}`, item.value);
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

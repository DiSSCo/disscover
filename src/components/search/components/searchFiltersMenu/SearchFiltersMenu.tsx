/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

/* Import Hooks */
import { useFetch, useSearchFilters } from 'app/Hooks';

/* Import Types */
import { SearchFilter as SearchFilterType, Dict } from 'app/Types';

/* Import Icons */
import { faClipboardCheck, faFilter } from '@fortawesome/free-solid-svg-icons';

/* Import Sources */
import SearchFilters from 'sources/searchFilters/searchFilters.json';

/* Import API */
import GetDigitalSpecimenAggregations from 'api/digitalSpecimen/GetDigitalSpecimenAggregations';

/* Import Components */
import { SearchFilter } from './SearchFiltersMenuComponents';

/* Import utilities */
import { missingDataFilters, formatMissingDataFilter } from 'app/utilities/SearchFilterUtilities';


/**
 * Component that renders the search filters menu on the search page
 * @returns JSX Component
 */
const SearchFiltersMenu = () => {
    /* Hooks */
    const [searchParams] = useSearchParams();
    const fetch = useFetch();
    const searchFilters = useSearchFilters();

    /* Base variables */
    const [digitalSpecimenAggregations, setDigitalSpecimenAggregations] = useState<{
        [searchFilterName: string]: {
            [aggregation: string]: number
        }
    }>();
    const initialFormValues: Dict = {
        filters: {},
        search: {}
    };

    /* OnLoad: fetch digital specimen aggregations */
    fetch.FetchMultiple({
        callMethods: [
            {
                alias: 'digitalSpecimenAggregations',
                params: {
                    searchFilters: searchFilters.GetSearchFilters()
                },
                Method: GetDigitalSpecimenAggregations
            }
        ],
        triggers: [searchParams],
        Handler: (results: Dict) => {
            setDigitalSpecimenAggregations({
                ...results.digitalSpecimenTaxonomyAggregations,
                ...results.digitalSpecimenAggregations
            });
        }
    });

    /* Construct search filters by adding them to the initial form values */
    Object.entries(SearchFilters.searchFilters).forEach(([key, searchFilter]: [string, SearchFilterType]) => {
        /* Add to initial form filters */
        if (searchFilter.nestedIn) {
            const nestedIn: string = searchFilter.nestedIn;

            /* If is object, add form filter as object and add potential sub filters to form filters */
            if (searchFilter.contains) {
                initialFormValues[nestedIn][key] = {};

                Object.keys(searchFilter.contains).forEach(subKey => {
                    initialFormValues[nestedIn][key][subKey] = [...searchParams.getAll(subKey)];
                });
            } else {
                initialFormValues[searchFilter.nestedIn][key] = [...searchParams.getAll(key)];
            };
        } else {
            initialFormValues[key] = [...searchParams.getAll(key)];
        }

        /* Add missing data filters to be able to use them */
        if (key === 'missingData') {
            initialFormValues.filters = { ...initialFormValues.filters, ...missingDataFilters}
        }

        /* Add to inital form search query if allowed for this filter */
        if (searchFilter.searchable) {
            initialFormValues.search[key] = '';
        }
    });


    /* Format the missingDataFilters to the requested format for the /search api */
    const mapMissingDataFilters = (missingDataFilters: string[]): Dict => {
        return missingDataFilters.reduce((result: Dict, filter: string) => {
            // Translate 'noGenus' to 'hasGenus' with a set value to false
            const newKey = formatMissingDataFilter(filter, 'filter');
            result[newKey] = [false];
            return result;
        }, {});
    };

    return (
        <div className="h-100">
            {digitalSpecimenAggregations &&
                <Formik initialValues={initialFormValues}
                    onSubmit={async (values) => {
                        await new Promise((resolve) => setTimeout(resolve, 100));
                        // Map missingData filters
                        const mappedMissingDataFilters = mapMissingDataFilters(values.filters.missingData);

                        /* Extract filters */
                        const filters = { ...values.filters, ...values.filters.taxonomy, ...mappedMissingDataFilters };

                        /* Remove taxonomy filter key from filters */
                        delete filters.taxonomy;
                        delete filters.missingData;

                        /* OnSubmit: set the search filters equal to this form's values */
                        searchFilters.SetSearchFilters({ ...filters, midsLevel: values.midsLevel });
                    }}
                    enableReinitialize={true}
                >
                    {({ values, setFieldValue, setValues, submitForm  }) => (
                        <Form className="h-100 d-flex flex-column">
                            {/* Quality completeness indicators */}
                            <Row>
                                <Col>
                                    <div className="bgc-white b-grey br-corner pt-2 pb-3 px-3">
                                        {/* Title */}
                                        <Row>
                                            <Col lg="auto"
                                                className="pe-0"
                                            >
                                                <FontAwesomeIcon icon={faClipboardCheck}
                                                    className="tc-primary"
                                                />
                                            </Col>
                                            <Col className="d-flex align-items-center">
                                                <p className="fs-4 tc-primary fw-lightBold">Quality/completeness indicators</p>
                                            </Col>
                                        </Row>
                                        {/* Filters */}
                                        <Row className="mt-2">
                                            <Col>
                                                <SearchFilter name="midsLevel"
                                                    fieldValue={values.midsLevel}
                                                    searchFilter={SearchFilters.searchFilters.midsLevel}
                                                    text="MIDS"
                                                    SetFieldValue={(field: string, value: string | string[]) => setFieldValue(field, value)}
                                                    SubmitForm={submitForm}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            {/* Search filters */}
                            <Row className="flex-grow-1 mt-3 overflow-y-hidden">
                                <Col className="h-100">
                                    <div className="h-100 d-flex flex-column bgc-white b-grey br-corner pt-2 pb-3 px-3">
                                        {/* Title */}
                                        <Row>
                                            <Col lg="auto"
                                                className="pe-0"
                                            >
                                                <FontAwesomeIcon icon={faFilter}
                                                    className="tc-primary"
                                                />
                                            </Col>
                                            <Col className="d-flex align-items-center">
                                                <p className="fs-4 tc-primary fw-lightBold">Search filters</p>
                                            </Col>
                                        </Row>
                                        {/* Filters */}
                                        <Row className="mt-2 overflow-y-scroll">
                                            <Col>
                                                {Object.keys(values.filters).map((key) => {
                                                    const searchFilter: SearchFilterType | undefined = SearchFilters.searchFilters[key as keyof typeof SearchFilters.searchFilters];

                                                    if (searchFilter) {
                                                        /* Construct aggregations */
                                                        let aggregations: {
                                                            [searchFilterName: string]: {
                                                                [aggregation: string]: number
                                                            } | {
                                                                [subSearchFitlerName: string]: {
                                                                    [aggregation: string]: number
                                                                }
                                                            }
                                                        } = {};

                                                        if (searchFilter.type === 'taxonomy') {
                                                            aggregations[key] = {};

                                                            Object.keys(searchFilter.contains ?? {}).forEach(taxonomyKey => {
                                                                aggregations[key][taxonomyKey] = digitalSpecimenAggregations[taxonomyKey];
                                                            });
                                                        } else if (searchFilter.noAggregations) aggregations = {};
                                                        else aggregations = { [key]: digitalSpecimenAggregations?.[key] };

                                                        return (
                                                            <Row key={key}
                                                                className="mb-2"
                                                            >
                                                                <Col>
                                                                    <SearchFilter name={key}
                                                                        fieldValue={values.filters[key]}
                                                                        searchQuery={values.search?.[key]}
                                                                        searchFilter={searchFilter}
                                                                        aggregations={{ [key]: aggregations?.[key] }}
                                                                        formValues={values}
                                                                        SetFieldValue={(field: string, value: string | string[]) => setFieldValue(field, value)}
                                                                        SetFormValues={(values: Dict) => setValues(values)}
                                                                        SubmitForm={submitForm}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        );
                                                    }
                                                })}
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            }
        </div >
    );
};

export default SearchFiltersMenu;
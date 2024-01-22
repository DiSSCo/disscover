/* Import Dependencies */
import { useSearchParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSearchAggregations } from 'redux/search/SearchSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Sources */
import SearchFiltersJSON from 'sources/searchFilters.json';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faFilter, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import ActiveFiltersTag from './ActiveFiltersTag';
import MultiSelectFilter from './filters/MultiSelectFilter';
import TaxonomyFilters from './filters/TaxonomyFilters';
import DateFilter from './filters/DateFilter';
import TextFilter from './filters/TextFilter';


/* Props Typing */
interface Props {
    HideFilters: Function
};


const SearchFilters = (props: Props) => {
    const { HideFilters } = props;

    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const filtersList: Dict = { ...SearchFiltersJSON };
    const taxonomies = ['kingdom', 'phylum', 'order', 'family', 'genus'];
    const aggregations = useAppSelector(getSearchAggregations);
    const initialValues: Dict = {
        filters: {
            q: searchParams.get('q') ? searchParams.get('q') : '',
            collectionDate: null,
            fossilPeriod: ''
        },
    };
    const activeFilters: Dict = {};

    /* Extract active filters from Search Params */
    for (const searchParam of searchParams.entries()) {
        if (searchParam[0] !== 'q' && searchParam[0] !== 'midsLevel') {
            if (!activeFilters[searchParam[0]]) {
                activeFilters[searchParam[0]] = [searchParam[1]];
            } else {
                activeFilters[searchParam[0]].push(searchParam[1]);
            }
        }
    }

    /* For each aggregation, set initial value for form */
    Object.keys(aggregations).forEach((aggregationKey) => {
        /* Check if Aggregation is in filters list */
        if (Object.keys(filtersList).concat(taxonomies).includes(aggregationKey)) {
            /* Check for Search Filters and add to initial values */
            const searchFilters = searchParams.getAll(aggregationKey);

            /* Set up initial form values from Aggregation */
            initialValues.filters[aggregationKey] = [];

            if (searchFilters) {
                searchFilters.forEach((searchFilter) => {
                    if (Object.keys(aggregations[aggregationKey]).includes(searchFilter)) {
                        initialValues.filters[aggregationKey].push(searchFilter);
                    }
                });
            }

            /* Add a search query */
            initialValues[aggregationKey] = '';
        }
    });

    /* Function for deactivating the Search Filter */
    const RemoveFilter = (filterKey: string, filterValue: string) => {
        /* Remove filter from active filters list */
        const newActiveFilters = activeFilters[filterKey].filter((filter: string) => filter !== filterValue);

        /* Remove all Search Params of filter key */
        searchParams.delete(filterKey);

        /* If filter key has leftovers, reappend to Search Params */
        newActiveFilters.forEach((filter: string) => {
            searchParams.append(filterKey, filter);
        });

        setSearchParams(searchParams);
    }

    return (
        <Row className="h-100 pb-2">
            <Col className="h-100">
                <div className={`${styles.searchMenu} h-100 rounded-c overflow-x-hidden d-flex flex-column px-2`}>
                    {(!isEmpty(aggregations)) &&
                        <Formik
                            initialValues={{
                                ...initialValues
                            }}
                            enableReinitialize={true}
                            onSubmit={async (_form) => {
                                await new Promise((resolve) => setTimeout(resolve, 100));

                                /* Set search params to initiate search */
                                setSearchParams(searchParams);
                            }}
                        >
                            {({ values, setFieldValue }) => (
                                <Form className="h-100">
                                    <Row className="py-3">
                                        <Col>
                                            {/* Completeness block title */}
                                            <Row>
                                                <Col>
                                                    <p className="c-primary">
                                                        <FontAwesomeIcon icon={faClipboardCheck}
                                                            className="px-2"
                                                        />
                                                        Quality/completeness indicators
                                                    </p>
                                                </Col>
                                                <Col className="col-md-auto">
                                                    <FontAwesomeIcon icon={faChevronLeft}
                                                        className="c-primary c-pointer"
                                                        onClick={() => HideFilters()}
                                                    />
                                                </Col>
                                            </Row>
                                            {/* Completeness filters */ }
                                            <Row>
                                                <Col>
                                                    <MultiSelectFilter filter={filtersList['midsLevel']}
                                                        searchFilter='midsLevel'
                                                        items={aggregations['midsLevel']}
                                                        selectedItems={values.filters['midsLevel']}
                                                    />
                                                </Col>
                                            </Row>
                                            {/* Filters block title */}
                                            <Row className="mt-3">
                                                <Col>
                                                    <p className="c-primary">
                                                        <FontAwesomeIcon icon={faFilter}
                                                            className="px-2"
                                                        />
                                                        Filters
                                                    </p>
                                                </Col>
                                            </Row>
                                            {/* Active Filters */}
                                            {!isEmpty(activeFilters) &&
                                                <Row className="mt-3 px-2">
                                                    <p className="fs-4 fw-lightBold pb-2"> Active filters </p>

                                                    {Object.keys(activeFilters).map((filterKey) => {
                                                        return (
                                                            <ActiveFiltersTag key={filterKey} filterKey={filterKey}
                                                                filterValues={activeFilters[filterKey]}
                                                                RemoveFilter={(filterValue: string) => RemoveFilter(filterKey, filterValue)}
                                                            />
                                                        );
                                                    })}
                                                </Row>
                                            }
                                            {/* Search Filters */}
                                            <Row>
                                                <Col>
                                                    {Object.keys(filtersList).map((filterKey) => {
                                                        const filter = filtersList[filterKey];

                                                        if (filterKey !== 'midsLevel') {
                                                            /* Check kind of filter */
                                                            switch (filter.filterType) {
                                                                case 'date':
                                                                    {/* Date Filters */ }
                                                                    return <DateFilter key={filterKey}
                                                                        filter={filter}
                                                                        selectedValue={values.filters[filterKey]}
                                                                        SetFieldValue={(date: Date) => setFieldValue(`filters.${filterKey}`, date)}
                                                                    />
                                                                case 'text':
                                                                    {/* Text Filters */ }
                                                                    return <TextFilter key={filterKey}
                                                                        filter={filter}
                                                                        searchFilter={filterKey}
                                                                    />
                                                                case 'taxonomy':
                                                                    {/* Taxonomy Filters */ }
                                                                    return <TaxonomyFilters key={filterKey}
                                                                        selectedItems={values.filters}
                                                                        SetFieldValue={(taxonomy: string, value: string[]) => setFieldValue(`filters.${taxonomy}`, value)}
                                                                    />
                                                                default:
                                                                    {/* Aggregation Filters */ }
                                                                    if (Object.keys(aggregations).includes(filterKey)) {
                                                                        const aggregation = aggregations[filterKey];

                                                                        return <MultiSelectFilter key={filterKey}
                                                                            filter={filter}
                                                                            searchFilter={filterKey}
                                                                            items={aggregation}
                                                                            selectedItems={values.filters[filterKey as keyof typeof values.filters]}
                                                                        />
                                                                    } else {
                                                                        return;
                                                                    }
                                                            }
                                                        }
                                                    })}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    }
                </div>
            </Col>
        </Row>
    );
}

export default SearchFilters;
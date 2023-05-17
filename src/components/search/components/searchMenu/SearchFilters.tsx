/* Import Dependencies */
import { useSearchParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSearchAggregations } from 'redux/search/SearchSlice';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import MultiSelectFilter from './filters/MultiSelectFilter';
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
    const aggregations = useAppSelector(getSearchAggregations);
    const initialValues: Dict = {
        filters: {
            q: searchParams.get('q') ? searchParams.get('q') : '',
            collectionDate: null,
            fossilPeriod: '',
            livingPreserved: ''
        },
    };

    /* List of filters to be shown (in order) */
    const filtersList: Dict = {
        midsLevel: {
            displayName: 'MIDS Level',
            filterType: 'mids'
        },
        topicDiscipline: {
            displayName: "Topic Discipline"
        },
        country: {
            displayName: 'Country'
        },
        organisationName: {
            displayName: 'Organisation'
        },
        sourceSystemId: {
            displayName: 'Source System'
        },
        typeStatus: {
            displayName: 'Type status'
        },
        collectionDate: {
            displayName: 'Collection date',
            filterType: 'date'
        },
        fossilPeriod: {
            displayName: 'Fossil period',
            filterType: 'text'
        },
        livingPreserved: {
            displayName: 'Living or preserved',
            filterType: 'text'
        },
        license: {
            displayName: 'License'
        },
        hasMedia: {
            displayName: 'Has Media',
            filterType: 'checkbox'
        }
    };

    /* For each aggregation, set initial value for form */
    Object.keys(aggregations).forEach((aggregationKey) => {
        /* Check if Aggregation is in filters list */
        if (Object.keys(filtersList).includes(aggregationKey)) {
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

    return (
        <Row className="h-100 pb-2">
            <Col className={`${styles.searchMenu} h-100 overflow-scroll py-3 bg-white`}>
                {(!isEmpty(aggregations)) &&
                    <Formik
                        initialValues={{
                            ...initialValues
                        }}
                        enableReinitialize={true}
                        onSubmit={async (form) => {
                            await new Promise((resolve) => setTimeout(resolve, 100));

                            /* Check Free Text Search Query */
                            if (form.filters.q) {
                                searchParams.set('q', form.filters.q);
                            } else {
                                searchParams.delete('q');
                            }

                            setSearchParams(searchParams);
                        }}
                    >
                        {({ values, setFieldValue }) => (
                            <Form>
                                <Row>
                                    <Col>
                                        <p className="c-primary">
                                            <FontAwesomeIcon icon={faFilter}
                                                className="px-2"
                                            />
                                            Filters
                                        </p>
                                    </Col>
                                    <Col className="col-md-auto">
                                        <FontAwesomeIcon icon={faChevronLeft}
                                            className={`${styles.filtersCloseIcon} c-primary`}
                                            onClick={() => HideFilters()}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {Object.keys(filtersList).map((filterKey) => {
                                            const filter = filtersList[filterKey];

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
                                                default:
                                                    {/* Aggregation Filters */ }
                                                    if (Object.keys(aggregations).includes(filterKey)) {
                                                        const aggregation = aggregations[filterKey];

                                                        return <MultiSelectFilter key={filterKey}
                                                            filter={filter}
                                                            searchFilter={filterKey}
                                                            items={aggregation}
                                                            selectedItems={values.filters[filterKey as keyof typeof values.filters]}
                                                            searchQuery={values.organisationName}
                                                        />
                                                    } else {
                                                        return;
                                                    }
                                            }
                                        })}
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                }
            </Col>
        </Row>
    );
}

export default SearchFilters;
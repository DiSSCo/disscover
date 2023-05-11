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

/* Import Components */
import SearchBar from './filters/SearchBar';
import MultiSelectFilter from './filters/MultiSelectFilter';


const SearchMenu = () => {
    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const aggregations = useAppSelector(getSearchAggregations);
    const initialValues: Dict = {
        filters: {
            q: searchParams.get('q') ? searchParams.get('q') : ''
        }
    };
    const filtersList: string[] = [
        'midsLevel', 'license', 'country', 'organisationName',
        'sourceSystemId', 'typeStatus', 'hasMedia'
    ];

    /* For each aggregation, set initial value for form */
    Object.keys(aggregations).forEach((aggregationKey) => {
        /* Check if Aggregation is in filters list */
        if (filtersList.includes(aggregationKey)) {
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
        <Row className={`${styles.searchMenu} h-100 pb-2`}>
            <Col className="h-100 overflow-scroll">
                {(!isEmpty(aggregations)) &&
                    <Formik
                        initialValues={{
                            ...initialValues
                        }}
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
                        {({ values }) => (
                            <Form>
                                <Row>
                                    <Col>
                                        {/* Free Text Search */}
                                        <SearchBar />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        {/* Aggregation Filters */}
                                        {Object.keys(aggregations).map((aggregationKey) => {
                                            if (filtersList.includes(aggregationKey)) {
                                                const aggregation = aggregations[aggregationKey];

                                                return <MultiSelectFilter key={aggregationKey}
                                                        searchFilter={aggregationKey}
                                                        items={aggregation}
                                                        selectedItems={values.filters[aggregationKey as keyof typeof values.filters]}
                                                        searchQuery={values.organisationName}
                                                />
                                            } else {
                                                return <div key={aggregationKey} />;
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

export default SearchMenu;
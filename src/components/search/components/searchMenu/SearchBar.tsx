/* Import Dependencies */
import { useSearchParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Fontawesome icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const SearchBar = () => {
    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Function to regulate Search Query filter */
    const FilterBySearchQuery = (searchQuery: string) => {
        if (searchQuery) {
            /* Append or update 'q' search param */
            searchParams.set('q', searchQuery);
        } else {
            /* Remove 'q' search param */
            searchParams.delete('q');
        }

        setSearchParams(searchParams);
    }

    return (
        <Row>
            <Col md={{ span: 12 }} className="bg-primary-dark pt-3 pb-4 px-4">
                <Row>
                    <Col md={{ span: 12 }} className="text-white position-relative">
                        <h6>
                            Search for specimens:
                        </h6>

                        <Formik
                            initialValues={{
                                searchQuery: searchParams.get('q') ? searchParams.get('q') : ''
                            }}
                            enableReinitialize
                            onSubmit={async (form) => {
                                await new Promise((resolve) => setTimeout(resolve, 100));

                                FilterBySearchQuery(form.searchQuery as string);
                            }}
                        >
                            <Form>
                                <Field type="text" name="searchQuery"
                                    className="search_searchBar w-100"
                                    placeholder="Iguanodon"
                                />

                                <button type="submit" className="search_searchBarSubmit position-absolute bg-white border-0">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </Form>
                        </Formik>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

}

export default SearchBar;
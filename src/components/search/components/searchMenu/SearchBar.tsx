/* Import Dependencies */
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSearchQuery, setSearchQuery } from "redux/search/SearchSlice";

/* Fontawesome icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const SearchBar = () => {
    /* Configure Store */
    const dispatch = useAppDispatch();

    /* Base search variable */
    const searchQuery = useAppSelector(getSearchQuery);

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
                                searchQuery: searchQuery
                            }}
                            enableReinitialize
                            onSubmit={async (form) => {
                                await new Promise((resolve) => setTimeout(resolve, 100));

                                dispatch(setSearchQuery(form.searchQuery));
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
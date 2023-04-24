/* Import Dependencies */
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppDispatch } from 'app/hooks';
import { setSearchQuery } from 'redux/search/SearchSlice';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const GlobalSearchBar = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* Function for handling Specimen search methods */
    const HandleSearch = (searchQuery: string) => {
        /* Store search query */
        dispatch(setSearchQuery(searchQuery));

        navigate({
            pathname: '/search',
            search: `?${createSearchParams({ searchQuery: searchQuery })}`
        });
    }

    return (
        <Row>
            <Col className="p-4 bg-white rounded-c shadow-c z-1">
                <h4>
                    Search for specimens:
                </h4>
                <Row>
                    <Col md={{ span: 12, offset: 0 }}>
                        <Formik
                            initialValues={{
                                searchQuery: ''
                            }}
                            onSubmit={async (form) => {
                                await new Promise((resolve) => setTimeout(resolve, 100));

                                const searchQuery = form['searchQuery'];

                                HandleSearch(searchQuery);
                            }}
                        >
                            <Form>
                                <Field name="searchQuery" type="text"
                                    placeholder="Baculites"
                                    className={`${styles.searchBar}`}
                                />

                                <button type="submit"
                                    className="p-2 px-3 bg-primary text-white border-0 br-tr br-br"
                                >
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

export default GlobalSearchBar;
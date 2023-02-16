/* Import Dependencies */
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


/* Props Typing */
type Props = {
    HandleSearch: Function
}


const SearchBar = (props: Props) => {
    const { HandleSearch,  } = props;

    return (
        <Row>
            <Col md={{ span: 5 }} className="home_searchBarBlock ps-4 pt-4 bg-white rounded-c shadow-c z-1">
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
                                    className="home_searchBar"
                                />

                                <button type="submit"
                                    className="home_searchBarSubmit bg-primary text-white border-0 br-tr br-br"
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

export default SearchBar;
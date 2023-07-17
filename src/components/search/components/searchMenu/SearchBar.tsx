/* Import Dependencies */
import { useSearchParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/search/search.module.scss';


const SearchBar = () => {
    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Function for searching by free text query */
    const SearchByQuery = (query: string | null) => {
        setSearchParams(searchParams => {
            if (query) {
                searchParams.set('q', query);
            } else {
                searchParams.delete('q');
            }

            return searchParams;
        });
    }

    return (
        <Formik
            initialValues={{
                q: searchParams.get('q')
            }}
            enableReinitialize={true}
            onSubmit={async (form) => {
                await new Promise((resolve) => setTimeout(resolve, 100));

                SearchByQuery(form.q);
            }}
        >
            <Form className={styles.searchBarBlock}>
                <Row>
                    <Col className="pe-2">
                        <Field type="text" name="q"
                            className={`${styles.searchBar} w-100 px-2 py-1`}
                            placeholder="Iguanodon"
                        />
                    </Col>
                    <Col className="col-md-auto ps-0">
                        <button type="submit" className="primaryButton px-3 py-1">
                            Search
                        </button>
                    </Col>
                </Row>
            </Form>
        </Formik>
    );

}

export default SearchBar;
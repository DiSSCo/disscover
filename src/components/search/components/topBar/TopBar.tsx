/* Import Dependencies */
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

/* Import Components */
import { Button, InputField } from 'components/elements/customUI/CustomUI';


/**
 * Component that renders the top bar on the search page
 * @returns JSX Component
 */
const TopBar = () => {
    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const initialFormValues: {
        query: string
    } = {
        query: searchParams.get('q') ?? ''
    };

    return (
        <div>
            <Formik initialValues={initialFormValues}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    /* If query is present, navigate to search page with query as param */
                    if (values.query) {
                        searchParams.set('q', values.query);

                        setSearchParams(searchParams);
                    } else if (searchParams.get('q')) {
                        searchParams.delete('q');

                        setSearchParams(searchParams);
                    }
                }}>
                <Form>
                    <Row>
                        {/* Search bar */}
                        <Col lg={{ span: 3 }}>
                            <Row>
                                <Col className="pe-0">
                                    <InputField name="query"
                                        placeholder="Bellis perennis"
                                        className="b-primary"
                                    />
                                </Col>
                                <Col lg="auto">
                                    <Button type="submit"
                                        variant="primary"
                                    >
                                        Search
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        {/* Shows toggle filter menu button and active search filters if filters menu is closed */}
                        <Col>

                        </Col>
                        {/* Compare button */}
                        <Col lg="auto">
                            <Button type="button"
                                variant="secondary"
                            >
                                Compare
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </div>
    );
};

export default TopBar;
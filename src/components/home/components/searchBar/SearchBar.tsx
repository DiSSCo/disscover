/* Import Dependencies */
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* Import Components */
import { Button, InputField } from "components/elements/customUI/CustomUI";


const SearchBar = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const initialFormValues: {
        query: string
    } = {
        query: ''
    };

    return (
        <div>
            <Formik initialValues={initialFormValues}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    /* If query is present, navigate to search page with query as param */
                    if (values.query) {
                        navigate(`/search?q=${values.query}`);
                    }
                }}
            >
                <Form>
                    {/* Title */}
                    <Row>
                        <Col>
                            <p className="fw-bold">Search Digital Specimens</p>
                        </Col>
                    </Row>
                    {/* Query bar */}
                    <Row className="mt-2">
                        <Col>
                            <InputField name="query"
                                placeholder="Bellis perennis"
                            />
                        </Col>
                    </Row>
                    {/* Submit button */}
                    <Row className="flex-row-reverse mt-3">
                        <Col lg="auto">
                            <Button type="submit"
                                variant="primary"
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </div>
    );
};

export default SearchBar;
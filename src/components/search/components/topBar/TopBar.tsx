/* Import Dependencies */
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

/* Import Hooks */
import { useAppSelector, useAppDispatch } from 'app/Hooks';

/* Import Store */
import { setSearchDigitalSpecimen, getCompareDigitalSpecimen, setCompareDigitalSpecimen } from 'redux-store/SearchSlice';

/* Import Components */
import { Button, InputField } from 'components/elements/customUI/CustomUI';


/**
 * Component that renders the top bar on the search page
 * @returns JSX Component
 */
const TopBar = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const compareDigitalSpecimen = useAppSelector(getCompareDigitalSpecimen)
    const initialFormValues: {
        query: string
    } = {
        query: searchParams.get('q') ?? ''
    };

    return (
        <div>
            <Formik initialValues={initialFormValues}
                enableReinitialize
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
                        <Col lg={{ span: 3 }}
                            className="tourSearch2"
                        >
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
                                        className="h-100"
                                    >
                                        Search
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        {/* Compare button */}
                        <Col className="d-flex justify-content-end">
                            <Button type="button"
                                variant="secondary"
                                className="tourCompare2"
                                OnClick={() => {
                                    dispatch(setSearchDigitalSpecimen(undefined));
                                    dispatch(setCompareDigitalSpecimen(compareDigitalSpecimen ? undefined : []))
                                }
                                }
                            >
                                {!compareDigitalSpecimen ? 'Compare' : 'Cancel Compare'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </div>
    );
};

export default TopBar;
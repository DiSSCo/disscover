/* Import Dependencies */
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

/* Import Components */
import { Button, InputField, Tooltip } from 'components/elements/customUI/CustomUI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

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
    const [copyMessage, setCopyMessage] = useState<string>('Copy url');

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
                        {/* Share list */}
                        <Col lg={{span: 9}}>
                            <Row className="d-flex justify-content-end">
                                <Col lg="auto" className="d-flex align-items-center">
                                    <Button type="button"
                                        variant="blank"
                                        className="px-0 py-0 fs-4 tc-secondary fw-lightBold"
                                        OnClick={() => {
                                            navigator.clipboard.writeText(location.href);
                                            setCopyMessage('Url copied');

                                            setTimeout(() => {
                                                setCopyMessage('Copy url');
                                            }, 2000);
                                        }}
                                    >   
                                        <Tooltip text={copyMessage} placement="bottom">
                                            <div>
                                                <FontAwesomeIcon icon={faCopy}
                                                    className="tc-secondary pe-2"
                                                />
                                                <span>Share this list</span>
                                            </div>
                                        </Tooltip>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </div>
    );
};

export default TopBar;
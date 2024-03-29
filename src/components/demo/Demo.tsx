/* Import Dependencies */
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from '../specimen/specimen.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import DOITooltipDemo from './DOITooltipDemo';
import Footer from 'components/general/footer/Footer';


const Demo = () => {
    /* Base variables */
    const [inputDOI, setInputDOI] = useState<string>();

    return (
        <div className="h-100 overflow-scroll d-flex flex-column">
            <Header />

            <Container fluid className={`${styles.content} flex-grow-1`}>
                <Row className="h-100 align-items-center">
                    <Col>
                        <Row className="justify-content-center">
                            <Col className="col-md-auto">
                                <h1 className="text-center"> DOI Tooltip Demo </h1>

                                <p className="text-center">
                                    This demo page demonstrates the DOI Tooltip component offered by DiSSCo.
                                    <br />
                                    It is a component that can be used to cite DOI in text. When clicked on, it displays details on the DOI.
                                    <br />
                                    To implement the component yourself, please refer to this Notebook
                                    <br />
                                    <span className="c-accent">
                                        <a href="https://colab.research.google.com/drive/1edY_tsIJvtQJsntTHk_xtnbdyuhLw6Br?usp=sharing"
                                            target="_blank"
                                        >
                                            https://colab.research.google.com/drive/1edY_tsIJvtQJsntTHk_xtnbdyuhLw6Br?usp=sharing
                                        </a>
                                    </span>
                                    <br />
                                    <br />
                                    The source code can be found at:&nbsp;
                                    <span className="c-accent">
                                        <a href="https://github.com/DiSSCo/DOI-Tooltip"
                                            target="_blank"
                                        >
                                            https://github.com/DiSSCo/DOI-Tooltip
                                        </a>
                                    </span>
                                </p>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={{ span: 6, offset: 3 }} className="mt-5">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,

                                <DOITooltipDemo doi={'TEST/ZZZ-ZW5-RF7'}>
                                    <span>
                                        TEST/ZZZ-ZW5-RF7
                                    </span>
                                </DOITooltipDemo>

                                sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt mollit anim id est laborum.
                            </Col>
                        </Row>
                        <Row className="mt-5 justify-content-center">
                            <Col className="col-md-auto">
                                <Row>
                                    <Col>
                                        <p> Or try inserting a DOI: </p>
                                    </Col>
                                </Row>

                                <Formik
                                    initialValues={{
                                        DOI: ''
                                    }}
                                    onSubmit={async (form) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));

                                        setInputDOI(form.DOI);
                                    }}
                                >
                                    <Form>
                                        <Row>
                                            <Col>
                                                <Field name="DOI" type="text" className="formField" />
                                            </Col>
                                            <Col className="ps-0">
                                                <button type="submit"
                                                    className="primaryButton px-3 py-1"
                                                >
                                                    Go
                                                </button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Formik>

                                <Row>
                                    <Col>
                                        {inputDOI &&
                                            <DOITooltipDemo doi={inputDOI}>
                                                <span>
                                                    {inputDOI}
                                                </span>
                                            </DOITooltipDemo>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Demo;
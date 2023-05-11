/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from './documents.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';


const PrivacyPolicy = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Container className={styles.documentContent}>
                <Row className="h-100 overflow-scroll">
                    <Col md={{ span: 8, offset: 2 }}>
                        {/* Title */}
                        <Row className="mt-5">
                            <Col className="mt-4">
                                <h1 className={styles.title}>Privacy Policy</h1>
                            </Col>
                        </Row>

                        {/* Document Content */}
                        <Row>
                            <Col>
                                {/* Sections */}
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className={styles.sectionTitle}>Header</h4>
                                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                            sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className={styles.sectionTitle}>Header</h4>
                                        <p> Test
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className={styles.sectionTitle}>Header</h4>
                                        <p> Test 2
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className={styles.sectionTitle}>Header</h4>
                                        <p> Test 3
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className={styles.sectionTitle}>Header</h4>
                                        <p> Test 4
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className={styles.sectionTitle}>Header</h4>
                                        <p> Test 5
                                        </p>
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

export default PrivacyPolicy;
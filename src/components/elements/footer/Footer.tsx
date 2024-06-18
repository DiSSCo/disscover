/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* Import Components */
import { Button } from '../customUI/CustomUI';


/**
 * Component that renders the application's footer
 * @returns JSX Component
 */
const Footer = () => {
    /* Hooks */
    const navigate = useNavigate();

    return (
        <Container fluid
            className="mt-auto pb-3"
        >
            <Row>
                <Col lg={{ span: 10, offset: 1 }}>
                    <Row>
                        {/* DiSSCo contribution */}
                        <Col lg="auto">
                            <a href="https://dissco.eu"
                                target="_blank"
                                rel="noreferer"
                            >
                                <p className="fs-5 tc-accent">Distributed System of Scientific Collections</p>
                            </a>
                        </Col>
                        {/* Support link */}
                        <Col>
                            <a href="mailto: info@dissco.eu"
                                rel="noreferer"
                            >
                                <p className="fs-5">Get support</p>
                            </a>
                        </Col>
                        {/* Link to privacy policy */}
                        <Col lg="auto"
                            className="d-flex flex-column align-items-start"
                        >
                            <Button type="button"
                                variant="blank"
                                className="fs-5"
                                OnClick={() => navigate('/privacy')}
                            >
                                Privacy
                            </Button>
                        </Col>
                        {/* Terms of service link */}
                        <Col lg="auto"
                            className="d-flex flex-column align-items-start"
                        >
                            <Button type="button"
                                variant="blank"
                                className="fs-5"
                                OnClick={() => navigate('/terms')}
                            >
                                Terms
                            </Button>
                        </Col>
                        <Col lg="auto">
                            <a href="https://github.com/DiSSCo/unified-curation-and-annotation-service/issues"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <p className="fs-5 tc-accent">Send us feedback on GitHub</p>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;
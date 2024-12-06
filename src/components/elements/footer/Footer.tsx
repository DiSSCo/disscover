/* Import Dependencies */
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* Import Webroot */
import EUFundedLogo from 'webroot/logos/euFundedLogo.png';

/* Import Styles */
import styles from './Footer.module.scss';

/* Import Components */
import { Button } from '../customUI/CustomUI';


/* Props Type */
type Props = {
    span?: number,
    offset?: number
};


/**
 * Component that renders the application's footer
 * @param span The width in Bootstrap span (grid based on 12 columns)
 * @param offset the offset width in Bootstrap span (grid based on 12 columns)
 * @returns JSX Component
 */
const Footer = (props: Props) => {
    const { span, offset } = props;

    /* Hooks */
    const navigate = useNavigate();

    /* Class Names */
    const footerClass = classNames({
        'p-0': !span
    });

    return (
        <Container fluid
            className="mt-auto pb-3"
        >
            <Row>
                <Col lg={{ span: span ?? 12, offset }}
                    className={footerClass}
                >
                    <Row>
                        {/* EU funded logo */}
                        <Col lg="auto">
                            <img src={EUFundedLogo}
                                alt="Funded by the European Union"
                                className={styles.euFundedLogo}
                            />
                        </Col>
                        {/* DiSSCo contribution */}
                        <Col lg="auto"
                            className="d-flex align-items-center"
                        >
                            <a href="https://dissco.eu"
                                target="_blank"
                                rel="noreferer"
                            >
                                <p className="fs-5 tc-accent">Distributed System of Scientific Collections</p>
                            </a>
                        </Col>
                        {/* Support link */}
                        <Col className="d-flex align-items-center">
                            <a href="mailto: support@dissco.jitbit.com"
                                rel="noreferer"
                            >
                                <p className="fs-5">Get support</p>
                            </a>
                        </Col>
                        {/* Link to acknowledgements */}
                        <Col lg="auto"
                            className="d-flex flex-column align-items-center"
                        >
                            <Button type="button"
                                variant="blank"
                                className="fs-5"
                                OnClick={() => navigate('/acknowledgements')}
                            >
                                Acknowledgements
                            </Button>
                        </Col>
                        {/* Link to privacy policy */}
                        <Col lg="auto"
                            className="d-flex flex-column align-items-center"
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
                            className="d-flex flex-column align-items-center"
                        >
                            <Button type="button"
                                variant="blank"
                                className="fs-5"
                                OnClick={() => navigate('/terms')}
                            >
                                Terms
                            </Button>
                        </Col>
                        <Col lg="auto"
                            className="d-flex align-items-center"
                        >
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
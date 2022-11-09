import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './footer.css';

/* Import Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";


const Footer = (props) => {
    const page = props.page;
    const currentYear = new Date().getFullYear();

    const [footerToggle, setFooterToggle] = useState('');

    function ToggleFooter() {
        if (footerToggle) {
            setFooterToggle('');
        } else {
            setFooterToggle('active');
        }
    }

    return (
        <Container fluid className={`footer ${page} ${footerToggle}`}>
            <Row>
                <Col md={{ offset: 1 }} className="col-md-10 py-3 footer_text">
                    <Row>
                        <Col md={{ span: 4 }}>
                            <Row>
                                <Col>
                                    <span className="strong"> DiSSCo: </span> Distributed System of Scientific Collections
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-2">
                                    Privacy Policy
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-2">
                                    Also see the <a href="https://dissco.eu" className="footer_link"> DiSSCo website </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-2">
                                    © DiSSCo {currentYear}
                                </Col>
                            </Row>
                        </Col>
                        <Col md={{ span: 2 }}>
                            <Row>
                                <Col>
                                    <span className="strong"> Sitemap: </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-2">
                                    Homepage
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-2">
                                    Specimen Search
                                </Col>
                            </Row>
                        </Col>
                        {(page !== 'home') &&
                            <Col>
                                <Row className="justify-content-end">
                                    <Col className="col-md-auto">
                                        <FontAwesomeIcon icon={faChevronUp}
                                            className={`footer_toggleIcon ${footerToggle}`}
                                            onClick={() => ToggleFooter()}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;
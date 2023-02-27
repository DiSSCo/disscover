/* Import Dependencies */
import { useState } from "react";
import { useLocation } from "react-router-dom";
import classNames from 'classnames';
import { Container, Row, Col } from "react-bootstrap";

/* Import Styles */
import './footer.scss';

/* Import Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";


const Footer = () => {
    const location = useLocation();

    /* Get current year */
    const currentYear = new Date().getFullYear();

    /* Handling the toggling of the Footer on Content Pages (other than Home) */
    const [footerToggle, setFooterToggle] = useState(false);

    const footerClass = classNames({
        'footer': true,
        'home': (location.pathname === '/'),
        'active': footerToggle
    });

    const toggleIconClass = classNames({
        'footer_toggleIcon': true,
        'active': footerToggle
    });

    return (
        <Container fluid className={footerClass}>
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
                        {(location.pathname !== '/') &&
                            <Col>
                                <Row className="justify-content-end">
                                    <Col className="col-md-auto">
                                        <FontAwesomeIcon icon={faChevronUp}
                                            className={toggleIconClass}
                                            onClick={() => setFooterToggle(!footerToggle)}
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
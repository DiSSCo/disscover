import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './footer.css';


const Footer = (props) => {
    const page = props.page;
    const currentYear = new Date().getFullYear();

    return (
        <Container fluid className={"footer mt-auto " + page}>
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
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;
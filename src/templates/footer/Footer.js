import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './footer.css';

/* Import media */
import DisscoLogo from 'webroot/img/dissco-logo-web.svg';


const Footer = () => {
    return (
        <Container fluid className="footer mt-auto">
            <Row>
                <Col md={{offset: 1 }} className="col-md-auto mt-3">
                    <img src={DisscoLogo} alt="DiSSCo logo" className="footer_logo" />
                </Col>
                <Col md={{ span: 2 }} className="footer_text mt-3">
                    Also see the <a href="https://dissco.eu" className="footer_link"> DiSSCo website </a>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;
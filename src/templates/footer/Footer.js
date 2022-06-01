import React from "react";
import { Container, Row } from "react-bootstrap";
import './footer.css';

const Footer = () => {
    return (
        <Container fluid className="footer mt-auto">
            <Row className="footerText">
                Footer
            </Row>
        </Container>
    );
}

export default Footer;
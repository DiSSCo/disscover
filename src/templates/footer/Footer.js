import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import './footer.css';

class Footer extends React.Component {
    render() {
        return (
            <Container fluid className="footer mt-auto">
                <Row className="footerText">
                    Footer
                </Row>
            </Container>
        );
    }
}

export default Footer;
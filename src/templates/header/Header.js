import React from "react";
import "./header.css";
import {Container, Row, Col} from "react-bootstrap";

/* Import Components */


class Header extends React.Component {
    render() {
        return (
            <Container fluid className="header">
                <Row>
                    <Col md="5">
                        <h1 className="headerTitle">
                            DiSSCo Annotation Portal
                        </h1>
                    </Col>
                    <Col md="7">
                        <Row>
                            <Col md={{span: 2, offset: 10}}>
                                <button className="loginButton">
                                    Login
                                </button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Header;
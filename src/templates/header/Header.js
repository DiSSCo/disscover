import React from "react";
import "./header.css";
import { Container, Row, Col } from "react-bootstrap";

/* Import Components */
import Login from '../login/Login.js';


const Header = () => {
    return (
        <Container fluid className="header">
            <Row>
                <Col md="5">
                    <h1 className="headerTitle">
                        DiSSCo Curation and Annotation Portal
                    </h1>
                </Col>
                <Col md="7">
                    <Row>
                        <Col md={{ span: 2, offset: 10 }}>
                            <Login />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;
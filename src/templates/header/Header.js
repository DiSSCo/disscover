import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import UserService from 'keycloak/Keycloak';
import "./header.css";

/* Import Components */
import Login from './login/Login';
import Profile from './profile/Profile';

/* Import Media */
import DisscoLogo from 'webroot/img/dissco-logo-web.svg';
import DisscoLogoWhite from 'webroot/img/dissco-logo-web-white.svg';


const Header = () => {
    const token = UserService.getToken();
    const location = useLocation();

    if (location.pathname === '/') {
        /* Render Header for Home Page */
        return (
            <Container fluid className="header_home">
                <Row>
                    <Col md={{ span: 12 }} className="pt-3 px-5">
                        <Row>
                            <Col className="col-md-auto">
                                <img src={DisscoLogoWhite} alt="DiSSCo logo" className="header_logo" />
                            </Col>
                            <Col className="col-md-auto">
                                <h1 className="header_homeTitle">
                                    Unified Curation and Annotation System
                                </h1>
                                <h2 className="header_homeSubTitle">
                                    UCAS <span className="header_homeProofOfConcept"> (Proof of concept) </span>
                                </h2>
                            </Col>
                            <Col>
                                <Row>
                                    {token ?
                                        <Col md={{ span: 12 }}>
                                            <Profile />
                                        </Col>
                                        : <Col md={{ span: 12 }}>
                                            <Login />
                                        </Col>
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    } else {
        /* Render Header for Content Pages */
        return (
            <Container fluid>
                <Row>
                    <Col md={{ span: 10, offset: 1 }} className="header pt-3">
                        <Row>
                            <Col className="col-md-auto">
                                <img src={DisscoLogo} alt="DiSSCo logo" className="header_logo" />
                            </Col>
                            <Col className="col-md-auto">
                                <h1 className="header_title">
                                    UCAS
                                    <span className="header_proofOfConcept"> (Proof of concept) </span>
                                </h1>
                            </Col>
                            <Col>
                                <Row>
                                    {token ?
                                        <Col md={{ span: 12 }}>
                                            <Profile />
                                        </Col>
                                        : <Col md={{ span: 12 }}>
                                            <Login />
                                        </Col>
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Header;
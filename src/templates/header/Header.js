import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, TabContainer } from "react-bootstrap";
import UserService from 'keycloak/Keycloak';
import "./header.css";

/* Import Components */
import Login from './login/Login';
import Profile from './profile/Profile';
import Navigation from "./navigation/Navigation";

/* Import Media */
import DisscoLogo from 'webroot/img/dissco-logo-web.svg';
import DisscoLogoWhite from 'webroot/img/dissco-logo-web-white.svg';


const Header = () => {
    const token = UserService.getToken();
    const location = useLocation();

    if (location.pathname === '/') {
        /* Render Header for Home Page */
        return (
            <Navbar expand="lg" className="p-0">
                <Container fluid className="header_home px-5">
                    <Navbar.Brand>
                        <Row>
                            <Col className="col-md-auto">
                                <Link to='/'>
                                    <img src={DisscoLogoWhite} alt="DiSSCo logo" className="header_logo" />
                                </Link>
                            </Col>
                            <Col className="col-md-auto">
                                <h1 className="header_homeTitle">
                                    Unified Curation and Annotation System
                                </h1>
                                <h2 className="header_homeSubTitle">
                                    UCAS <span className="header_homeProofOfConcept"> (Proof of concept) </span>
                                </h2>
                            </Col>
                        </Row>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="basic-navbar-nav">
                        <Row className="w-100">
                            <Col>
                                <Nav className="justify-content-end mt-1">
                                    <Nav.Link href={"/"} className="navItem home px-3">
                                        Home
                                    </Nav.Link>

                                    <Nav.Link href={"/search"} className="navItem home px-3">
                                        Search
                                    </Nav.Link>

                                    <Nav.Link href={"/annotate"} className="navItem home px-3">
                                        Annotate
                                    </Nav.Link>

                                </Nav>
                            </Col>
                            <Col className="col-md-auto">
                                {token ?
                                    <Profile />
                                    : <Login />
                                }
                            </Col>
                        </Row>
                    </Navbar.Collapse>

                    {/* <Row>
                        <Col md={{ span: 12 }} className="pt-3 px-5">
                            <Row>
                                <Col className="col-md-auto">
                                    <Link to='/'>
                                        <img src={DisscoLogoWhite} alt="DiSSCo logo" className="header_logo" />
                                    </Link>
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
                                        <Col md={{ span: 9 }} className="pt-2">
                                            <Row className="justify-content-end">
                                                <Navigation home={'home'} />
                                            </Row>
                                        </Col>
                                        <Col>
                                            {token ?
                                                <Profile />
                                                : <Login />
                                            }

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row> */}
                </Container>
            </Navbar>


        );
    } else {
        /* Render Header for Content Pages */
        return (

            <Container fluid>
                <Row>
                    <Col md={{ span: 10, offset: 1 }} className="header">
                        <Navbar>
                            <Navbar.Brand>
                                <Row>
                                    <Col className="col-md-auto">
                                        <Link to='/'>
                                            <img src={DisscoLogo} alt="DiSSCo logo" className="header_logo" />
                                        </Link>
                                    </Col>
                                    <Col className="col-md-auto">
                                        <h1 className="header_title">
                                            UCAS
                                            <span className="header_proofOfConcept"> (Proof of concept) </span>
                                        </h1>
                                    </Col>
                                </Row>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse className="basic-navbar-nav">
                                <Row className="w-100">
                                    <Col>
                                        <Nav className="justify-content-end mt-1">
                                            <Nav.Link href={"/"} className="navItem home px-3">
                                                Home
                                            </Nav.Link>

                                            <Nav.Link href={"/search"} className="navItem home px-3">
                                                Search
                                            </Nav.Link>

                                            <Nav.Link href={"/annotate"} className="navItem home px-3">
                                                Annotate
                                            </Nav.Link>

                                        </Nav>
                                    </Col>
                                    <Col className="col-md-auto">
                                        {token ?
                                            <Profile />
                                            : <Login />
                                        }
                                    </Col>
                                </Row>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>

                {/* <Row>
                        <Col md={{ span: 10, offset: 1 }} className="header pt-3">
                            <Row>
                                <Col className="col-md-auto">
                                    <Link to='/'>
                                        <img src={DisscoLogo} alt="DiSSCo logo" className="header_logo" />
                                    </Link>
                                </Col>
                                <Col className="col-md-auto">
                                    <h1 className="header_title">
                                        UCAS
                                        <span className="header_proofOfConcept"> (Proof of concept) </span>
                                    </h1>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col md={{ span: 9 }} className="pt-2">
                                            <Row className="justify-content-end">
                                                <Navigation />
                                            </Row>
                                        </Col>
                                        <Col>
                                            {token ?
                                                <Profile />
                                                : <Login />
                                            }

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row> */}
            </Container>
        );
    }
}

export default Header;
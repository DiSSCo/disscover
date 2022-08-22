import { Container, Row, Col } from "react-bootstrap";
import UserService from 'keycloak/Keycloak';
import "./header.css";

/* Import Components */
import Login from './login/Login';
import Profile from './profile/Profile';


const Header = () => {
    const token = UserService.getToken();

    return (
        <Container fluid className="header">
            <Row>
                <Col md={{ span: 6 }}>
                    <h1 className="ms-5 headerTitle">
                        Unified Curation and Annotation System
                    </h1>
                </Col>
                <Col md={{ span: 2, offset: 4 }}>
                    <Row>
                        {token ?
                            <Col md={{ span: 12 }}>
                                <Profile />
                            </Col>
                            : <Col md={{ span: 10 }}>
                                <Login />
                            </Col>
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;
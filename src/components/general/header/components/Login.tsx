/* Import Dependencies */
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';


const Login = () => {
    return (
        <Row>
            <Col md={{ span: 12 }}>
                <Row>
                    <Col md={{ span: 12 }} className="pt-2 ps-3 pe-0">
                        <button className="header_loginButton px-4 border-1-primary-dark" onClick={() => KeycloakService.Login()}>
                            Login
                        </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Login;
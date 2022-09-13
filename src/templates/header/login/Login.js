import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';

/* Import Components*/
import LoginButton from './LoginButton';


const Login = () => {
    function Login() {
        UserService.doLogin();
    }

    return (
        <Row>
            <Col md={{span: 2, offset: 10}}>
                <LoginButton login={Login} />
            </Col>
        </Row>
    );
}

export default Login;
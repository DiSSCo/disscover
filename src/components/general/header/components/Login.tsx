/* Import Dependencies */
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/general/header/header.module.scss';


const Login = () => {
    return (
        <Row>
            <Col md={{ span: 12 }} className="pe-0">
                <button className={`${styles.loginButton} fs-3 rounded-c px-2`} onClick={() => KeycloakService.Login()}>
                    Login / Sign-up
                </button>
            </Col>
        </Row>
    );
}

export default Login;
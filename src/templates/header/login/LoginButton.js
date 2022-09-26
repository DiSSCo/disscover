import { Row, Col } from 'react-bootstrap';


function LoginButton(props) {
    return (
        <Row>
            <Col md={{ span: 12 }} className="pt-3">
                <button className="header_loginButton" onClick={() => props.login()}>
                    Login
                </button>
            </Col>
        </Row>
    );
}

export default LoginButton;
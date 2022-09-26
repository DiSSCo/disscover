import { Row, Col } from 'react-bootstrap';


function LoginButton(props) {
    return (
        <Row>
            <Col md={{ span: 12 }} className="pt-2">
                <button className="header_loginButton px-4" onClick={() => props.login()}>
                    Login
                </button>
            </Col>
        </Row>
    );
}

export default LoginButton;
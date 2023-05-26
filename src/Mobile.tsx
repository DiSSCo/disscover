/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Webroot */
import DiSSCoLogo from 'webroot/img/dissco-logo-web.svg';


const Mobile = () => {
    return (
        <Container fluid className="mobileBackground">
            {/* DiSSCover Title */}
            <Row className="mt-5">
                <Col className="text-center">
                    <h1 className="mobileTitle"> DiSSCover </h1>
                </Col>
            </Row>
            {/* DiSSCo Logo */}
            <Row>
                <Col xs={{ span: 6, offset: 3 }}>
                    <Row>
                        <Col xs={{ span: 8, offset: 2 }}>
                            <img src={DiSSCoLogo} alt="DiSSCo Logo" />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* Text */}
            <Row className="mt-5">
                <Col xs={{ span: 10, offset: 1 }} className="text-center">
                    <p>
                        Hi there, the mobile version of DiSSCover is not ready for usage.
                        Please use the desktop version in the meantime.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Mobile;
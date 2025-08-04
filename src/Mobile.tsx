/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Styles */
import './App.css';

/* Import Webroot */
import DiSSCoLogo from 'webroot/logos/dissco-logo.svg';


/**
 * Function to render the application body and its routes
 * @returns JSX component
 */
const Mobile = () => {
    return (
        <div className="h-100 w-100 overflow-hidden">
            <Container fluid className="h-100 w-100 d-flex align-items-center">
                <div className="px-5">
                    {/* DiSSCover Title */}
                    <Row className="mt-5">
                        <Col className="text-center">
                            <h1 className="tc-primary fw-bold"
                                style={{
                                    fontSize: '50px'
                                }}
                            >
                                DiSSCover
                            </h1>
                        </Col>
                    </Row>
                    {/* DiSSCo Logo */}
                    <Row className="mt-5 justify-content-center">
                        <Col className="col-auto">
                            <img src={DiSSCoLogo}
                                alt="DiSSCo Logo"
                                style={{
                                    height: '40px'
                                }}
                            />
                        </Col>
                    </Row>
                    {/* Text */}
                    <Row className="mt-5">
                        <Col className="text-center">
                            <p style={{
                                fontSize: '16px'
                            }}>
                                Thanks for your interest in DiSSCover!
                                Unfortunately we do not yet support mobile devices,
                                please use a desktop or laptop for access in the meantime.
                            </p>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default Mobile;
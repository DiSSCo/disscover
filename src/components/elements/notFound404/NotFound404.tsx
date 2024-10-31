/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* Import Components */
import Header from '../header/Header';
import Footer from '../footer/Footer';


/**
 * Component that renders a 404 page for when the user enters an invalid url
 * @returns JSX Component
 */
const NotFound404 = () => {
    return (
        <div className="h-100 d-flex flex-column">
            {/* Render header */}
            <Header span={10}
                offset={1}
            />

            {/* Render not found 404 page */}
            <Container fluid className="flex-grow-1">
                <Row className="h-100">
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <p className="fs-2 fw-lightBold">404 - Page not found</p>
                        <p className="mt-3">Nothing groovy going on here...</p>
                        <p>
                            Please try again or
                            <Link to="/"
                                className="tc-primary"
                            >
                                {` go back to home`}
                            </Link>
                        </p>
                    </Col>
                </Row>
            </Container>

            {/* Render footer */}
            <Footer span={10}
                offset={1}
            />
        </div>
    );
};

export default NotFound404;
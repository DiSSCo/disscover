import { Container, Row, Col, Collapse } from 'react-bootstrap';

/* Import Components */
import Header from 'templates/header/Header';
import Footer from 'templates/footer/Footer';


const DefaultAnnotate = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Container fluid>
                <Row>
                    <Col md={{ span: 10, offset: 1 }} className="pt-5">
                        <Row>
                            Default annotation page <br />
                            Maybe show the user's annotations and global activity (like homepage) <br />
                            Or direct specimen search with redirect to Search page
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    )
}

export default DefaultAnnotate;
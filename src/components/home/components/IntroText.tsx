/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';


const IntroText = () => {
    return (
        <Row className="mt-3">
            <Col md={{ span: 5 }}>
                <Row>
                    <Col className="home_mainTitle">
                        <h2 className="fw-normal">
                            <span className="fw-bold"> U</span>nified we
                            <span className="fw-bold"> C</span>urate and
                            <span className="fw-bold"> A</span>nnotate <br />
                            specimens in this <span className="fw-bold"> S</span>ystem
                        </h2>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="home_introText">
                        UCAS is a FAIR annotation and curation platform.
                        Human experts and machines can add annotations on Digital Specimens.
                        The annotations are stored as FAIR Digital Objects (with a persistent identifier).
                        UCAS also keeps track of the transactions on the data as provenance information related
                        to the curation or annotation events.
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default IntroText;
/* Import Dependencies */
import { Card, Row, Col } from 'react-bootstrap';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';


const References = () => {
    return (
        <Card className="h-100">
            <Card.Body className="h-100">
                <Row className="h-100">
                    <Col className="col-md-auto h-100 d-flex flex-column">
                        <Row>
                            <Col>
                                <Card.Title className="c-accent">
                                    <FontAwesomeIcon icon={faLink} />
                                </Card.Title>
                            </Col>
                        </Row>
                        <Row className="flex-grow-1">
                            <Col className="d-flex justify-content-center">
                                <div className="w-0 b-accent" />
                            </Col>
                        </Row>
                    </Col>
                    <Col className="h-100 ps-0 d-flex flex-column">
                        {/* Block icon and title */}
                        <Card.Title className="c-accent">
                            <span> References </span>
                        </Card.Title>

                        {/* Properties */}
                        <Row className="mt-2 flex-grow-1 fs-4">
                            <Col className="h-100">
                                {/* Links */}
                                <Row className="h-25">
                                    <Col>
                                        {/* GBIF */}
                                        <Row>
                                            <Col className="col-md-auto pe-0 fw-lightBold">
                                                GBIF:
                                            </Col>
                                        </Row>
                                        {/* GRSciColl */}
                                        <Row>
                                            <Col className="col-md-auto pe-0 fw-lightBold">
                                                GRSciColl:
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                {/* Internal */}
                                <Row className="h-75 pt-3">
                                    <Col className="d-flex flex-column justify-content-between">
                                        {/* Citations */}
                                        <Row>
                                            <Col>
                                                <div className="w-100 b-secondary p-2">
                                                    <Row>
                                                        <Col className="col-md-auto pe-0 fw-lightBold">
                                                            Citations:
                                                        </Col>
                                                    </Row>

                                                </div>
                                            </Col>
                                        </Row>
                                        {/* Linkages */}
                                        <Row>
                                            <Col>
                                                <div className="w-100 b-secondary p-2">
                                                    <Row>
                                                        <Col className="col-md-auto pe-0 fw-lightBold">
                                                            Linkages:
                                                        </Col>
                                                    </Row>

                                                </div>
                                            </Col>
                                        </Row>
                                        {/* Assertions */}
                                        <Row>
                                            <Col>
                                                <div className="w-100 b-secondary p-2">
                                                    <Row>
                                                        <Col className="col-md-auto pe-0 fw-lightBold">
                                                            Assertions:
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default References;
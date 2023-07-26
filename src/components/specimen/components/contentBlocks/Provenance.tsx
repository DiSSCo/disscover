/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';


const Provenance = () => {
    const specimen = useAppSelector(getSpecimen);

    return (
        <Row className="h-100">
            <Col className="h-100">
                <Card className="h-100">
                    <Card.Body className="h-100">
                        {/* Micro Credits */}
                        <Row>
                            <Col>
                                <h5 className="c-accent">Microcredits</h5>

                                <p> <span className="fw-lightBold">Collector: </span>
                                    {specimen.data['ods:collector'] ?
                                        specimen.data['ods:collector'] :
                                        'Undefined'
                                    }
                                </p>
                            </Col>
                        </Row>
                        {/* Annotations Credits */}
                        <Row className="mt-4">
                            <Col>
                                <Row>
                                    <Col>
                                        <h5 className="c-accent">Annotations credits</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <p>Coming soon!</p>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Provenance;
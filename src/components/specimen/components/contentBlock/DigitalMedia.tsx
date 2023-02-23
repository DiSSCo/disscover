/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimenDigitalMedia } from "redux/specimen/SpecimenSlice";


const DigitalMedia = () => {
    /* Base variables */
    const specimenDigitalMedia = useAppSelector(getSpecimenDigitalMedia);

    return (
        <Row className="h-100">
            <Col>
                <Card className="h-100">
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Title>
                                    Digital Media Gallery
                                </Card.Title>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            {(specimenDigitalMedia.length > 0) &&
                                <>
                                    {specimenDigitalMedia.map((digitalMedia) => {
                                        return (
                                            <Col key={digitalMedia.id} md={{span: 3}}>
                                                <img src={digitalMedia.mediaUrl} alt={digitalMedia.mediaUrl}
                                                    className="w-100"
                                                />
                                            </Col>
                                        );
                                    })}
                                </>
                            }
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default DigitalMedia;
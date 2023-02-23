/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Sources */
import MidsSpecification from 'sources/midsSpecification.json';

/* Import Webroot */
import WaveVariant1 from 'webroot/img/visualElements/waveVariant1.svg';
import WaveVariant2 from 'webroot/img/visualElements/waveVariant2.svg';
import WaveVariant3 from 'webroot/img/visualElements/waveVariant3.svg';

/* Import Components */
import MIDSProperty from './MIDSProperty';


const MIDSOverview = () => {
    const midsSpecification1: Dict = MidsSpecification[1];
    const midsSpecification2: Dict = MidsSpecification[2];
    const midsSpecification3: Dict = MidsSpecification[3];

    return (
        <Row className="h-100">
            <Col>
                <Row className="h-100">
                    {/* MIDS 1 */}
                    <Col md={{ span: 4 }}>
                        <Card className="position-relative h-100">
                            <Card.Body>
                                <Card.Title>
                                    Basic Specimen
                                </Card.Title>
                                <Card.Subtitle className="text-muted">
                                    MIDS 1
                                </Card.Subtitle>

                                {/* MIDS 1 Properties */}
                                <Row className="mt-4">
                                    <Col>
                                        {Object.keys(midsSpecification1).map((property) => {
                                            return <MIDSProperty key={property} property={midsSpecification1[property].displayName}

                                            />
                                        })}
                                    </Col>
                                </Row>
                            </Card.Body>

                            <img src={WaveVariant1} alt=""
                                className={`${styles.midsWave} position-absolute bottom-0 w-100`}
                            />
                        </Card>
                    </Col>
                    {/* MIDS 2 */}
                    <Col md={{ span: 4 }}>
                        <Card className="position-relative h-100">
                            <Card.Body>
                                <Card.Title>
                                    Advanced Specimen
                                </Card.Title>
                                <Card.Subtitle className="text-muted">
                                    MIDS 2
                                </Card.Subtitle>

                                {/* MIDS 2 Properties */}
                                <Row className="mt-4">
                                    <Col>
                                        {Object.keys(midsSpecification2).map((property) => {
                                            return <MIDSProperty key={property} property={midsSpecification2[property].displayName}

                                            />
                                        })}
                                    </Col>
                                </Row>
                            </Card.Body>

                            <img src={WaveVariant2} alt=""
                                className={`${styles.midsWave} position-absolute bottom-0 w-100`}
                            />
                        </Card>
                    </Col>
                    {/* MIDS 3 */}
                    <Col md={{ span: 4 }}>
                        <Card className="position-relative h-100">
                            <Card.Body>
                                <Card.Title>
                                    Complete Specimen
                                </Card.Title>
                                <Card.Subtitle className="text-muted">
                                    MIDS 3
                                </Card.Subtitle>
                            </Card.Body>

                            <img src={WaveVariant3} alt=""
                                className={`${styles.midsWave} position-absolute bottom-0 w-100`}
                            />
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default MIDSOverview;
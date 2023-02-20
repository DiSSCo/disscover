/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from "redux/specimen/SpecimenSlice";

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrog } from '@fortawesome/free-solid-svg-icons'

/* Import Components */
import MidsBar from './MidsBar';


const IDCard = () => {
    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    const logo = (ror: string) => {
        try {
            return require(`../../../../webroot/img/organizationLogo/${ror}.png`);
        } catch (err) {
            return null;
        }
    };

    return (
        <Row>
            <Col>
                {/* ID Card Title */}
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <h2 className="text-truncate"> {specimen.specimenName} </h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-md-auto">
                                <h5> {specimen.type} </h5>
                            </Col>
                            <Col>
                                <FontAwesomeIcon icon={faFrog} />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/* MIDS Bar */}
                <Row className="mt-3">
                    <Col>
                        <MidsBar />
                    </Col>
                </Row>

                {/* ID Card Content */}
                <Row className="mt-5">
                    <Col>
                        <div className="w-100 h-100 position-relative">
                            <div className=" specimen_IDCardBackground w-100 h-100 position-absolute bg-primary-dark" />

                            <Card className="specimen_IDCard">
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        <Row>
                                            <Col>
                                                ID Card
                                            </Col>
                                            <Col className="col-md-auto">
                                                {specimen.id}
                                            </Col>
                                        </Row>
                                    </Card.Subtitle>

                                    <Row className="mt-4">
                                        <Col className="col-md-auto">
                                            <Row>
                                                <Col>
                                                    <p className="specimen_IDCardProperty text-primary m-0"> Physical Specimen ID ({specimen.physicalSpecimenIdType}): </p>
                                                    <p className="specimen_IDCardValue m-0"> {specimen.physicalSpecimenId} </p>
                                                </Col>
                                            </Row>
                                            <Row className="mt-1">
                                                <Col>
                                                    <span className="specimen_IDCardProperty text-primary m-0"> Physical Specimen Collection: </span>
                                                    <br /> <span className="specimen_IDCardValue"> {specimen.physicalSpecimenCollection} </span>
                                                </Col>
                                            </Row>
                                            <Row className="mt-1">
                                                <Col>
                                                    <span className="specimen_IDCardProperty text-primary m-0"> Scientific Name: </span>
                                                    <br /> <span className="specimen_IDCardValue"> {specimen.specimenName} </span>
                                                </Col>
                                            </Row>
                                            <Row className="mt-1">
                                                <Col>
                                                    <span className="specimen_IDCardProperty text-primary m-0"> Specimen Type: </span>
                                                    <br /> <span className="specimen_IDCardValue"> {specimen.type} </span>
                                                </Col>
                                            </Row>
                                            <Row className="mt-1">
                                                <Col>
                                                    <span className="specimen_IDCardProperty text-primary m-0"> Organization: </span>
                                                    <br /> <span className="specimen_IDCardValue"> {specimen.organizationId} </span>
                                                </Col>
                                            </Row>

                                            {logo(specimen.organizationId.replace('https://ror.org/', '')) &&
                                                <Row className="mt-1">
                                                    <Col md={{ span: 5, offset: 7 }}>
                                                        <img alt="Organization logo"
                                                            src={logo(specimen.organizationId.replace('https://ror.org/', ''))}
                                                            className="specimen_IDCardLogo w-100 h-100"
                                                        />
                                                    </Col>
                                                </Row>
                                            }
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default IDCard;
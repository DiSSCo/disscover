/* Import Dependencies */
import { Card, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function
};


const Origin = (props: Props) => {
    const { ShowWithAnnotations } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    let location: Dict = {};

    /* Use first occurrence as Origin reference */
    if (specimen.digitalSpecimen?.occurrences?.[0].location) {
        location = specimen.digitalSpecimen.occurrences[0].location;
    }

    return (
        <Card className="h-100">
            <Card.Body className="h-100 d-flex flex-column">
                <Row className="h-100">
                    <Col className="col-md-auto h-100 d-flex flex-column">
                        <Row>
                            <Col>
                                <Card.Title className="c-accent">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </Card.Title>
                            </Col>
                        </Row>
                        <Row className="flex-grow-1">
                            <Col className="d-flex justify-content-center">
                                <div className="w-0 b-accent" />
                            </Col>
                        </Row>
                    </Col>
                    <Col className="h-100 ps-0 d-flex flex-column overflow-hidden">
                        {/* Block icon and title */}
                        <Card.Title className="c-accent">
                            <span> Origin </span>
                        </Card.Title>

                        {/* Properties */}
                        <Row className="mt-2 flex-grow-1 fs-4">
                            <Col className="d-flex flex-column justify-content-between">
                                {/* Location Segment */}
                                <Row>
                                    <Col>
                                        {/* Collector */}
                                        <Row className="c-pointer"
                                            onClick={() => ShowWithAnnotations('dwc:recordedBy')}
                                        >
                                            <Col className="col-md-auto pe-0 fw-lightBold">
                                                Collector:
                                            </Col>
                                            <Col>
                                                <span className="textOverflow">{specimen.digitalSpecimen['dwc:recordedBy']}</span>
                                            </Col>
                                        </Row>
                                        {/* Country */}
                                        <Row className="c-pointer"
                                            onClick={() => ShowWithAnnotations('occurrences[0].location.dwc:country')}
                                        >
                                            <Col className="col-md-auto pe-0 fw-lightBold d-flex align-items-center">
                                                Country:
                                            </Col>
                                            <Col className="textOverflow d-flex align-items-center">
                                                <span className="textOverflow">{location['dwc:country']}</span>
                                            </Col>
                                            {location['dwc:countryCode'] &&
                                                <Col className="col-md-auto">
                                                    <img src={`https://flagsapi.com/${location['dwc:countryCode']}/shiny/64.png`}
                                                        alt="Flag icon of country"
                                                        className={styles.countryFlag}
                                                    />
                                                </Col>
                                            }
                                        </Row>
                                        {/* Locality */}
                                        <Row className="c-pointer"
                                            onClick={() => ShowWithAnnotations('occurrences[0].location.dwc:locality')}
                                        >
                                            <Col className="col-md-auto m-0 fw-lightBold">
                                                Locality:
                                            </Col>
                                            <Col className="textOverflow">
                                                {location['dwc:locality']}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                {/* Geological Context Segment */}
                                <Row className="pb-3">
                                    <Col>
                                        <Row className="pb-1">
                                            <Col>
                                                <p className="c-accent fw-lightBold"> Geological Context </p>
                                            </Col>
                                        </Row>
                                        {/* Earliest Stage */}
                                        <Row className="c-pointer"
                                            onClick={() => ShowWithAnnotations('occurrences[0].location.geologicalContext.dwc:earliestAgeOrLowestStage')}
                                        >
                                            <Col className="col-md-auto pe-0 fw-lightBold">
                                                Earliest stage:
                                            </Col>
                                            <Col>
                                                <span className="textOverflow">{location.geologicalContext['dwc:earliestAgeOrLowestStage']}</span>
                                            </Col>
                                        </Row>
                                        {/* Latest Stage */}
                                        <Row className="c-pointer"
                                            onClick={() => ShowWithAnnotations('occurrences[0].location.geologicalContext.dwc:latestAgeOrHighestStage')}
                                        >
                                            <Col className="col-md-auto pe-0 fw-lightBold">
                                                Latest stage:
                                            </Col>
                                            <Col>
                                                <span className="textOverflow">{location.geologicalContext['dwc:latestAgeOrHighestStage']}</span>
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

export default Origin;
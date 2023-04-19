/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen, getSpecimenDigitalMedia } from "redux/specimen/SpecimenSlice";

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrog } from '@fortawesome/free-solid-svg-icons'

/* Import Components */
import MidsBar from './MidsBar';


/* Props Typing */
interface Props {
    ToggleModal: Function
};


const IDCard = (props: Props) => {
    const { ToggleModal } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const specimenDigitalMedia = useAppSelector(getSpecimenDigitalMedia);

    return (
        <Row className="h-100">
            <Col className="h-100">
                <Row className={`${styles.IDCardHead}`}>
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
                    </Col>
                </Row>

                {/* ID Card Content */}
                <Row className={`${styles.IDCardBlock} pt-5`}>
                    <Col className="h-100">
                        <div className="w-100 h-100 position-relative">
                            <div className={`${styles.IDCardBackground} w-100 h-100 position-absolute bg-primary-dark`} />

                            <Row className={`${styles.IDCardBanner}`}>
                                <Col className="position-relative">
                                    {(specimenDigitalMedia.length > 0) ?
                                        <div className="w-100 h-100 position-relative">
                                            <img src={specimenDigitalMedia[0].digitalMediaObject.mediaUrl} alt="specimen preview image"
                                                className="w-100 position-relative rounded-c"
                                            />

                                            <div className={`${styles.IDCardBannerCover} w-100 h-100 position-absolute top-0 rounded-c`} />
                                        </div>
                                        : <div className="w-100 h-100 position-relative">
                                            <div className="w-100 position-relative rounded-c bg-primary">
                                                <h4 className="text-white py-5 text-center"> Placeholder image </h4>
                                            </div>

                                            <div className={`${styles.IDCardBannerCover} w-100 h-100 position-absolute top-0 rounded-c`} />
                                        </div>
                                    }
                                </Col>
                            </Row>
                            <Row style={{ height: '85%' }}>
                                <Col>
                                    <Card className={`${styles.IDCard} h-100`}>
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
                                                        <Col className={`${styles.IDCardPropertyBlock} rounded-c`}
                                                            onClick={() => ToggleModal('ods:physicalSpecimenId')}
                                                        >
                                                            <p className={`${styles.IDCardProperty} text-primary m-0`}> Physical Specimen ID ({specimen.physicalSpecimenIdType}): </p>
                                                            <p className={`${styles.IDCardValue} m-0`}> {specimen.physicalSpecimenId} </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-1">
                                                        <Col className={`${styles.IDCardPropertyBlock} rounded-c`}
                                                            onClick={() => ToggleModal('ods:physicalSpecimenCollection')}
                                                        >
                                                            <span className={`${styles.IDCardProperty} text-primary m-0`}> Physical Specimen Collection: </span>
                                                            <br /> <span className={`${styles.IDCardValue} m-0`}> {specimen.physicalSpecimenCollection} </span>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-1">
                                                        <Col className={`${styles.IDCardPropertyBlock} rounded-c`}
                                                            onClick={() => ToggleModal('ods:specimenName')}
                                                        >
                                                            <span className={`${styles.IDCardProperty} text-primary m-0`}> Scientific Name: </span>
                                                            <br /> <span className={`${styles.IDCardValue} m-0`}> {specimen.specimenName} </span>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-1">
                                                        <Col>
                                                            <span className={`${styles.IDCardProperty} text-primary m-0`}> Specimen Type: </span>
                                                            <br /> <span className={`${styles.IDCardValue} m-0`}> {specimen.type} </span>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-1">
                                                        <Col className={`${styles.IDCardPropertyBlock} rounded-c`}
                                                            onClick={() => ToggleModal('ods:organisationId')}
                                                        >
                                                            <span className={`${styles.IDCardProperty} text-primary m-0`}> Organisation: </span>
                                                            <br /> <span className={`${styles.IDCardValue} m-0`}> {specimen.organisationId} </span>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-1">
                                                        <Col className={`${styles.IDCardPropertyBlock} rounded-c`}
                                                            onClick={() => ToggleModal('dcterms:license')}
                                                        >
                                                            <span className={`${styles.IDCardProperty} text-primary m-0`}> License: </span>
                                                            <br /> <span className={`${styles.IDCardValue} m-0`}> {specimen.data['dcterms:license']} </span>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default IDCard;
/* Import Dependencies */
import classNames from 'classnames';
import KeycloakService from 'keycloak/Keycloak';
import { ValidateURL } from 'global/Utilities';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen, getSpecimenDigitalMedia } from 'redux/specimen/SpecimenSlice';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';


/* Props Typing */
interface Props {
    ToggleModal: Function
};


const IDCard = (props: Props) => {
    const { ToggleModal } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const specimenDigitalMedia = useAppSelector(getSpecimenDigitalMedia);

    /* ClassName for Specimen Property Hover */
    const classPropertyBlockHover = classNames({
        [`${styles.IDCardPropertyBlockHover}`]: KeycloakService.IsLoggedIn()
    });

    /* Functions for displaying certain Specimen properties with effects */
    const OrganisationProperty = () => {
        let organisationText: string;

        if (specimen.data['ods:organisationName']) {
            organisationText = specimen.data['ods:organisationName'];
        } else {
            organisationText = specimen.organisationId;
        }

        return <a href={specimen.organisationId} target="_blank" rel="noreferrer"> {organisationText} </a>;
    }

    const PhysicalSpecimenIdProperty = () => {
        if (ValidateURL(specimen.physicalSpecimenId)) {
            return (
                <a href={specimen.physicalSpecimenId} target="_blank" rel="noreferrer"
                    className="c-accent"
                >
                    {specimen.physicalSpecimenId}
                </a>
            );
        } else {
            return specimen.physicalSpecimenId;
        }
    }

    return (
        <Row className="h-100">
            {/* ID Card Content */}
            <Col className="h-100">
                <div className="h-100 d-flex flex-column">
                    {specimenDigitalMedia.length > 0 &&
                        <Row className={styles.IDCardBanner}>
                            <Col className="h-100">
                                <div className={`${styles.IDCardBannerBackground} h-100 d-flex justify-content-center`}>
                                    <img src={specimenDigitalMedia[0].digitalMediaObject.mediaUrl} alt="banner"
                                        className="h-100 position-relative rounded-c"
                                    />
                                </div>
                            </Col>
                        </Row>
                    }
                    <Row className={`${styles.IDCard} flex-grow-1`}>
                        <Col className="h-100">
                            <Card className="h-100">
                                <Card.Body className="h-100">
                                    <Card.Subtitle className={`${styles.IDCardIdentifier} mb-2 text-muted`}>
                                        <Row>
                                            <Col className={`${styles.IDCardTitle} fw-lightBold`}>
                                                <p> ID Card </p>
                                            </Col>
                                            <Col className={`${styles.IDCardTitle} col-md-auto fw-lightBold`}>
                                                <p> {specimen.id.replace('https://hdl.handle.net/', '')} </p>
                                            </Col>
                                        </Row>
                                    </Card.Subtitle>

                                    <Row className={styles.IDCardProperties}>
                                        <Col className="col-md-auto h-100">
                                            <Row className={styles.IDCardPropertyBlock}>
                                                <Col className={`${classPropertyBlockHover} rounded-c py-1`}
                                                    onClick={() => ToggleModal('ods:specimenName')}
                                                >
                                                    <span className="fw-lightBold m-0 h-50" role="modalTrigger">Name in collection</span>
                                                    <br /> <span className={`${styles.IDCardValue} m-0 h-50`}> {specimen.specimenName} </span>
                                                </Col>
                                            </Row>
                                            <Row className={styles.IDCardPropertyBlock}>
                                                <Col className={`${classPropertyBlockHover} rounded-c py-1`}
                                                    onClick={() => ToggleModal('ods:organisationId')}
                                                >
                                                    <span className="fw-lightBold m-0 h-50">Specimen provider</span>
                                                    <br /> <span className={`${styles.IDCardValue} m-0 h-50 c-accent`}>
                                                        {OrganisationProperty()}
                                                    </span>
                                                </Col>
                                            </Row>
                                            <Row className={styles.IDCardPropertyBlock}>
                                                <Col className="m-0 py-1">
                                                    <span className="fw-lightBold m-0 h-50">Object Type</span>
                                                    <br /> <span className={`${styles.IDCardValue} m-0 h-50`}>Coming Soon!</span>
                                                </Col>
                                            </Row>
                                            <Row className={styles.IDCardPropertyBlock}>
                                                <Col className={`${classPropertyBlockHover} rounded-c py-1`}
                                                    onClick={() => ToggleModal('ods:physicalSpecimenId')}
                                                >
                                                    <span className="fw-lightBold m-0 h-50">
                                                        Physical specimen ID ({specimen.physicalSpecimenIdType}):
                                                    </span>
                                                    <br /> <span className={`${styles.IDCardValue} m-0 h-50`}> {PhysicalSpecimenIdProperty()} </span>
                                                </Col>
                                            </Row>
                                            <Row className={styles.IDCardPropertyBlock}>
                                                <Col className="m-0 py-1">
                                                    <span className="fw-lightBold m-0 h-50">Specimen Type</span>
                                                    <br /> <span className={`${styles.IDCardValue} m-0 h-50`}> {specimen.type} </span>
                                                </Col>
                                            </Row>
                                            <Row className={styles.IDCardPropertyBlock}>
                                                <Col className={`${classPropertyBlockHover} rounded-c py-1`}
                                                    onClick={() => ToggleModal('ods:physicalSpecimenCollection')}
                                                >
                                                    <span className="fw-lightBold m-0 h-50">In collection</span>
                                                    <br /> <span className={`${styles.IDCardValue} m-0 h-50`}> {specimen.physicalSpecimenCollection} </span>
                                                </Col>
                                            </Row>
                                            <Row className={styles.IDCardPropertyBlock}>
                                                <Col className={`${classPropertyBlockHover} rounded-c py-1 text-truncate`}
                                                    onClick={() => ToggleModal('dcterms:license')}
                                                >
                                                    <span className="fw-lightBold m-0 h-50">License</span>
                                                    <br /> <span className={`${styles.IDCardValue} m-0 h-50`}> {specimen.data['dcterms:license']} </span>
                                                </Col>
                                            </Row>
                                            <Row className={styles.IDCardPropertyBlock}>
                                                <Col className="m-0 py-1">
                                                    <span className="fw-lightBold m-0 h-50">Source System</span>
                                                    <br /> <span className={`${styles.IDCardValue} m-0 h-50`}> Coming Soon! </span>
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
    );
}

export default IDCard;
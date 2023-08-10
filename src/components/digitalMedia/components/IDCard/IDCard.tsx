/* Import Dependencies */
import classNames from 'classnames';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getDigitalMedia, getDigitalMediaAnnotations } from 'redux/digitalMedia/DigitalMediaSlice';
import { setAnnotateTarget, setSidePanelToggle } from 'redux/annotate/AnnotateSlice';

/* Import Styles */
import styles from 'components/digitalMedia/digitalMedia.module.scss';;


const IDCard = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);
    const digitalMediaAnnotations = useAppSelector(getDigitalMediaAnnotations);

    /* Function for toggling the Annotate Modal */
    const ToggleSidePanel = (property: string) => {
        if (property) {
            dispatch(setAnnotateTarget({
                property,
                motivation: '',
                target: digitalMedia,
                targetType: 'digital_media',
                annotations: digitalMediaAnnotations[property] ? digitalMediaAnnotations[property] : []
            }));
        }

        dispatch(setSidePanelToggle(true));
    }

    /* ClassName for Specimen Property Hover */
    const classPropertyBlockHover = classNames({
        [`${styles.IDCardPropertyBlockHover}`]: KeycloakService.IsLoggedIn()
    });

    return (
        <Row className="h-100">
            {/* ID Card Content */}
            <Col className="h-100">
                <Row className={`${styles.IDCard} h-100`}>
                    <Col className="h-100">
                        <Card className="h-100">
                            <Card.Body className="h-100">
                                <Card.Subtitle className={`${styles.IDCardIdentifier} mb-2 text-muted`}>
                                    <Row>
                                        <Col className={`${styles.IDCardTitle} fw-lightBold`}>
                                            <p> ID Card </p>
                                        </Col>
                                        <Col className={`${styles.IDCardTitle} col-md-auto fw-lightBold`}>
                                            <p> {digitalMedia.id.replace('https://hdl.handle.net/', '')} </p>
                                        </Col>
                                    </Row>
                                </Card.Subtitle>

                                <Row className={styles.IDCardProperties}>
                                    <Col className="col-md-auto h-100">
                                        <Row className={styles.IDCardPropertyBlock}>
                                            <Col className={`${classPropertyBlockHover} rounded-c py-1`}>
                                                <span className="fw-lightBold m-0 h-50" role="modalTrigger">Digital Specimen ID</span>
                                                <br /> <span className={`${styles.IDCardValue} m-0 h-50`}> {digitalMedia.digitalSpecimenId} </span>
                                            </Col>
                                        </Row>
                                        <Row className={styles.IDCardPropertyBlock}>
                                            <Col className={`${classPropertyBlockHover} rounded-c py-1`}
                                                onClick={() => ToggleSidePanel('mediaUrl')}
                                            >
                                                <span className="fw-lightBold m-0 h-50">Media URL</span>
                                                <br /> <span className={`${styles.IDCardValue} m-0 h-50`}> {digitalMedia.mediaUrl} </span>
                                            </Col>
                                        </Row>
                                        <Row className={styles.IDCardPropertyBlock}>
                                            <Col className="m-0 py-1">
                                                <span className="fw-lightBold m-0 h-50">Title</span>
                                                <br /> <span className={`${styles.IDCardValue} m-0 h-50`}> {digitalMedia.data['dcterms:title']} </span>
                                            </Col>
                                        </Row>
                                        <Row className={styles.IDCardPropertyBlock}>
                                            <Col className="m-0 py-1">
                                                <span className="fw-lightBold m-0 h-50">Format</span>
                                                <br /> <span className={`${styles.IDCardValue} m-0 h-50`}> {digitalMedia.format} </span>
                                            </Col>
                                        </Row>
                                        <Row className={styles.IDCardPropertyBlock}>
                                            <Col className={`${classPropertyBlockHover} rounded-c py-1`}>
                                                <span className="fw-lightBold m-0 h-50">Type</span>
                                                <br /> <span className={`${styles.IDCardValue} m-0 h-50`}> {digitalMedia.type} </span>
                                            </Col>
                                        </Row>
                                        <Row className={styles.IDCardPropertyBlock}>
                                            <Col className={`${classPropertyBlockHover} rounded-c py-1 text-truncate`}>
                                                <span className="fw-lightBold m-0 h-50">Publisher</span>
                                                <br /> <span className={`${styles.IDCardValue} m-0 h-50`}> {digitalMedia.data['dcterms:publisher']} </span>
                                            </Col>
                                        </Row>
                                        <Row className={styles.IDCardPropertyBlock}>
                                            <Col className={`${classPropertyBlockHover} rounded-c py-1`}>
                                                <span className="fw-lightBold m-0 h-50">Rightsholder</span>
                                                <br /> <span className={`${styles.IDCardValue} m-0 h-50`}> {digitalMedia.data['rightsHolder']} </span>
                                            </Col>
                                        </Row>
                                        <Row className={styles.IDCardPropertyBlock}>
                                            <Col className={`${classPropertyBlockHover} rounded-c py-1`}
                                                onClick={() => ToggleSidePanel('dcterms:license')}
                                            >
                                                <span className="fw-lightBold m-0 h-50">License</span>
                                                <br /> <span className={`${styles.IDCardValue} m-0 h-50`}> {digitalMedia.data['dcterms:license']} </span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default IDCard;
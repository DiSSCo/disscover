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
                target: digitalMedia.digitalEntity,
                targetType: 'digital_media',
                annotations: digitalMediaAnnotations[property] ? digitalMediaAnnotations[property] : []
            }));
        }

        dispatch(setSidePanelToggle(true));
    }

    /* ClassName for Specimen Property Hover */
    const classPropertyBlockHover = classNames({
        [`${styles.IDCardPropertyBlockHover} transition`]: KeycloakService.IsLoggedIn()
    });

    return (
        <Row className="h-100">
            {/* ID Card Content */}
            <Col className="h-100">
                <Row className={`${styles.IDCard} h-100`}>
                    <Col className="h-100">
                        <Card className="h-100">
                            <Card.Body className="h-100 d-flex flex-column">
                                <Card.Subtitle className={`${styles.IDCardIdentifier} mb-2 text-muted`}>
                                    <Row>
                                        <Col className="fs-4 c-secondary fw-lightBold">
                                            <p> ID Card </p>
                                        </Col>
                                        <Col className="fs-4 c-secondary col-md-auto fw-lightBold">
                                            <p> {digitalMedia.digitalEntity['ods:id'].replace('https://doi.org/', '')} </p>
                                        </Col>
                                    </Row>
                                </Card.Subtitle>

                                <Row className="flex-grow-1">
                                    <Col className="col-md-auto h-100">
                                        <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                            <Col className={`${classPropertyBlockHover} rounded-c py-1`}>
                                                <dfn className="fw-lightBold m-0 h-50" role="term">Digital Specimen ID</dfn>
                                                <br /> <span className="fs-4 m-0 h-50"> {/* Digital Specime Id */} </span>
                                            </Col>
                                        </Row>
                                        <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                            <Col className={`${classPropertyBlockHover} rounded-c py-1`}
                                                onClick={() => ToggleSidePanel('mediaUrl')}
                                            >
                                                <span className="fw-lightBold m-0 h-50">Media URL</span>
                                                <br /> <span className="fs-4 m-0 h-50"> {digitalMedia.digitalEntity['ac:accessUri']} </span>
                                            </Col>
                                        </Row>
                                        <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                            <Col className="m-0 py-1">
                                                <span className="fw-lightBold m-0 h-50">Title</span>
                                                <br /> <span className="fs-4 m-0 h-50"> {digitalMedia.digitalEntity['dcterms:description']} </span>
                                            </Col>
                                        </Row>
                                        <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                            <Col className="m-0 py-1">
                                                <span className="fw-lightBold m-0 h-50">Format</span>
                                                <br /> <span className="fs-4 m-0 h-50"> {digitalMedia.digitalEntity['dcterms:format']} </span>
                                            </Col>
                                        </Row>
                                        <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                            <Col className={`${classPropertyBlockHover} rounded-c py-1`}>
                                                <span className="fw-lightBold m-0 h-50">Type</span>
                                                <br /> <span className="fs-4 m-0 h-50"> {digitalMedia.digitalEntity['dcterms:type']} </span>
                                            </Col>
                                        </Row>
                                        <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                            <Col className={`${classPropertyBlockHover} rounded-c py-1 text-truncate`}>
                                                <span className="fw-lightBold m-0 h-50">Publisher</span>
                                                <br /> <span className="fs-4 m-0 h-50"> {digitalMedia.digitalEntity['dwc:institutionName']} </span>
                                            </Col>
                                        </Row>
                                        <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                            <Col className={`${classPropertyBlockHover} rounded-c py-1`}>
                                                <span className="fw-lightBold m-0 h-50">Rightsholder</span>
                                                <br /> <span className="fs-4 m-0 h-50"> {digitalMedia.digitalEntity['dcterms:rightsHolder']} </span>
                                            </Col>
                                        </Row>
                                        <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                            <Col className={`${classPropertyBlockHover} rounded-c py-1`}
                                                onClick={() => ToggleSidePanel('dcterms:license')}
                                            >
                                                <span className="fw-lightBold m-0 h-50">License</span>
                                                <br /> <span className="fs-4 m-0 h-50"> {digitalMedia.digitalEntity['dcterms:license']} </span>
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
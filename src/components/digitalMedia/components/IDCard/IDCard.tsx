/* Import Dependencies */
import classNames from 'classnames';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getDigitalMedia, getDigitalMediaAnnotations } from 'redux/digitalMedia/DigitalMediaSlice';
import { setAnnotateTarget, setEditAnnotation, setSidePanelToggle } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { TargetProperty } from 'app/Types';
import { Annotation } from 'app/types/Annotation';

/* Import Styles */
import styles from 'components/digitalMedia/digitalMedia.module.scss';


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function
};


const IDCard = (props: Props) => {
    const { ShowWithAnnotations } = props;

    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);
    const digitalMediaAnnotations = useAppSelector(getDigitalMediaAnnotations);

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
                                            <p> {digitalMedia.digitalEntity['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '')} </p>
                                        </Col>
                                    </Row>
                                </Card.Subtitle>

                                <Row className="flex-grow-1">
                                    <Col className="col-md-auto h-100 d-flex flex-column justify-content-between">
                                        <Row className="fs-4">
                                            <Col className={`${styles.IDCardPropertyBlockHover} transition rounded-c py-1 textOverflow`}>
                                                <dfn className="fw-lightBold m-0 h-50" role="term">Digital Specimen ID</dfn>
                                                <br /> <span className="fs-4 m-0 h-50"> {/* Digital Specime Id */} </span>
                                            </Col>
                                        </Row>
                                        <Row className="fs-4">
                                            <Col className={`${styles.IDCardPropertyBlockHover} transition rounded-c py-1 textOverflow`}
                                                onClick={() => ShowWithAnnotations(undefined, 'ac:accessUri', 'field')}
                                            >
                                                <span className="fw-lightBold m-0 h-50">Media URL</span>
                                                <br /> <span className="fs-4 m-0 h-50"> {digitalMedia.digitalEntity['ac:accessUri']} </span>
                                            </Col>
                                        </Row>
                                        <Row className="fs-4">
                                            <Col className={`${styles.IDCardPropertyBlockHover} transition rounded-c py-1 textOverflow`}
                                                onClick={() => ShowWithAnnotations(undefined, 'dcterms:description', 'field')}
                                            >
                                                <span className="fw-lightBold m-0 h-50">Title</span>
                                                <br /> <span className="fs-4 m-0 h-50"> {digitalMedia.digitalEntity['dcterms:description']} </span>
                                            </Col>
                                        </Row>
                                        <Row className="fs-4">
                                            <Col className={`${styles.IDCardPropertyBlockHover} transition rounded-c py-1 textOverflow`}
                                                onClick={() => ShowWithAnnotations(undefined, 'dcterms:format', 'field')}
                                            >
                                                <span className="fw-lightBold m-0 h-50">Format</span>
                                                <br /> <span className="fs-4 m-0 h-50"> {digitalMedia.digitalEntity['dcterms:format']} </span>
                                            </Col>
                                        </Row>
                                        <Row className="fs-4">
                                            <Col className={`${styles.IDCardPropertyBlockHover} transition rounded-c py-1 textOverflow`}
                                                onClick={() => ShowWithAnnotations(undefined, 'dcterms:type', 'field')}
                                            >
                                                <span className="fw-lightBold m-0 h-50">Type</span>
                                                <br /> <span className="fs-4 m-0 h-50"> {digitalMedia.digitalEntity['dcterms:type']} </span>
                                            </Col>
                                        </Row>
                                        <Row className="fs-4">
                                            <Col className={`${styles.IDCardPropertyBlockHover} transition rounded-c py-1 textOverflow`}
                                                onClick={() => ShowWithAnnotations(undefined, 'dwc:institutionName', 'field')}
                                            >
                                                <span className="fw-lightBold m-0 h-50">Publisher</span>
                                                <br /> <span className="fs-4 m-0 h-50"> {digitalMedia.digitalEntity['dwc:institutionName']} </span>
                                            </Col>
                                        </Row>
                                        <Row className="fs-4">
                                            <Col className={`${styles.IDCardPropertyBlockHover} transition rounded-c py-1 textOverflow`}
                                                onClick={() => ShowWithAnnotations(undefined, 'dcterms:rightsHolder', 'field')}
                                            >
                                                <span className="fw-lightBold m-0 h-50">Rightsholder</span>
                                                <br /> <span className="fs-4 m-0 h-50"> {digitalMedia.digitalEntity['dcterms:rightsHolder']} </span>
                                            </Col>
                                        </Row>
                                        <Row className="fs-4">
                                            <Col className={`${styles.IDCardPropertyBlockHover} transition rounded-c py-1 textOverflow`}
                                                onClick={() => ShowWithAnnotations(undefined, 'dcterms:license', 'field')}
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
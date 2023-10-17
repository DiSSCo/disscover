/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSpecimen, getSpecimenAnnotations, getSpecimenDigitalMedia } from 'redux/specimen/SpecimenSlice';
import { setAnnotateTarget, setSidePanelToggle } from 'redux/annotate/AnnotateSlice';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import OrganisationProperty from './OrganisationProperty';
import PhysicalSpecimenIdProperty from './PhysicalSpecimenIdProperty';


const IDCard = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const specimenAnnotations = useAppSelector(getSpecimenAnnotations);
    const specimenDigitalMedia = useAppSelector(getSpecimenDigitalMedia);

    /* Function for toggling the Annotate Modal */
    const ToggleSidePanel = (property: string) => {
        if (property) {
            dispatch(setAnnotateTarget({
                property,
                motivation: '',
                target: specimen,
                targetType: 'digital_specimen',
                annotations: specimenAnnotations[property] ? specimenAnnotations[property] : []
            }));
        }

        dispatch(setSidePanelToggle(true));
    }

    return (
        <Row className="h-100">
            {/* ID Card Content */}
            <Col className="h-100">
                <div className="h-100 d-flex flex-column">
                    {specimenDigitalMedia.length > 0 &&
                        <Row className="h-25 overflow-hidden">
                            <Col className="h-100">
                                <div className="h-100 d-flex justify-content-center bgc-greyLight rounded-c">
                                    <img src={specimenDigitalMedia[0]['ac:accessUri']} alt="banner"
                                        className="h-100 position-relative rounded-c"
                                    />
                                </div>
                            </Col>
                        </Row>
                    }
                    <Row className={`${styles.IDCard} flex-grow-1`}>
                        <Col className="h-100">
                            <Card className="h-100">
                                <Card.Body className="h-100 d-flex flex-column">
                                    <Card.Subtitle className={`${styles.IDCardIdentifier} mb-2 text-muted`}>
                                        <Row>
                                            <Col className="fs-4 c-secondary fw-lightBold">
                                                <p> ID Card </p>
                                            </Col>
                                            <Col className="fs-4 col-md-auto fw-lightBold">
                                                <p> {specimen['ods:id'].replace('https://doi.org/', '')} </p>
                                            </Col>
                                        </Row>
                                    </Card.Subtitle>

                                    <Row className="flex-grow-1">
                                        <Col className="col-md-auto h-100">
                                            <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                                <Col className={`scientificName ${styles.IDCardPropertyBlockHover} transition rounded-c py-1`}
                                                    onClick={() => ToggleSidePanel('ods:specimenName')}
                                                >
                                                    <span className="fw-lightBold m-0 h-50" role="sidePanelTrigger">Name in collection:</span>
                                                    <br className="d-none d-lg-block" /> <span className="m-0 h-50"> {specimen['ods:specimenName']} </span>
                                                </Col>
                                                {'ods:specimenName' in specimenAnnotations &&
                                                    <Col className="col-md-auto">
                                                        <FontAwesomeIcon icon={faPencil} className="c-primary" />
                                                    </Col>
                                                }
                                            </Row>
                                            <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                                <Col className={`${styles.IDCardPropertyBlockHover} transition rounded-c py-1`}
                                                    onClick={() => ToggleSidePanel('ods:organisationId')}
                                                >
                                                    <span className="fw-lightBold m-0 h-50">Specimen provider:</span>
                                                    <br className="d-none d-lg-block" /> <span className="m-0 h-50 c-accent">
                                                        {<OrganisationProperty specimen={specimen} />}
                                                    </span>
                                                </Col>
                                                {'ods:organisationId' in specimenAnnotations &&
                                                    <Col className="col-md-auto">
                                                        <FontAwesomeIcon icon={faPencil} className="c-primary" />
                                                    </Col>
                                                }
                                            </Row>
                                            <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                                <Col className="m-0 py-1">
                                                    <span className="fw-lightBold m-0 h-50">Object Type:</span>
                                                    <br className="d-none d-lg-block" /> <span className="m-0 h-50">Coming Soon!</span>
                                                </Col>
                                            </Row>
                                            <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                                <Col className={`${styles.IDCardPropertyBlockHover} transition rounded-c py-1`}
                                                    onClick={() => ToggleSidePanel('ods:physicalSpecimenId')}
                                                >
                                                    <span className="fw-lightBold m-0 h-50">
                                                        Physical specimen ID ({specimen['ods:physicalSpecimenIdType']}):
                                                    </span>
                                                    <br className="d-none d-lg-block" /> <span className="m-0 h-50"> {<PhysicalSpecimenIdProperty specimen={specimen} />} </span>
                                                </Col>
                                                {'ods:physicalSpecimenId' in specimenAnnotations &&
                                                    <Col className="col-md-auto">
                                                        <FontAwesomeIcon icon={faPencil} className="c-primary" />
                                                    </Col>
                                                }
                                            </Row>
                                            <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                                <Col className="m-0 py-1">
                                                    <span className="fw-lightBold m-0 h-50">Specimen Type:</span>
                                                    <br className="d-none d-lg-block" /> <span className="m-0 h-50"> {specimen['ods:type']} </span>
                                                </Col>
                                            </Row>
                                            <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                                <Col className={`${styles.IDCardPropertyBlockHover} transition rounded-c py-1`}
                                                    onClick={() => ToggleSidePanel('ods:physicalSpecimenCollection')}
                                                >
                                                    <span className="fw-lightBold m-0 h-50">In collection:</span>
                                                    <br className="d-none d-lg-block" /> <span className="m-0 h-50"> {specimen['dwc:collectionCode']} </span>
                                                </Col>
                                                {'ods:physicalSpecimenCollection' in specimenAnnotations &&
                                                    <Col className="col-md-auto">
                                                        <FontAwesomeIcon icon={faPencil} className="c-primary" />
                                                    </Col>
                                                }
                                            </Row>
                                            <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                                <Col className={`${styles.IDCardPropertyBlockHover} transition rounded-c py-1 text-truncate`}
                                                    onClick={() => ToggleSidePanel('dcterms:license')}
                                                >
                                                    <span className="fw-lightBold m-0 h-50">License:</span>
                                                    <br className="d-none d-lg-block" /> <span className="m-0 h-50"> {specimen['dcterms:license']} </span>
                                                </Col>
                                                {'dcterms:license' in specimenAnnotations &&
                                                    <Col className="col-md-auto">
                                                        <FontAwesomeIcon icon={faPencil} className="c-primary" />
                                                    </Col>
                                                }
                                            </Row>
                                            <Row className={`${styles.IDCardPropertyBlock} fs-4`}>
                                                <Col className="m-0 py-1">
                                                    <span className="fw-lightBold m-0 h-50">Source System:</span>
                                                    <br className="d-none d-lg-block" /> <span className="m-0 h-50"> Coming Soon! </span>
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
/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrog, faCircleInfo, faMessage } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import VersionSelect from './contentBlock/VersionSelect';


const TitleBar = () => {
    const specimen = useAppSelector(getSpecimen);

    return (
        <Row className={`${styles.IDCardHead}`}>
            <Col>
                {/* Title and Icon */}
                <Row>
                    <Col className="col-md-auto pe-1 d-flex align-items-center">
                        <FontAwesomeIcon icon={faFrog} className={styles.titleBarIcon} />
                    </Col>
                    <Col>
                        <h2 className={styles.title}> {specimen.specimenName} </h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 3 }}>
                        {/* MIDS Blocks */}
                        <Row className="mt-2">
                            <Col className="col-md-auto d-flex align-items-center">
                                <FontAwesomeIcon icon={faCircleInfo}
                                    className={styles.midsIcon}
                                />
                            </Col>
                            <Col>
                                <Row>
                                    <Col md={{ span: 3 }} className="d-flex align-items-center">
                                        <div className={`${styles.midsBlock} ${specimen.midsLevel === 0 && styles.active} fw-lightBold`}>
                                            MIDS 0
                                        </div>
                                    </Col>
                                    <Col md={{ span: 3 }} className="d-flex align-items-center">
                                        <div className={`${styles.midsBlock} ${specimen.midsLevel >= 1 && styles.active} fw-lightBold`}>
                                            MIDS 1
                                        </div>
                                    </Col>
                                    <Col md={{ span: 3 }} className="d-flex align-items-center">
                                        <div className={`${styles.midsBlock} ${specimen.midsLevel >= 2 && styles.active} fw-lightBold`}>
                                            MIDS 2
                                        </div>
                                    </Col>
                                    <Col md={{ span: 3 }} className="d-flex align-items-center">
                                        <div className={`${styles.midsBlock} ${specimen.midsLevel >= 3 && styles.active} fw-lightBold`}>
                                            MIDS 3
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    {/* Specimen Versions */}
                    <Col md={{ span: 9 }} className="position-relative ps-4">
                        <Row>
                            <Col className="d-flex justify-content-end">
                                <button type="button" className={`${styles.annotationTriggerButton} mt-2 px-3 py-1`}>
                                    <FontAwesomeIcon icon={faMessage} className={`${styles.annotationTriggerIcon} me-1`} /> Annotations
                                </button>
                            </Col>
                        </Row>
                        <Row className="position-absolute bottom-0">
                            <Col className="col-md-auto">
                                <VersionSelect />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default TitleBar;
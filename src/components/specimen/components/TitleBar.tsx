/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrog } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import VersionSelect from './contentBlock/VersionSelect';


const TitleBar = () => {
    const specimen = useAppSelector(getSpecimen);

    return (
        <Row className={`${styles.IDCardHead}`}>
            <Col>
                <Row>
                    <Col md={{ span: 9 }}>
                        {/* Title and Icon */}
                        <Row>
                            <Col className="col-md-auto pe-1 d-flex align-items-center">
                                <FontAwesomeIcon icon={faFrog} className={styles.titleBarIcon} />
                            </Col>
                            <Col>
                                <h2 className={styles.title}> {specimen.specimenName} </h2>
                            </Col>
                        </Row>

                        {/* MIDS Blocks */}
                        <Row className="mt-2">
                            <Col className="col-md-auto pe-2">
                                <div className={`${styles.midsBlock} ${specimen.midsLevel >= 1 && styles.active} px-3 py-1 mt-2 fw-lightBold`}>
                                    MIDS 1
                                </div>
                            </Col>
                            <Col className="col-md-auto px-2">
                                <div className={`${styles.midsBlock} ${specimen.midsLevel >= 2 && styles.active} px-3 py-1 mt-2 fw-lightBold`}>
                                    MIDS 2
                                </div>
                            </Col>
                            <Col className="col-md-auto ps-2">
                                <div className={`${styles.midsBlock} ${specimen.midsLevel >= 3 && styles.active} px-3 py-1 mt-2 fw-lightBold`}>
                                    MIDS 3
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={{ span: 3 }}>
                        <Row className="justify-content-end">
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
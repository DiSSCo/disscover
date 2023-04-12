/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSearchSpecimen } from 'redux/search/SearchSlice';

/* Import Types */
import { DigitalMedia } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrog, faCircleInfo, faChevronRight } from '@fortawesome/free-solid-svg-icons';

/* Import API */
import GetSpecimenDigitalMedia from 'api/specimen/GetSpecimenDigitalMedia';


const IDCard = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const specimen = useAppSelector(getSearchSpecimen);
    const [digitalMedia, setDigitalMedia] = useState<DigitalMedia[]>([]);

    /* OnLoad: Check if Specimen has Digital Media attached to it */
    useEffect(() => {
        setDigitalMedia([]);

        GetSpecimenDigitalMedia(specimen.id).then((digitalMedia) => {
            if (digitalMedia) {
                setDigitalMedia(digitalMedia);
            }
        });
    }, [specimen]);

    return (
        <Card className={`${styles.IDCard} px-4 py-3`}>
            <Row className={styles.IDCardTop}>
                <Col>
                    {/* Icon and Title */}
                    <Row className="align-items-center">
                        <Col className="col-md-auto h-100 pe-1">
                            <FontAwesomeIcon icon={faFrog}
                                className={styles.IDCardIcon}
                            />
                        </Col>
                        <Col>
                            <h2 className={styles.IDCardTitle}> {specimen.specimenName} </h2>
                        </Col>
                    </Row>

                    {/* Specimen Identifier */}
                    <Row>
                        <Col>
                            <p className={styles.IDCardId}> {specimen.id} </p>
                        </Col>
                    </Row>

                    {/* MIDS Bar */}
                    <Row className="mt-2 align-items-center">
                        <Col className="h-100">
                            <div className={styles.midsBar}>
                                <div className={`${styles.midsProgressionLevel} h-100`} />
                            </div>
                        </Col>
                        <Col className="col-md-auto ps-1">
                            <p className={`${styles.midsTitle} fw-bold`}>
                                <span className="pe-2"> Level {specimen.midsLevel} </span>
                                <FontAwesomeIcon icon={faCircleInfo} />
                            </p>
                        </Col>
                    </Row>

                    {/* Specimen Information */}
                    <Row className="mt-4">
                        <Col>
                            <p className={styles.IDCardProperty}>
                                <span className="fw-bold"> Scientific Name: </span> {specimen.specimenName}
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> Specimen Type: </span> {specimen.type}
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> Physical Specimen ID ({specimen.physicalSpecimenIdType}): </span> {specimen.physicalSpecimenId}
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> Physical Specimen Collection: </span> {specimen.physicalSpecimenCollection}
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> Organisation: </span>
                                {specimen.data['ods:organisationName'] ?
                                    specimen.data['ods:organisationName']
                                    : specimen.organisationId ?
                                        specimen.organisationId : '-'
                                }
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className={styles.IDCardBottom}>
                <Col className="h-100">
                    {/* If present, show Digital Media */}
                    <Row className={styles.digitalMediaBlock}>
                        <Col className="h-100">
                            <div className={`${styles.digitalMediaSlider} h-100 w-auto`}>
                                {digitalMedia.map((mediaItem) => {
                                    return (
                                        <img src={mediaItem.mediaUrl} className={`${styles.digitalMediaItem} h-100 me-3`} />
                                    );
                                })}
                            </div>
                        </Col>
                    </Row>

                    {/* Specimen Page Button */}
                    <Row className={styles.buttonBlock}>
                        <Col className="h-100 d-flex justify-content-end align-items-end">
                            <button type="button" className={`${styles.specimenButton} fw-bold px-3`}
                                onClick={() => navigate(`/ds/${specimen.id}`)}
                            >
                                See full details <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}

export default IDCard;
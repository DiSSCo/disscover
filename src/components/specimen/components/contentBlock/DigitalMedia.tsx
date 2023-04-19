/* Import Dependencies */
import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimenDigitalMedia } from "redux/specimen/SpecimenSlice";

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


const DigitalMedia = () => {
    /* Base variables */
    const specimenDigitalMedia = useAppSelector(getSpecimenDigitalMedia);
    const [imageHover, setImageHover] = useState<string>('');

    return (
        <Row className="h-100">
            <Col className="h-100">
                <Card className="h-100">
                    <Card.Body className="h-100">
                        <Row>
                            <Col>
                                <Card.Title>
                                    Digital Media Gallery
                                </Card.Title>
                            </Col>
                        </Row>
                        <Row className={`${styles.digitalMediaImagesBlock} mt-2`}>
                            <Col className="h-100">
                                <p className={`${styles.digitalMediaTitle} fw-bold`}> Images: </p>

                                <div className={`${styles.digitalMediaImagesSlider} px-3 py-2 mt-1`}>
                                    {specimenDigitalMedia.map((specimenDigitalMediaItem) => {
                                        const digitalMedia = specimenDigitalMediaItem.digitalMediaObject;

                                        return (
                                            <div key={digitalMedia.id}
                                                className={`${styles.digitalMediaImageDiv} h-100 me-3 d-inline-block position-relative`}
                                            >
                                                <img src={digitalMedia.mediaUrl}
                                                    alt={digitalMedia.mediaUrl}
                                                    className={`${styles.digitalMediaImage} h-100`}
                                                    onMouseEnter={() => setImageHover(digitalMedia.id)}
                                                    onMouseLeave={() => setImageHover('')}
                                                />

                                                <div className={`${styles.digitalMediaImageHover} 
                                                    ${(digitalMedia.id === imageHover && styles.active)} 
                                                    position-absolute bottom-0 w-100 py-1 px-2 bg-white d-flex justify-content-center align-items-center`}
                                                    onMouseEnter={() => setImageHover(digitalMedia.id)}
                                                    onMouseLeave={() => setImageHover('')}
                                                >
                                                    Go to Image <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row >
    );
}

export default DigitalMedia;
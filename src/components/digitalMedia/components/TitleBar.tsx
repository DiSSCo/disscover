/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMedia } from 'redux/digitalMedia/DigitalMediaSlice';

/* Import Types */
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/* Import Styles */
import styles from 'components/digitalMedia/digitalMedia.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo, faMusic, faFile } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import BreadCrumbs from 'components/general/breadCrumbs/BreadCrumbs';


const TitleBar = () => {
    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);
    let icon: IconDefinition;

    /* Declaring icon based on Digital Media type */
    switch (digitalMedia.digitalEntity['dcterms:type']) {
        case 'StillImage':
            icon = faImage;

            break;
        case 'MovingImage':
            icon = faVideo;

            break;
        case 'Sound':
            icon = faMusic;

            break;
        default:
            icon = faFile;
    }

    return (
        <Row>
            <Col>
                {/* Bread Crumbs */}
                <Row>
                    <Col>
                        <BreadCrumbs />
                    </Col>
                </Row>
                {/* Title and Icon */}
                <Row className="mt-2">
                    <Col className="col-md-auto pe-1 d-flex align-items-center">
                        <FontAwesomeIcon icon={icon} className={`${styles.digitalMediaIcon} c-primary`} />
                    </Col>
                    <Col>
                        <h2 className={styles.digitalMediaTitle}> {digitalMedia.digitalEntity['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '')} </h2>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default TitleBar;
/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { DigitalMedia } from 'global/Types';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    digitalMedia: DigitalMedia
};


const File = (props: Props) => {
    const { digitalMedia } = props;

    return (
        <div className={`${styles.fileBlock} px-3 py-2 rounded`}>
            <Row>
                <Col className="col-md-auto pe-0 d-flex align-items-center">
                    <FontAwesomeIcon icon={faFile}
                        className={`${styles.fileIcon} c-secondary`}
                    />
                </Col>
                <Col>
                    <p className={styles.fileTitle}> {digitalMedia.mediaUrl} </p>
                </Col>
            </Row>
        </div>
    );
}

export default File;
/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { DigitalMedia } from 'app/Types';

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
        <div className="b-secondary px-3 py-2 rounded">
            <Row>
                <Col className="col-md-auto pe-0 d-flex align-items-center">
                    <FontAwesomeIcon icon={faFile}
                        className="fs-3 c-secondary"
                    />
                </Col>
                <Col>
                    <p className="fs-4"> {digitalMedia.digitalEntity['ac:accessUri']} </p>
                </Col>
            </Row>
        </div>
    );
}

export default File;
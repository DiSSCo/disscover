/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { faFile } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
type Props = {
    accessURI: string
};


/**
 * Component that renders a file like element for displaying media with no real associated display
 * @param accessURI The URL on which the media can be accessed
 * @returns JSX Component
 */
const File = (props: Props) => {
    const { accessURI } = props;

    return (
        <div className="b-secondary px-3 py-2 rounded">
            <Row>
                <Col className="col-md-auto pe-0 d-flex align-items-center">
                    <FontAwesomeIcon icon={faFile}
                        className="fs-3 c-secondary"
                    />
                </Col>
                <Col>
                    <p className="fs-4"> {accessURI} </p>
                </Col>
            </Row>
        </div>
    );
};

export default File;
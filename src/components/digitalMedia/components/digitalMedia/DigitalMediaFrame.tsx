/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMedia } from 'redux/digitalMedia/DigitalMediaSlice';


const DigitalMediaFrame = () => {
    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);

    /* Check for the type of Digital Media and set content appropiate to it */
    let digitalMediaContent: React.ReactElement;

    if (digitalMedia.type === '2DImageObject') {
        digitalMediaContent = <img src={digitalMedia.mediaUrl}
            alt={digitalMedia.id}
            className="w-100 h-100 border border-white"
        />
    } else {
        digitalMediaContent = <img src={digitalMedia.mediaUrl}
            alt={digitalMedia.id}
            className="w-100 h-100 border border-white"
        />;
    }

    return (
        <Row className="h-100">
            <Col className="d-flex align-items-center px-1 h-100">
                {digitalMediaContent}
            </Col>
        </Row>
    );
}

export default DigitalMediaFrame;
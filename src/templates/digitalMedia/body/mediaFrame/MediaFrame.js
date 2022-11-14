import { Row, Col } from 'react-bootstrap';


const MediaFrame = (props) => {
    const digitalMediaItem = props.digitalMediaItem;

    let digitalMediaContent;

    if (digitalMediaItem['MediaMeta']['type']['value'] === "2DImageObject") {
        digitalMediaContent = <img src={digitalMediaItem['MediaMeta']['mediaUrl']['value']}
            alt={digitalMediaItem['MediaMeta']['id']['value']}
            className="w-100 h-100 border border-white"
        />
    }

    return (
        <Row className="h-100">
            <Col className="d-flex align-items-center px-1 h-100">
                {digitalMediaContent}
            </Col>
        </Row>
    );
}

export default MediaFrame;
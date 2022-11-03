import { Row, Col } from 'react-bootstrap';


const MediaFrame = (props) => {
    const digitalMediaItem = props.digitalMediaItem;

    let digitalMediaContent;

    switch (digitalMediaItem['MediaMeta']['type']['value']) {
        case "2DImageObject":
            digitalMediaContent = <img src={digitalMediaItem['MediaMeta']['mediaUrl']['value']}
                alt={digitalMediaItem['MediaMeta']['id']['value']}
                className="w-100 h-100 border border-white"
            />

            break;
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
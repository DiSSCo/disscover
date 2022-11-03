import { Row, Col } from 'react-bootstrap';


const MediaData = (props) => {
    const digitalMediaItem = props.digitalMediaItem;

    return (
        <Row className="overflow-scroll">
            <Col className="px-4 py-2 mt-2">
                {Object.keys(digitalMediaItem['MediaMeta']).map((key, i) => {
                    const metaItem = digitalMediaItem['MediaMeta'][key];

                    return (
                        <Row key={i}>
                            <Col>
                                <Row>
                                    <Col md={{span: 12}} className="digitalMedia_attributeBlock border-l-1-primary-dark mb-2 text-truncate py-1"
                                        onClick={() => props.ToggleModal(metaItem, key)}
                                    >
                                        <span className="fst-italic"> {`${metaItem['displayName']}: `} </span> {`${metaItem['value']}`}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    );
                })}

                <Row>
                    <Col>
                        <button onClick={() => props.ToggleMediaModal()} >
                            Annotate
                        </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default MediaData;
import { Row, Col } from 'react-bootstrap';


const RelationshipLink = () => {
    return (
        <Row className="mt-3">
            <Col>
                <Row>
                    <Col md={{span: 9}}>
                        <div className="annotate_annotationTypeContext px-2 py-2">
                            This annotation type is used when a false relationship or link is
                            detected and needs to be replaced with a valid one.
                        </div>
                    </Col>
                </Row>

                <form className="mt-4">
                    <Row>
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Value: </p>
                            <input />
                        </Col>
                    </Row>
                </form>
            </Col>
        </Row>
    );
}

export default RelationshipLink;
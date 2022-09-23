import { Row, Col } from 'react-bootstrap';


const AnnotationFilters = () => {
    return (
        <Row>
            <Col className="col-md-auto">
                Global annotations
            </Col>
            <Col className="col-md-auto annotate_annotationFilterTab">
                My annotations
            </Col>
        </Row>
    );
}

export default AnnotationFilters;
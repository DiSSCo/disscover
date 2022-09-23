import { Container, Row, Col } from 'react-bootstrap';

/* Import Components */
import AnnotationFilters from './annotationFilters/AnnotationFilters';
import AnnotationsTable from './annotationsTable/AnnotationsTable';


const Body = () => {
    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 10, offset: 1 }} className="pt-5">
                    <Row>
                        <Col className="annotate_overviewTitle">
                            Annotation Overview
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AnnotationFilters />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <AnnotationsTable />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Body;
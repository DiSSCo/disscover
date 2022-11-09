import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Components */
import AnnotationsFilters from './annotationFilters/AnnotationsFilters';
import AnnotationsTable from './annotationsTable/AnnotationsTable';
import AnnotationStatistics from './annotationStatistics/AnnotationStatistics';


const Body = () => {
    const [filter, setFilter] = useState('globalAnnotations');

    return (
        <Container fluid className="mt-4">
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <Row>
                        <Col md={{ span: 2 }}>
                            <AnnotationsFilters
                                SetFilter={(filter) => setFilter(filter)}
                            />
                        </Col>
                        <Col md={{ span: 10 }}>
                            <Row>
                                <Col md={{ span: 12 }} className="annotate_resultsSection">
                                    <AnnotationsTable filter={filter} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col md={{ span: 6 }}>
                            <AnnotationStatistics />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Body;
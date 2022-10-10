import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Components */
import AnnotationFilters from './annotationFilters/AnnotationFilters';
import AnnotationsTable from './annotationsTable/AnnotationsTable';


const Body = () => {
    const [filter, setFilter] = useState('recentAnnotations')

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
                            <AnnotationFilters 
                                SetFilter={(filter) => setFilter(filter)}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <AnnotationsTable 
                            filter={filter}
                        />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Body;
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

                            {/* <Row className="px-5 mt-3">
                                    <Col className="col-md-auto annotate_resultCount py-2">
                                        {(searchResults.length === 1) ?
                                            '1 specimen found'
                                            : `${searchResults.length} specimens found`
                                        }
                                    </Col>

                                    {(searchResults.length > 0) &&
                                        <Col className="col-md-auto">
                                            <Paginator items={searchResults}
                                                pageSize={25}

                                                SetPaginationRange={(range) => setPaginationRange(range)}
                                            />
                                        </Col>
                                    }
                                </Row> */}
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
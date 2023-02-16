/* Import Dependencies */
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Styles */
import './annotate.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import AnnotationsFilters from './components/AnnotationFilters';
import AnnotationsTable from './components/AnnotationsTable';
import AnnotationStatistics from './components/AnnotationStatistics';
import Footer from 'components/general/footer/Footer';


const Annotate = () => {
    /* Function for filtering on Annotations */
    const [filter, setFilter] = useState<string>('globalAnnotations');

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Container fluid className="mt-4">
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row>
                            <Col md={{ span: 2 }}>
                                <AnnotationsFilters
                                    SetFilter={(filter: string) => setFilter(filter)}
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

            <Footer />
        </div>
    );
}

export default Annotate;
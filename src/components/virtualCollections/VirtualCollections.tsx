/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Components */
import { Footer } from "components/elements/Elements";
import VirtualCollectionsTable from './components/VirtualCollectionsTable';


/**
 * Base component that renders the Virtual Collections page
 * @returns JSX Component
 */
const VirtualCollections = () => {
    return (
        <div className="h-90 d-flex flex-column">
            {/* Virtual Collections page body */}
            <Container fluid className="flex-grow-1 overflow-y-hidden my-5">
                <Row className="h-100 position-relative">
                    <Col lg={{ span: 10, offset: 1 }}
                        className="h-100 d-flex flex-column"
                    >
                        <Row>
                            <Col>
                                <h2>Virtual Collections</h2>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <VirtualCollectionsTable />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default VirtualCollections;
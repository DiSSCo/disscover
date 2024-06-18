/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';


/**
 * Component that renders the introduction section on the homepage
 * @returns JSX Component
 */
const Introduction = () => {
    return (
        <div>
            {/* Title */}
            <Row>
                <Col>
                    <h1 className="tc-primary fw-bold">Annotate digital specimens and contribute to science</h1>
                </Col>
            </Row>
            {/* Introduction text */}
            <Row className="mt-4">
                <Col>
                    {/* Upper half */}
                    <Row>
                        <Col>
                            <p className="tc-primary fw-lightBold">
                                Help us with improving the completeness and quality of information about specimens.
                                We aim to provide all information known about specimens held in Europe to science
                                and to make that information available as early and fast as possible.
                            </p>
                        </Col>
                    </Row>
                    {/* Second half */}
                    <Row className="mt-3">
                        <Col>
                            <p className="tc-primary fw-lightBold">
                                We need your help to correct errors, add or link new information and improve the quality of our data.
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Introduction;
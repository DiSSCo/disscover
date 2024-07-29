/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { faChevronLeft, faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import { Button } from 'components/elements/customUI/CustomUI';


const TopBar = () => {
    return (
        <div>
            <Row>
                {/* Return icon */}
                <Col lg="auto"
                    className="d-flex align-items-center"
                >
                    <FontAwesomeIcon icon={faChevronLeft}
                        className="tc-primary"
                        size="xl"
                    />
                </Col>
                {/* Title */}
                <Col className="d-flex align-items-center">
                    <p className="fs-2 fw-lightBold">Annotation Menu</p>
                </Col>
                {/* Refresh button */}
                <Col lg="auto"
                    className="d-flex align-items-center"
                >
                    <Button type="button"
                        variant="primary"
                    >
                        Refresh
                    </Button>
                </Col>
                <Col lg="auto"
                    className="d-flex align-items-center"
                >
                    <FontAwesomeIcon icon={faClosedCaptioning}
                        className="tc-accent"
                        size="xl"
                    />
                </Col>
            </Row>
        </div>
    );
};

export default TopBar;
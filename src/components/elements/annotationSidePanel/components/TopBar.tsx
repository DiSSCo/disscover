/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { faChevronLeft, faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import { Button, Tooltip } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    HideAnnotationSidePanel: Function
};


/**
 * Component that renders the top bar of the annotation side panel
 * @param HideAnnotationSidePanel Function that hides the annotation side panel
 * @returns JSX Component
 */
const TopBar = (props: Props) => {
    const { HideAnnotationSidePanel } = props;

    return (
        <div>
            <Row>
                {/* Return icon */}
                <Col lg="auto"
                    className="d-flex align-items-center"
                >
                    <Button type="button"
                        variant="blank"
                        className="px-0 py-0"
                        OnClick={() => HideAnnotationSidePanel()}
                    >
                        <FontAwesomeIcon icon={faChevronLeft}
                            className="tc-primary"
                            size="xl"
                        />
                    </Button>
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
                    <Tooltip text="All annotations are publicly available and subject to the CC-0 license"
                        placement="bottom"
                    >
                        <FontAwesomeIcon icon={faClosedCaptioning}
                            className="tc-accent"
                            size="xl"
                        />
                    </Tooltip>
                </Col>
            </Row>
        </div>
    );
};

export default TopBar;
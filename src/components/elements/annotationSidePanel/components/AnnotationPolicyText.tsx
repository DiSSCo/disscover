/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { faX } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    HidePolicyText: Function
};


/**
 * Component that renders the annotation policy text that is displayed in the annotation side panel
 * @param HidePolicyText Function to hide the annotation policy text
 * @returns JSX Component
 */
const AnnotationPolicyText = (props: Props) => {
    const { HidePolicyText } = props;

    return (
        <div className="px-4 py-4 tc-white">
            {/* Top bar */}
            <Row>
                <Col lg="auto"
                    className="d-flex align-items-center"
                >
                    <Button type="button"
                        variant="blank"
                        className="px-0 py-0"
                        OnClick={() => HidePolicyText()}
                    >
                        <FontAwesomeIcon icon={faX}
                            size="xl"
                        />
                    </Button>
                </Col>
                <Col className="d-flex align-items-center">
                    <p className="fs-2 fw-lightBold">
                        Annotation Policy
                    </p>
                </Col>
            </Row>
            {/* Policy content */}
            <Row className="mt-5">
                <Col>
                    {/* User requirements */}
                    <Row>
                        <Col>
                            <p className="fs-3 fw-bold">
                                User Requirements
                            </p>

                            <ul>
                                <li>
                                    To create annotations, users must have a valid ORCID identifier.
                                </li>
                                <li>
                                    We recommend that users add their institutional email to their ORCID record.
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    {/* Visibility of annotations */}
                    <Row className="mt-2">
                        <Col>
                            <p className="fs-3 fw-bold">
                                Visibility of Annotations
                            </p>

                            <ul>
                                <li>
                                    All annotations are public and can be viewed by anyone.
                                </li>
                                <li>
                                    No authentication is required to view annotation records.
                                </li>
                                <li>
                                    Annotations are also accessible via our API without authentication.
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    {/* Machine annotations */}
                    <Row className="mt-2">
                        <Col>
                            <p className="fs-3 fw-bold">
                                Machine Annotations
                            </p>

                            <ul>
                                <li>
                                    Machine agents and machine annotation services must undergo review and verification before being added to the Machine Annotation Service.
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    {/* Archiving annotations */}
                    <Row className="mt-2">
                        <Col>
                            <p className="fs-3 fw-bold">
                                User Requirements
                            </p>

                            <ul>
                                <li>
                                    Users can archive their own individual annotations.
                                </li>
                                <li>
                                    We do not delete annotations. Archived annotations are still accessible via the API;
                                    they are just not visible with the latest digital specimen version.
                                </li>
                                <li>
                                    [add examples of archived annotation when we have one; we decided to use the term archive
                                    instead of tombstone in this text as most people are familiar with term archive].
                                </li>
                            </ul>
                        </Col>
                    </Row>

                    <p className="fst-italic mt-4">
                        Note: This policy is subject to refinement. Please check for updates regularly.
                    </p>
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationPolicyText;
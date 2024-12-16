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
        <div className="h-100 d-flex flex-column px-4 py-4 tc-white">
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
            <Row className="flex-grow-1 overflow-scroll mt-5">
                <Col>
                    {/* Requirements for Annotations */}
                    <Row>
                        <Col>
                            <p className="fs-4 fw-bold">
                                Requirements for Annotations
                            </p>

                            <ul className="fs-5">
                                <li>
                                    Annotators are required to provide annotations that are true, unabiguous, traceable and reusable by others to the
                                    best of their abilities, with appropriate attribution for used sources. This does not apply for DiSSCo’s sandbox and
                                    development environments, which have a testing purpose.
                                </li>
                                <li>
                                    DiSSCo may block and report users that provide fake or inappropriate data.
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    {/* Identification */}
                    <Row className="mt-2">
                        <Col>
                            <p className="fs-4 fw-bold">
                                Identification
                            </p>

                            <ul className="fs-5">
                                <li>
                                    To create annotations, you are identified with the ORCID identifier you supplied. This identifier must be about you and
                                    not misrepresent your identity in any manner, in agreement with ORCID terms-of-use.
                                </li>
                                <li>
                                    DiSSCo aims to use your ORCID to identify you and credit you for your annotations and DiSSCo may share this information
                                    openly with other infrastructures.
                                </li>
                                <li>
                                    It is recommended to make your ORCID profile public so that people can discover your expertise, published works and can contact you by email.
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    {/* Accessibility of Annotations */}
                    <Row className="mt-2">
                        <Col>
                            <p className="fs-4 fw-bold">
                                Accessibility of Annotations
                            </p>

                            <ul className="fs-5">
                                <li>
                                    All annotations are public and are accessible through DiSSCover and through the DiSSCo API.
                                </li>
                                <li>
                                    All annotations can be used by anyone without any rights reserved (Creative Commons Zero license).
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    {/* Machine Annotation Services (MAS) */}
                    <Row className="mt-2">
                        <Col>
                            <p className="fs-4 fw-bold">
                                Machine Annotation Services (MAS)
                            </p>

                            <ul className="fs-5">
                                <li>
                                    Users who run a MAS service are not responsible for the produced MAS annotations.
                                </li>
                                <li>
                                    MAS services are free to use unless otherwise stated. Access to MAS may be restricted and service providers
                                    may charge for usage of a MAS service.
                                </li>
                                <li>
                                    Depending on their function, machine annotations may not always produce trustworthy or valid results.
                                    It is encouraged that MAS implement a confidence score for this purpose.
                                </li>
                                <li>
                                    To ensure trustworthy and secure services, MAS must undergo review and verification before being approved
                                    and added to the MAS Registry.
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    {/* Deletion and archiving of annotations*/}
                    <Row className="mt-2">
                        <Col>
                            <p className="fs-4 fw-bold">
                                Deletion and archiving of annotations
                            </p>

                            <ul className="fs-5">
                                <li>
                                    “Deletion” is implemented by making the annotation data inaccessible, the annotation identifier then resolves
                                    to a message explaining why the annotation can no longer be accessed.
                                </li>
                                <li>
                                    Annotations can be deleted by the annotator but may also be deleted by DiSSCo, either by an admin or an automated process.
                                </li>
                                <li>
                                    Depending on their function, machine annotations may not always produce trustworthy or valid results.
                                    It is encouraged that MAS implement a confidence score for this purpose.
                                </li>
                                <li>
                                    Users can also archive annotations if they become obsolete. The annotation is then still accessible via the 
                                    API but no longer not visible with the annotated object for users of the DiSSCover interface.
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationPolicyText;
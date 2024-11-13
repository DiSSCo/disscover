/* Import Dependencies */
import { Row, Col } from "react-bootstrap";

/* Import Types */
import { Identification } from "app/types/Identification";

/* Import Styles */
import styles from './digitalSpecimenOverview.module.scss';


/* Props Type */
type Props = {
    acceptedIdentification: Identification,
    digitalSpecimenName: string
};


/**
 * Component that renders the accepted identification in the digital specimen overview on the digital specimen page
 * @param acceptedIdentification The accepted identification to display
 * @param digitalSpecimenName The name of the selected digital specimen
 * @returns JSX Component
 */
const AcceptedIdentification = (props: Props) => {
    const { acceptedIdentification, digitalSpecimenName } = props;

    return (
        <div className="h-100 d-flex flex-column">
            <Row>
                <Col>
                    {/* Scientific Name */}
                    <p className="fs-4 fw-lightBold textOverflow"
                        dangerouslySetInnerHTML={{ __html: acceptedIdentification["ods:hasTaxonIdentification"]?.[0]["ods:scientificNameHtmlLabel"] ?? digitalSpecimenName} }
                    />
                </Col>
            </Row>
            <Row className="flex-grow-1 mt-2">
                <Col lg="auto"
                    className="pe-0"
                >
                    <div className="w-0 b-accent h-100" />
                </Col>
                <Col lg="auto"
                    className="ps-0  py-2 pe-0"
                >
                    <div className="h-100 d-flex flex-column justify-content-between">
                        <div className={`${styles.taxonomicTreeBranch} b-accent`} />
                        <div className="b-accent" />
                        <div className="b-accent" />
                        <div className="b-accent" />
                        <div className="b-accent" />
                        <div className="b-accent" />
                    </div>
                </Col>
                <Col lg
                    className="overflow-hidden"
                >
                    <div className="h-100 d-flex flex-column justify-content-between">
                        {/* Kingdom */}
                        <Row>
                            <Col>
                                <p className="fs-4 textOverflow">
                                    <span className="fw-lightBold">Kingdom: </span>
                                    {acceptedIdentification["ods:hasTaxonIdentification"]?.[0]["dwc:kingdom"]}
                                </p>
                            </Col>
                        </Row>
                        {/* Phylum */}
                        <Row>
                            <Col>
                                <p className="fs-4 textOverflow">
                                    <span className="fw-lightBold">Phylum: </span>
                                    {acceptedIdentification["ods:hasTaxonIdentification"]?.[0]["dwc:phylum"]}
                                </p>
                            </Col>
                        </Row>
                        {/* Class */}
                        <Row>
                            <Col>
                                <p className="fs-4 textOverflow">
                                    <span className="fw-lightBold">Class: </span>
                                    {acceptedIdentification["ods:hasTaxonIdentification"]?.[0]["dwc:class"]}
                                </p>
                            </Col>
                        </Row>
                        {/* Order */}
                        <Row>
                            <Col>
                                <p className="fs-4 textOverflow">
                                    <span className="fw-lightBold">Order: </span>
                                    {acceptedIdentification["ods:hasTaxonIdentification"]?.[0]["dwc:order"]}
                                </p>
                            </Col>
                        </Row>
                        {/* Family */}
                        <Row>
                            <Col>
                                <p className="fs-4 textOverflow">
                                    <span className="fw-lightBold">Family: </span>
                                    {acceptedIdentification["ods:hasTaxonIdentification"]?.[0]["dwc:family"]}
                                </p>
                            </Col>
                        </Row>
                        {/* Genus */}
                        <Row>
                            <Col>
                                <p className="fs-4 textOverflow">
                                    <span className="fw-lightBold">Genus: </span>
                                    <span className="fst-italic">{acceptedIdentification["ods:hasTaxonIdentification"]?.[0]["dwc:genus"]}</span>
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AcceptedIdentification;
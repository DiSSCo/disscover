/* Import Dependencies */
import { Row, Col } from "react-bootstrap";

/* Import Utilities */
import { GetSpecimenGenusLabel } from "app/utilities/NomenclaturalUtilities";

/* Import Types */
import { Identification } from "app/types/Identification";

/* Import Styles */
import styles from './digitalSpecimenOverview.module.scss';


/* Props Type */
type Props = {
    acceptedIdentification: Identification,
    digitalSpecimenName: string,
};

/* Taxonomic Rank Type */
type TaxonomicRank = 'kingdom' | 'phylum' | 'class' | 'order' | 'family' | 'genus';


/**
 * Component that renders the accepted identification in the digital specimen overview on the digital specimen page
 * @param acceptedIdentification The accepted identification to display
 * @param digitalSpecimenName The name of the selected digital specimen
 * @param annotationMode Boolean indicating if the annotation mode is on
 * @returns JSX Component
 */
const AcceptedIdentification = (props: Props) => {
    const { acceptedIdentification, digitalSpecimenName } = props;

    const renderTaxonomicRank = (displayName: string, rank: TaxonomicRank, isGenus: boolean = false) => (
            <Row>
                <Col>
                    {isGenus && 
                    <p className="fs-4 textOverflow">
                        <span className="fw-lightBold">{displayName}: </span>
                        <span dangerouslySetInnerHTML={{__html: GetSpecimenGenusLabel(acceptedIdentification)}} />
                    </p>}
                    {!isGenus && 
                    <p className="fs-4 textOverflow">
                        <span className="fw-lightBold">{displayName}: </span>
                        {acceptedIdentification["ods:hasTaxonIdentifications"]?.[0][`dwc:${rank}`]}
                    </p>}
                </Col>
            </Row>
    );

    return (
        <div className="h-100 d-flex flex-column">
            <Row>
                <Col>
                    {/* Scientific Name */}
                    <p className="fs-4 fw-lightBold textOverflow"
                        dangerouslySetInnerHTML={{ __html: acceptedIdentification["ods:hasTaxonIdentifications"]?.[0]["ods:scientificNameHTMLLabel"] ?? digitalSpecimenName }}
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
                        {renderTaxonomicRank('Kingdom', 'kingdom')}
                        {/* Phylum */}
                        {renderTaxonomicRank('Phylum', 'phylum')}
                        {/* Class */}
                        {renderTaxonomicRank('Class', 'class')}
                        {/* Order */}
                        {renderTaxonomicRank('Order', 'order')}
                        {/* Family */}
                        {renderTaxonomicRank('Family', 'family')}
                        {/* Genus */}
                        {renderTaxonomicRank('Genus', 'genus', true)}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AcceptedIdentification;
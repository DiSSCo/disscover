/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import styles from './nomenclatural.module.scss';

/* Import Components */
import ScientificName from './ScientificName';
import Kingdom from './Kingdom';
import Class from './Class';
import Phylum from './Phylum';
import Order from './Order';
import Family from './Family';
import Genus from './Genus';


/* Props Typing */
interface Props {
    taxonIdentification: Dict,
    ToggleSidePanel: Function
}


const TaxonomicTree = (props: Props) => {
    const { taxonIdentification, ToggleSidePanel } = props;

    return (
        <div className="h-100 d-flex flex-column">
            <Row>
                <Col className="fs-4">
                    {/* Scientific Name */}
                    <span className="fw-lightBold"> <ScientificName specimenName={taxonIdentification["dwc:scientificName"]} /> </span>
                </Col>
            </Row>
            <Row className="flex-grow-1 mt-2">
                <Col className="col-md-auto pe-0">
                    <div className="w-0 b-accent h-100" />
                </Col>
                <Col className="col-md-auto ps-0 d-flex flex-column justify-content-between py-2 pe-0">
                    <div className={`${styles.taxonomicTreeBranch} b-accent`} />
                    <div className="b-accent" />
                    <div className="b-accent" />
                    <div className="b-accent" />
                    <div className="b-accent" />
                    <div className="b-accent" />
                </Col>
                <Col className="d-flex flex-column justify-content-between">
                    {/* Kingdom */}
                    <Row>
                        <Col className="fs-4 textOverflow c-pointer"
                            onClick={() => ToggleSidePanel('dwc:kingdom')}
                        >
                            <span className="fw-lightBold">Kingdom: </span> <Kingdom kingdom={taxonIdentification["dwc:kingdom"]} />
                        </Col>
                    </Row>
                    {/* Class */}
                    <Row>
                        <Col className="fs-4 textOverflow c-pointer"
                            onClick={() => ToggleSidePanel('dwc:class')}
                        >
                            <span className="fw-lightBold">Class: </span> <Class classProp={taxonIdentification["dwc:class"]} />
                        </Col>
                    </Row>
                    {/* Phylum */}
                    <Row>
                        <Col className="fs-4 textOverflow c-pointer"
                            onClick={() => ToggleSidePanel('dwc:phylum')}
                        >
                            <span className="fw-lightBold">Phylum: </span> <Phylum phylum={taxonIdentification["dwc:phylum"]} />
                        </Col>
                    </Row>
                    {/* Order */}
                    <Row>
                        <Col className="fs-4 textOverflow c-pointer"
                            onClick={() => ToggleSidePanel('dwc:order')}
                        >
                            <span className="fw-lightBold">Order: </span> <Order order={taxonIdentification["dwc:order"]} />
                        </Col>
                    </Row>
                    {/* Family */}
                    <Row>
                        <Col className="fs-4 textOverflow c-pointer"
                            onClick={() => ToggleSidePanel('dwc:family')}
                        >
                            <span className="fw-lightBold">Family: </span> <Family family={taxonIdentification["dwc:family"]} />
                        </Col>
                    </Row>
                    {/* Genus */}
                    <Row>
                        <Col className="fs-4 textOverflow c-pointer"
                            onClick={() => ToggleSidePanel('dwc:genus')}
                        >
                            <span className="fw-lightBold">Genus: </span> <Genus genus={taxonIdentification["dwc:genus"]} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default TaxonomicTree;
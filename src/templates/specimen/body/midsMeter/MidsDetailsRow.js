import { Row, Col } from 'react-bootstrap';

/* Import Components */
import MidsDetailsProperty from './MidsDetailsProperty';


const MidsDetailsRow = (props) => {
    const specimenGroup = props.specimenGroup;
    const group = props.group;
    const scrollToMids = props.scrollToMids;

    return (
        <Row>
            <Col md={{ span: 12 }} className="ms-3 mt-3 mb-3 annotate_midsDetailsSection">
                <Row>
                    <Col className="col-md-auto annotate_midsDetailsSectionTitle">
                        {group}
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 12 }} className="annotate_midsDetailsSectionContent">
                        {Object.keys(specimenGroup).map((key, _i) => {
                            const specimenProperty = specimenGroup[key];

                            if (specimenProperty['mids']) {
                                return (
                                    <MidsDetailsProperty
                                        key={key}
                                        specimenProperty={specimenProperty}
                                        property={key}
                                        scrollToMids={scrollToMids}

                                        ScrollMids={(ref) => props.ScrollMids(ref)}
                                    />
                                );
                            }
                        })}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default MidsDetailsRow;
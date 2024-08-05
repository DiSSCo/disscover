/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';

/* Import Components */
import { OpenStreetMap } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen
};


/**
 * Component that renders the digital specimen overview content block on the digital specimen page
 * @returns JSX Component
 */
const DigitalSpecimenOverview = (props: Props) => {
    const { digitalSpecimen } = props;

    return (
        <div className="h-100">
            {/* Geological Reference */}
            <Row className="h-50 pb-2">
                <Col lg={{ span: 7 }}>
                    <Card className="h-100 py-2 px-3">
                        {/* Title */}
                        <Row>
                            <Col>
                                <p className="tc-accent fw-lightBold">Geological Reference</p>
                            </Col>
                        </Row>
                        {/* Geological reference map */}
                        <Row className="py-2 h-100">
                            <Col>
                                <OpenStreetMap georeference={digitalSpecimen['ods:hasEvent']?.[0]['ods:Location']?.['ods:GeoReference']} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col lg={{ span: 5 }}>
                    <Card className="h-100" />
                </Col>
            </Row>
            {/* */}
            <Row className="h-50 pt-2">
                <Col>
                    <Card className="h-100" />
                </Col>
                <Col>
                    <Card className="h-100">

                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DigitalSpecimenOverview;
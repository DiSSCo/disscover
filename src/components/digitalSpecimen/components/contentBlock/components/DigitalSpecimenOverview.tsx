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
 * @param digitalSpecimen The selected digital specimen
 * @returns JSX Component
 */
const DigitalSpecimenOverview = (props: Props) => {
    const { digitalSpecimen } = props;

    /* Base variables */
    const collectors: string[] = [];

    /* Construct collectors array */
    console.log(digitalSpecimen['ods:hasAgent']);
    digitalSpecimen['ods:hasAgent']?.filter(agent => agent['schema:roleName'] === 'collector').forEach(agent => {
        if (agent['schema:name']) {
            collectors.push(agent['schema:name']);
        }
    })

    return (
        <div className="h-100">
            <Row className="h-50 pb-2">
                {/* Origin */}
                <Col lg={{ span: 5 }}>
                    <Card className="h-100 py-2 px-3">
                        {/* Title */}
                        <Row>
                            <Col>
                                <p className="tc-accent fw-lightBold">Origin</p>
                            </Col>
                        </Row>
                        {/* Fields */}
                        <Row>
                            <Col>
                                {/* Collectors */}
                                <Row>
                                    <Col>
                                        <p>
                                            <span className="fw-lightBold">Collectors: </span>
                                            {collectors.join(' & ')}
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                {/* Geological Reference */}
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
                                <OpenStreetMap georeference={digitalSpecimen['ods:hasEvent']?.[0]?.['ods:Location']?.['ods:GeoReference']} />
                            </Col>
                        </Row>
                    </Card>
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
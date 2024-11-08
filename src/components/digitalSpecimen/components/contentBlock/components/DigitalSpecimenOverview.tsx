/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { Event } from 'app/types/Event';

/* Import Components */
import AcceptedIdentification from './digitalSpecimenOverviewContent/AcceptedIdentification';
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
    const acceptedIdentification = digitalSpecimen['ods:hasIdentification']?.find(identification => identification['ods:isVerifiedIdentification']);
    const collectors: string[] = [];
    const collectionEvent: Event | undefined = digitalSpecimen['ods:hasEvent']?.find(event => event['dwc:eventType'] === 'Collection');
    const topicDisciplinesWithIdentifications: string[] = [
        'Anthropology',
        'Botany',
        'Ecology',
        'Microbiology',
        'Palaeontology',
        'Zoology',
        'Other Biodiversity'
    ];

    /* Construct collectors array */
    digitalSpecimen['ods:hasAgent']?.filter(agent => agent['schema:roleName'] === 'collector').forEach(agent => {
        if (agent['schema:name']) {
            collectors.push(agent['schema:name']);
        }
    });

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
                        <Row className="mt-2">
                            <Col>
                                {/* Collectors */}
                                <Row>
                                    <Col>
                                        <p className="fs-4 textOverflow">
                                            <span className="fw-lightBold">{`Collector${collectors.length > 1 ? 's' : ''}:`} </span>
                                            {collectors.join(' & ')}
                                        </p>
                                    </Col>
                                </Row>
                                {/* Collection date */}
                                <Row className="mt-1">
                                    <Col>
                                        <p className="fs-4 textOverflow">
                                            <span className="fw-lightBold">Collection date:</span>
                                            {collectionEvent?.['dwc:eventDate']}
                                        </p>
                                    </Col>
                                </Row>
                                {/* Country */}
                                <Row className="mt-1">
                                    <Col>
                                        <p className="fs-4 textOverflow">
                                            <span className="fw-lightBold">Country:</span>
                                            {collectionEvent?.['ods:Location']?.['dwc:country']}
                                        </p>
                                    </Col>
                                </Row>
                                {/* Locality */}
                                <Row className="mt-1">
                                    <Col>
                                        <p className="fs-4 textOverflow">
                                            <span className="fw-lightBold">Locality:</span>
                                            {collectionEvent?.['ods:Location']?.['dwc:locality']}
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                {/* Geological Reference */}
                <Col lg={{ span: 7 }}>
                    <Card className="h-100 pt-2 pb-2 px-3">
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
                {(topicDisciplinesWithIdentifications.includes(digitalSpecimen['ods:topicDiscipline'] ?? '') && acceptedIdentification) &&
                    <Col lg={{ span: 4 }}>
                        <Card className="h-100 d-flex flex-column pt-2 pb-3 px-3">
                            {/* Title */}
                            <Row>
                                <Col>
                                    <p className="tc-accent fw-lightBold">Accepted Identification</p>
                                </Col>
                            </Row>
                            {/* Accepted identification */}
                            <Row className="flex-grow-1 overflow-hidden mt-2">
                                <Col>
                                    <AcceptedIdentification acceptedIdentification={acceptedIdentification}
                                        digitalSpecimenName={digitalSpecimen['ods:specimenName'] ?? ''}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                }
                <Col>
                    <Card className="h-100">

                    </Card>
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
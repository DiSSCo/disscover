/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { Event } from 'app/types/Event';

/* Import Icons */
import { faCopy } from '@fortawesome/free-solid-svg-icons';

/* Import Styles */
import styles from './digitalSpecimenOverviewContent/digitalSpecimenOverview.module.scss';

/* Import Components */
import AcceptedIdentification from './digitalSpecimenOverviewContent/AcceptedIdentification';
import { Button, OpenStreetMap, Tooltip } from 'components/elements/customUI/CustomUI';


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
    const [copyMessage, setCopyMessage] = useState<string>('Copy');
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

    /**
     * Function to craft a citation string for this digital specimen
     * @returns Citation string
     */
    const CraftCitation = () => {
        return `Distributed System of Scientific Collections (${new Date().getFullYear()}). ${digitalSpecimen['ods:specimenName']} [Dataset]. ${digitalSpecimen['ods:ID']}`;
    };

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
                            {collectionEvent?.['ods:Location']?.['dwc:countryCode'] &&
                                <Col lg="auto">
                                    <img src={`https://flagsapi.com/${collectionEvent['ods:Location']['dwc:countryCode']}/shiny/64.png`}
                                        alt="Flag icon of country"
                                        className={styles.countryFlag}
                                    />
                                </Col>
                            }
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
                    <Col lg={{ span: 4 }}
                        className="h-100"
                    >
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
                <Col className="h-100">
                    <Card className="h-100 pt-2 pb-3 px-3">
                        {/* Title */}
                        <Row>
                            <Col>
                                <p className="tc-accent fw-lightBold">Specimen Host</p>
                            </Col>
                        </Row>
                        {/* Fields */}
                        <Row className="mt-2">
                            <Col>
                                {/* Name */}
                                <Row>
                                    <Col>
                                        <p className="fs-4 textOverflow">
                                            <span className="fw-lightBold">Name: </span>
                                            <a href={digitalSpecimen['ods:organisationID']}
                                                target="_blank"
                                                rel="noreferer"
                                                className="tc-accent"
                                            >
                                                {digitalSpecimen['ods:organisationName']}
                                            </a>
                                        </p>
                                    </Col>
                                </Row>
                                {/* Collection */}
                                <Row className="mt-1">
                                    <Col>
                                        <p className="fs-4 textOverflow">
                                            <span className="fw-lightBold">Collection: </span>
                                            {digitalSpecimen['dwc:collectionCode']}
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col className="h-100 overflow-hidden">
                    <Card className="h-100 d-flex flex-column pt-2 pb-3 px-3">
                        {/* Title */}
                        <Row>
                            <Col>
                                <p className="tc-accent fw-lightBold">How to cite</p>
                            </Col>
                        </Row>
                        {/* Citation */}
                        <Row className="flex-grow-1 overflow-hidden mt-2">
                            <Col className="h-100">
                                <div className="bgc-grey-light px-3 py-2 br-corner">
                                    <Row>
                                        <Col className="overflow-scroll">
                                            <p className="fs-4">
                                                {CraftCitation()}
                                            </p>
                                        </Col>
                                        <Col lg="auto">
                                            <Button type="button"
                                                variant="blank"
                                                className="px-0 py-0"
                                                OnClick={() => {
                                                    navigator.clipboard.writeText(CraftCitation());
                                                    setCopyMessage('Copied');

                                                    setTimeout(() => {
                                                        setCopyMessage('Copy');
                                                    }, 2000);
                                                }}
                                            >
                                                <Tooltip text={copyMessage}
                                                    placement="bottom"
                                                >
                                                    <FontAwesomeIcon icon={faCopy}
                                                        className="tc-grey"
                                                    />
                                                </Tooltip>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DigitalSpecimenOverview;
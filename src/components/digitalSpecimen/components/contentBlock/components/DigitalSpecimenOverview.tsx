/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Utiltiies */
import { GetSpecimenNameHTMLLabel, GetSpecimenNameIdentifier } from 'app/utilities/NomenclaturalUtilities';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { Event } from 'app/types/Event';

/* Import Icons */
import { faCopy, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import AcceptedIdentification from './digitalSpecimenOverviewContent/AcceptedIdentification';
import { Button, OpenStreetMap, Tooltip } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen,
    annotationMode: boolean,
    SetAnnotationTarget: Function,
    ToggleAnnotationMode: Function
};


/**
 * Component that renders the digital specimen overview content block on the digital specimen page
 * @param digitalSpecimen The selected digital specimen
 * @param annotationMode Boolean indicating if the annotation mode is enabled
 * @param SetAnnotationTarget Function to set the annotation target
 * @returns JSX Component
 */
const DigitalSpecimenOverview = (props: Props) => {
    const { digitalSpecimen, annotationMode, SetAnnotationTarget, ToggleAnnotationMode } = props;

    /* Base variables */
    const [copyMessage, setCopyMessage] = useState<string>('Copy');
    const acceptedIdentification = digitalSpecimen['ods:hasIdentifications']?.find(identification => identification['ods:isVerifiedIdentification']);
    const acceptedIdentificationIndex: number | undefined = digitalSpecimen['ods:hasIdentifications']?.findIndex(identification => identification['ods:isVerifiedIdentification']);
    const collectors: string[] = [];
    const collectionEvent: Event | undefined = digitalSpecimen['ods:hasEvents']?.find(event => event['dwc:eventType'] === 'Collecting Event');
    const collectionEventIndex: number | undefined = digitalSpecimen['ods:hasEvents']?.findIndex(event => event['dwc:eventType'] === 'Collecting Event');
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
    digitalSpecimen['ods:hasEvents']?.filter(
        event => event['ods:hasAgents']?.filter(
            agent => agent['ods:hasRoles']?.find(
                role => role['schema:roleName'] === 'collector')
        ).forEach(agent => {
            if (agent['schema:name']) {
                collectors.push(agent['schema:name']);
            }
        })
    );

    /**
     * Function to craft a citation string for this digital specimen
     * @returns Citation string
     */
    const CraftCitation = (label?: boolean) => {
        /**
         * Function to determine the organisation name for the citation string
         * @returns Organisation name with link
         */
        const OrganisationName = () => {
            return <a href={digitalSpecimen['ods:organisationID']}
                target="_blank"
                rel="noreferer"
                className="tc-accent"
            >
                {digitalSpecimen['ods:organisationName'] ?? digitalSpecimen['ods:organisationID']}
            </a>
        };

        /**
         * Function to determine the scientific name for the citation string
         * @returns Scientific name, with or without link/label
         */
        const ScientificName = () => {
            const scientificNameIdentifier = GetSpecimenNameIdentifier(digitalSpecimen);

            if (scientificNameIdentifier) {
                return (
                    <a href={scientificNameIdentifier}
                        target="_blank"
                        rel="noreferer"
                        className="tc-accent"
                    >
                        <span dangerouslySetInnerHTML={{ __html: GetSpecimenNameHTMLLabel(digitalSpecimen) }} />
                    </a>
                );
            } else {
                return <span dangerouslySetInnerHTML={{ __html: (GetSpecimenNameHTMLLabel(digitalSpecimen) ?? digitalSpecimen['ods:specimenName']) }} />;
            }
        };

        if (label) {
            return (
                <>
                    {OrganisationName()}
                    {` (${new Date().getFullYear()}). `}
                    {ScientificName()}
                    {'. '}
                    <a href="https://ror.org/02wddde16"
                        target="_blank"
                        rel="noreferer"
                        className="tc-accent"
                    >
                        Distributed System of Scientific Collections
                    </a>
                    {`. [Dataset]. `}
                    <a href={digitalSpecimen['@id']}
                        target="_blank"
                        rel="noreferer"
                        className="tc-accent"
                    >
                        {digitalSpecimen['@id']}
                    </a>
                </>
            );
        } else {
            return `${digitalSpecimen['ods:organisationName'] ? digitalSpecimen['ods:organisationName'] + '.' : digitalSpecimen['ods:organisationID'] + '.'} (${new Date().getFullYear()}). ${digitalSpecimen['ods:specimenName']}. Distributed System of Scientific Collections. [Dataset]. ${digitalSpecimen['@id']}`;
        }
    };

    /* Class Names */
    const overviewItemButtonClass = classNames({
        'tr-fast': true,
        'hover-grey mc-pointer': annotationMode,
        'mc-default': !annotationMode
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
                                        <button type="button"
                                            className={`${overviewItemButtonClass} button-no-style textOverflow px-0 py-0 overflow-hidden`}
                                            onClick={() => (annotationMode && collectionEvent) &&
                                                SetAnnotationTarget('term', `$['ods:hasEvents'][${collectionEventIndex}]['dwc:eventDate']`)
                                            }
                                        >
                                            <p className="fs-4 textOverflow">
                                                <span className="fw-lightBold">Collection date: </span>
                                                {collectionEvent?.['dwc:eventDate']}
                                            </p>
                                        </button>
                                    </Col>
                                </Row>
                                {/* Country */}
                                <Row className="mt-1">
                                    <Col>
                                        <button type="button"
                                            className={`${overviewItemButtonClass} button-no-style textOverflow px-0 py-0 overflow-hidden`}
                                            onClick={() => (annotationMode && collectionEvent) &&
                                                SetAnnotationTarget('term', `$['ods:hasEvents'][${collectionEventIndex}]['ods:hasLocation']['dwc:country']`)
                                            }
                                        >
                                            <p className="fs-4 textOverflow">
                                                <span className="fw-lightBold">Country: </span>
                                                {collectionEvent?.['ods:hasLocation']?.['dwc:country']}
                                            </p>
                                        </button>
                                    </Col>
                                </Row>
                                {/* Locality */}
                                <Row className="mt-1">
                                    <Col>
                                        <button type="button"
                                            className={`${overviewItemButtonClass} button-no-style textOverflow px-0 py-0 overflow-hidden`}
                                            onClick={() => (annotationMode && collectionEvent) &&
                                                SetAnnotationTarget('term', `$['ods:hasEvents'][${collectionEventIndex}]['ods:hasLocation']['dwc:locality']`)
                                            }
                                        >
                                            <p className="fs-4 textOverflow">
                                                <span className="fw-lightBold">Locality: </span>
                                                {collectionEvent?.['ods:hasLocation']?.['dwc:locality']}
                                            </p>
                                        </button>
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
                                <p className="tc-accent fw-lightBold">Geographical Map</p>
                            </Col>
                        </Row>
                        {/* Geological reference map */}
                        <Row className="py-2 h-100">
                            <Col>
                                <OpenStreetMap georeference={digitalSpecimen['ods:hasEvents']?.[0]?.['ods:hasLocation']?.['ods:hasGeoreference']} />
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
                                <Col lg="auto">
                                    <Button type="button"
                                        variant="blank"
                                        className="px-0 py-0"
                                        dataTestId="identification-annotation-button"
                                        OnClick={() => {
                                            // Toggle annotation mode
                                            ToggleAnnotationMode();
                                            // Set annotation target to taxonomic identification
                                            SetAnnotationTarget('class', `$['ods:hasIdentifications'][${acceptedIdentificationIndex}]['ods:hasTaxonIdentifications'][0]`);
                                        }}
                                    >
                                        <Tooltip text="Add an annotation to modify the accepted identification"
                                            placement="bottom"
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare}
                                                className="tc-grey"
                                            />
                                        </Tooltip>
                                    </Button>
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
                                        <button type="button"
                                            className={`${overviewItemButtonClass} button-no-style textOverflow px-0 py-0 overflow-hidden`}
                                            onClick={() => annotationMode &&
                                                SetAnnotationTarget('term', `$['ods:organisationName']`)
                                            }
                                        >
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
                                        </button>
                                    </Col>
                                </Row>
                                {/* Collection */}
                                <Row className="mt-1">
                                    <Col>
                                        <button type="button"
                                            className={`${overviewItemButtonClass} button-no-style textOverflow px-0 py-0 overflow-hidden`}
                                            onClick={() => annotationMode &&
                                                SetAnnotationTarget('term', `$['dwc:collectionCode']`)
                                            }
                                        >
                                            <p className="fs-4 textOverflow">
                                                <span className="fw-lightBold">Collection: </span>
                                                {digitalSpecimen['dwc:collectionCode']}
                                            </p>
                                        </button>
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
                                                {CraftCitation(true)}
                                            </p>
                                        </Col>
                                        <Col lg="auto">
                                            <Button type="button"
                                                variant="blank"
                                                className="px-0 py-0"
                                                OnClick={() => {
                                                    navigator.clipboard.writeText(CraftCitation() as string);
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
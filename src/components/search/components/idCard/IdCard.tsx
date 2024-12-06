/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { RetrieveEnvVariable } from 'app/Utilities';
import { DetermineScientificName, GetSpecimenNameHTMLLabel } from 'app/utilities/NomenclaturalUtilities';

/* Import Hooks */
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch, useFetch } from 'app/Hooks';

/* Import Store */
import { getDigitalSpecimen, setDigitalSpecimen } from 'redux-store/DigitalSpecimenSlice';
import { getSearchDigitalSpecimen, setSearchDigitalSpecimen } from 'redux-store/SearchSlice';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';

/* Import Icons */
import { faChevronRight, faInfoCircle, faXmark } from '@fortawesome/free-solid-svg-icons';

/* Import API */
import GetDigitalSpecimen from 'api/digitalSpecimen/GetDigitalSpecimen';
import GetDigitalSpecimenDigitalMedia from 'api/digitalSpecimen/GetDigitalSpecimenDigitalMedia';

/* Import Components */
import { Button, LoadingScreen, OpenStreetMap } from 'components/elements/customUI/CustomUI';
import { DigitalMediaItem } from 'components/elements/Elements';


/**
 * Component that renders the ID card on the search page
 * @returns JSX Component
 */
const IdCard = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const fetch = useFetch();

    /* Base variables */
    const digitalSpecimen = useAppSelector(getDigitalSpecimen);
    const searchDigitalSpecimen = useAppSelector(getSearchDigitalSpecimen);
    const [digitalSpecimenDigitalMedia, setDigitalSpecimenDigitalMedia] = useState<DigitalMedia[] | undefined>();

    /* Fetch full digital specimen */
    fetch.FetchMultiple({
        callMethods: [
            {
                alias: 'digitalSpecimen',
                params: {
                    handle: searchDigitalSpecimen?.['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')
                },
                Method: GetDigitalSpecimen,
            },
            {
                alias: 'digitalMedia',
                params: {
                    handle: searchDigitalSpecimen?.['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')
                },
                Method: GetDigitalSpecimenDigitalMedia
            }
        ],
        triggers: [searchDigitalSpecimen],
        Handler: (results: {
            digitalSpecimen: DigitalSpecimen | undefined,
            digitalMedia: DigitalMedia[]
        }) => {
            /* Dispatch digital specimen */
            dispatch(setDigitalSpecimen(results.digitalSpecimen));

            /* Set digital specimen digital media, if array is not empty */
            if (!isEmpty(results.digitalMedia) || digitalSpecimen?.['ods:isKnownToContainMedia']) {
                setDigitalSpecimenDigitalMedia(results.digitalMedia);
            }
        }
    });

    return (
        <div className="h-100 d-flex flex-column">
            <Card className="h-100 px-4 py-3">
                {/* Topic discipline/taxonomic icon, title and close icon */}
                <Row>
                    {/* Specimen name */}
                    <Col className="text-overflow">
                        <p className="fs-3 fw-bold textOverflow"
                            dangerouslySetInnerHTML={{ __html: digitalSpecimen ? GetSpecimenNameHTMLLabel(digitalSpecimen) : '' }}
                        />
                    </Col>
                    {/* Close icon */}
                    <Col lg="auto"
                        className="d-flex align-items-center"
                    >
                        <Button type="button"
                            variant="blank"
                            className="py-0 px-0"
                            OnClick={() => {
                                dispatch(setDigitalSpecimen(undefined));
                                dispatch(setSearchDigitalSpecimen(undefined));
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark}
                                className="fs-2 tc-primary"
                            />
                        </Button>
                    </Col>
                </Row>
                {/* MIDS level, topic discipline and preserved state; and DOI */}
                <Row className="mt-1">
                    {/* MIDS level */}
                    <Col lg="auto">
                        <Row>
                            <Col lg="auto"
                                className="d-flex align-items-center pe-0"
                            >
                                <FontAwesomeIcon icon={faInfoCircle}
                                    className="fs-4 tc-accent"
                                />
                            </Col>
                            <Col>
                                <p className="fs-4 tc-accent fw-bold">
                                    MIDS level {digitalSpecimen?.['ods:midsLevel']}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    {/* Topic discipline and preserved state */}
                    <Col lg="auto"
                        className="d-flex align-items-center"
                    >
                        <p className="fs-4">
                            {`${digitalSpecimen?.['ods:topicDiscipline']} | ${digitalSpecimen?.['ods:livingOrPreserved']}`}
                        </p>
                    </Col>
                    {/* DOI */}
                    <Col lg="auto"
                        className="d-flex align-items-center"
                    >
                        <p className="fs-4 tc-grey">{digitalSpecimen?.['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')}</p>
                    </Col>
                </Row>
                {/* Primary details of digital specimen */}
                <Row className="mt-3">
                    <Col className="fs-4">
                        {/* Scientific name */}
                        <p>
                            <span className="fw-lightBold">Scientific name: </span>
                            {digitalSpecimen && DetermineScientificName(digitalSpecimen)}
                        </p>
                        {/* Physical specimen ID */}
                        <p>
                            <span className="fw-lightBold">Physical specimen ID: </span>
                            {digitalSpecimen?.['ods:physicalSpecimenIDType'] === 'Resolvable' ?
                                <a href={digitalSpecimen?.['ods:physicalSpecimenID']}
                                    className="tc-accent"
                                >
                                    {`${digitalSpecimen?.['ods:normalisedPhysicalSpecimenID']}`}
                                </a>
                                : <>
                                    {`${digitalSpecimen?.['ods:normalisedPhysicalSpecimenID']}`}
                                </>
                            }
                        </p>
                        {/* Physical specimen collection */}
                        <p>
                            <span className="fw-lightBold">Collection code: </span>
                            {digitalSpecimen?.['dwc:collectionCode'] ?? digitalSpecimen?.['dwc:collectionID']}
                        </p>
                        {/* Organisation */}
                        <p>
                            <span className="fw-lightBold">Organisation: </span>
                            <a href={digitalSpecimen?.['ods:organisationID']}
                                target="_blank"
                                rel="noreferer"
                                className="tc-accent"
                            >
                                {digitalSpecimen?.['ods:organisationName'] ?? digitalSpecimen?.['ods:organisationID']}
                            </a>
                        </p>
                    </Col>
                </Row>
                {/* Map and Digital Media */}
                <Row className="flex-grow-1 overflow-hidden my-4">
                    <Col className="h-100">
                        {/* Display map, if coordinates are present */}
                        {(digitalSpecimen?.['ods:hasEvents']?.[0]?.['ods:hasLocation']?.['ods:hasGeoreference']?.['dwc:decimalLatitude'] &&
                            digitalSpecimen?.['ods:hasEvents']?.[0]?.['ods:hasLocation']?.['ods:hasGeoreference']['dwc:decimalLongitude']
                        ) &&
                            <Row className="h-50 pb-2">
                                <Col>
                                    <OpenStreetMap georeference={digitalSpecimen?.['ods:hasEvents']?.[0]['ods:hasLocation']?.['ods:hasGeoreference']} />
                                </Col>
                            </Row>
                        }
                        {/* Display digital media items, if any present */}
                        {digitalSpecimen?.['ods:isKnownToContainMedia'] &&
                            <>
                                {digitalSpecimenDigitalMedia?.length ?
                                    <Row className="h-50 flex-nowrap overflow-x-scroll pt-2">
                                        {digitalSpecimenDigitalMedia?.map((digitalMedia, index) => (
                                            <Col key={`${digitalMedia['@id']}_${index}`}
                                                lg={{ span: 4 }}
                                                className="h-100 overflow-hidden"
                                            >

                                                <Button type="button"
                                                    variant="blank"
                                                    className="px-0 py-0 h-100 w-100 d-flex align-items-center justify-content-center bgc-grey br-corner overflow-hidden"
                                                    OnClick={() => navigate(`/dm/${digitalMedia['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')}`)}
                                                >
                                                    <DigitalMediaItem digitalMedia={digitalMedia} />
                                                </Button>


                                            </Col>
                                        ))}
                                    </Row>
                                    : <Row>
                                        <Col>
                                            <div className="bgc-accent-soft br-corner px-3 py-2">
                                                <p className="fs-4">
                                                    <FontAwesomeIcon icon={faInfoCircle}
                                                        className="pe-2"
                                                    />
                                                    An issue occurred whilst loading the Digital Specimen's associated Digital Media
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                }
                            </>
                        }
                    </Col>
                </Row>
                {/* See full details button */}
                <Row className="flex-row-reverse">
                    <Col lg="auto">
                        <Button type="button"
                            variant="primary"
                            OnClick={() => navigate(`/ds/${digitalSpecimen?.['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')}`)}
                        >
                            <Row>
                                <Col className="pe-0">
                                    <p>See full details</p>
                                </Col>
                                <Col lg="auto"
                                    className="d-flex align-items-center ps-2"
                                >
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </Col>
                            </Row>
                        </Button>
                    </Col>
                </Row>

                {/* Loading screen if fetching data */}
                <LoadingScreen visible={fetch.loading}
                    displaySpinner={true}
                    text="Loading Digital Specimen"
                />
            </Card>
        </div>
    );
};

export default IdCard;
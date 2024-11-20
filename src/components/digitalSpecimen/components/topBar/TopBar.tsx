/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/* Import Hooks */
import { useFetch } from "app/Hooks";

/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";
import { DropdownItem } from "app/Types";

/* Import Icons */
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

/* Import API */
import GetDigitalSpecimenVersions from "api/digitalSpecimen/GetDigitalSpecimenVersions";

/* Import Components */
import { TopBarActions } from "components/elements/Elements";
import { Dropdown, Tooltip } from "components/elements/customUI/CustomUI";


/* Props type */
type Props = {
    digitalSpecimen: DigitalSpecimen,
    annotationMode: boolean,
    ToggleAnnotationSidePanel: Function
};


/**
 * Component that renders the top bar on the digital specimen page
 * @param digitalSpecimen The selected digital specimen
 * @param annotationMode Boolean that indicates if the annotation mode is toggled
 * @param ToggleAnnotationSidePanel Function to toggle the annotation side panel
 * @returns JSX Component
 */
const TopBar = (props: Props) => {
    const { digitalSpecimen, annotationMode, ToggleAnnotationSidePanel } = props;

    /* Hooks */
    const navigate = useNavigate();
    const fetch = useFetch();

    /* Base variables */
    const [digitalSpecimenVersions, setDigitalSpecimenVersions] = useState<number[] | undefined>();
    const actionDropdownItems: DropdownItem[] = [
        {
            label: 'View JSON',
            value: 'viewJson',
            action: () => ViewDigitalSpecimenJSON()
        },
        {
            label: 'Download as JSON',
            value: 'downloadAsJson',
            action: () => DownloadDigitalSpecimenAsJSON()
        }
    ];

    /* Construct version dropdown items */
    const versionDropdownItems: DropdownItem[] | undefined = digitalSpecimenVersions?.map(digitalSpecimenVersion => ({
        label: `Version ${digitalSpecimenVersion}`,
        value: `${digitalSpecimenVersion}`
    }));

    /* OnLoad: fetch digital specimen versions */
    fetch.Fetch({
        params: {
            handle: digitalSpecimen['@id'].replace(import.meta.env.VITE_DOI_URL, '')
        },
        Method: GetDigitalSpecimenVersions,
        Handler: (versions: number[]) => {
            setDigitalSpecimenVersions(versions);
        }
    });

    /**
     * Function to navigate to the digital specimen JSON view, in a new tab
     */
    const ViewDigitalSpecimenJSON = () => {
        window.open(`${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}` +
            `/api/v1/digital-specimen/${digitalSpecimen['@id'].replace(import.meta.env.VITE_DOI_URL, '')}`
        );
    };

    /**
     * Function to download a digital specimen in JSON format
     */
    const DownloadDigitalSpecimenAsJSON = () => {
        /* Parse Specimen object to JSON */
        const jsonDigitalSpecimen = JSON.stringify(digitalSpecimen);

        /* Create JSON file */
        const jsonFile = new Blob([jsonDigitalSpecimen], { type: "application/json" });

        /* Create and click on link to download file */
        const link = document.createElement("a");
        link.href = URL.createObjectURL(jsonFile);

        link.download = `${digitalSpecimen['@id'].replace(import.meta.env.VITE_DOI_URL as string, '')}_${digitalSpecimen['ods:version']}.json`;

        link.click();
    };

    return (
        <div>
            {/* Digital specimen name */}
            <Row>
                <Col>
                    <h2 className="fs-pageTitle">
                        {digitalSpecimen["ods:specimenName"]}
                    </h2>
                </Col>
            </Row>
            {/* MIDS level, version select, annotations button and actions dropdown */}
            <Row className="mt-2">
                {/* MIDS level and version select */}
                <Col lg={{ span: 3 }}>
                    <Row>
                        <Col className="d-flex align-items-center">
                            <Tooltip text="Minimum Information about a Digital Specimen"
                                placement="bottom"
                            >
                                <FontAwesomeIcon icon={faInfoCircle}
                                    className="tc-accent"
                                />
                            </Tooltip>
                            <span className="fs-3 tc-accent fw-bold ms-2">
                                {`MIDS level ${digitalSpecimen["ods:midsLevel"]}`}
                            </span>
                        </Col>
                        {versionDropdownItems &&
                            <Col lg="auto"
                                className="tourDigitalSpecimen3"
                            >
                                <Dropdown items={versionDropdownItems}
                                    selectedItem={{
                                        label: fetch.loading ? 'Loading..' : `Version ${digitalSpecimen['ods:version']}`,
                                        value: fetch.loading ? 'loading' : digitalSpecimen['ods:version'].toString()
                                    }}
                                    hasDefault={true}
                                    styles={{
                                        color: '#f1f1f3',
                                        background: '#a1d8ca',
                                        borderRadius: '999px'
                                    }}
                                    OnChange={(dropdownItem: DropdownItem) => 
                                        navigate(`/ds/${digitalSpecimen["@id"].replace(import.meta.env.VITE_DOI_URL, '')}/${dropdownItem.value}`)}
                                />
                            </Col>
                        }
                    </Row>
                </Col>
                <Col className="tourDigitalSpecimen4">
                    <TopBarActions actionDropdownItems={actionDropdownItems}
                        annotationMode={annotationMode}
                        ToggleAnnotationSidePanel={ToggleAnnotationSidePanel}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default TopBar;
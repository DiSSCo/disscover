/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";

/* Import Hooks */
import { useFetch } from "app/Hooks";

/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";
import { DropdownItem } from "app/Types";

/* Import Icons */
import { faInfoCircle, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

/* Import API */
import GetDigitalSpecimenVersions from "api/digitalSpecimen/GetDigitalSpecimenVersions";

/* Import Components */
import { Button, Dropdown, Tooltip } from "components/elements/customUI/CustomUI";


/* Props type */
type Props = {
    digitalSpecimen: DigitalSpecimen,
    ToggleAnnotationSidePanel: Function
};


/**
 * Component that renders the top bar on the digital specimen page
 * @param digitalSpecimen The selected digital specimen
 * @param ToggleAnnotationSidePanel Function to toggle the annotation side panel
 * @returns JSX Component
 */
const TopBar = (props: Props) => {
    const { digitalSpecimen, ToggleAnnotationSidePanel } = props;

    /* Hooks */
    const fetch = useFetch();

    /* Base variables */
    const [digitalSpecimenVersions, setDigitalSpecimenVersions] = useState<string[]>([]);
    const actionDropdownItems: DropdownItem[] = [
        {
            label: 'View JSON',
            value: 'viewJson',
            action: () => ViewDigitalSpecimenJson()
        },
        {
            label: 'Download as JSON',
            value: 'downloadAsJson',
            action: () => DownloadDigitalSpecimenAsJson()
        }
    ];

    /* Construct version dropdown items */
    const versionDropdownItems: DropdownItem[] = digitalSpecimenVersions?.map(digitalSpecimenVersion => ({
        label: `Version ${digitalSpecimenVersion}`,
        value: digitalSpecimenVersion
    }));

    /* OnLoad: fetch digital specimen versions */
    fetch.Fetch({
        params: {
            handle: digitalSpecimen['ods:ID'].replace(import.meta.env.VITE_DOI_URL, '')
        },
        Method: GetDigitalSpecimenVersions,
        Handler: (versions: string[]) => {
            setDigitalSpecimenVersions(versions);
        }
    });

    /**
     * Function to navigate to the digital specimen JSON view, in a new tab
     */
    const ViewDigitalSpecimenJson = () => {
        window.open(`${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}` +
            `/api/v1/specimens/${digitalSpecimen['ods:ID'].replace(import.meta.env.VITE_DOI_URL, '')}`
        );
    };

    /**
     * Function to download a digital specimen in JSON format
     */
    const DownloadDigitalSpecimenAsJson = () => {
        /* Parse Specimen object to JSON */
        const jsonDigitalSpecimen = JSON.stringify(digitalSpecimen);

        /* Create JSON file */
        const jsonFile = new Blob([jsonDigitalSpecimen], { type: "application/json" });

        /* Create and click on link to download file */
        const link = document.createElement("a");
        link.href = URL.createObjectURL(jsonFile);

        link.download = `${digitalSpecimen['ods:ID'].replace(import.meta.env.VITE_DOI_URL as string, '')}_${digitalSpecimen['ods:version']}.json`;

        link.click();
    };

    return (
        <div>
            {/* Digital specimen name */}
            <Row>
                {/* Digital specimen name */}
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
                        <Col lg="auto">
                            {!fetch.loading &&
                                <Dropdown items={versionDropdownItems}
                                    selectedItem={{
                                        label: `Version ${digitalSpecimen['ods:version']}`,
                                        value: digitalSpecimen['ods:version'].toString()
                                    }}
                                    hasDefault={true}
                                    styles={{
                                        color: '#f1f1f3',
                                        background: '#a1d8ca',
                                        borderRadius: '999px'
                                    }}
                                />
                            }
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row className="flex-row-reverse">
                        <Col lg="auto">
                            <Dropdown items={actionDropdownItems}
                                hasDefault={true}
                                placeholder="Actions"
                                styles={{
                                    color: '#f1f1f3',
                                    textColor: '#ffffff',
                                    background: '#4d59a2',
                                    borderRadius: '999px'
                                }}
                            />
                        </Col>
                        <Col lg="auto">
                            <Button type="button"
                                variant="primary"
                                OnClick={() => ToggleAnnotationSidePanel()}
                            >
                                <span>
                                    Annotate
                                    <FontAwesomeIcon icon={faPenToSquare}
                                        className="ms-2"
                                    />
                                </span>
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default TopBar;
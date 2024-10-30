/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";

/* Import Hooks */
import { useFetch } from "app/Hooks";

/* Import Types */
import { DigitalMedia } from "app/types/DigitalMedia";
import { DropdownItem } from "app/Types";

/* Import Icons */
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

/* Import API */
import GetDigitalMediaVersions from "api/digitalMedia/GetDigitalMediaVersions";

/* Import Components */
import { Button, Dropdown } from "components/elements/customUI/CustomUI";


/* Props type */
type Props = {
    digitalMedia: DigitalMedia,
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
    const { digitalMedia, annotationMode, ToggleAnnotationSidePanel } = props;

    /* Hooks */
    const fetch = useFetch();

    /* Base variables */
    const [digitalMediaVersions, setDigitalMediaVersions] = useState<string[]>([]);
    const actionDropdownItems: DropdownItem[] = [
        {
            label: 'View JSON',
            value: 'viewJson',
            action: () => ViewDigitalMediaJSON()
        },
        {
            label: 'Download as JSON',
            value: 'downloadAsJson',
            action: () => DownloadDigitalMediaAsJSON()
        }
    ];

    /* Construct version dropdown items */
    const versionDropdownItems: DropdownItem[] = digitalMediaVersions?.map(digitalMediaVersion => ({
        label: `Version ${digitalMediaVersion}`,
        value: digitalMediaVersion
    }));

    /* OnLoad: fetch digital media versions */
    fetch.Fetch({
        params: {
            handle: digitalMedia['ods:ID'].replace(import.meta.env.VITE_DOI_URL, '')
        },
        Method: GetDigitalMediaVersions,
        Handler: (versions: string[]) => {
            setDigitalMediaVersions(versions);
        }
    });

    /**
     * Function to navigate to the digital media JSON view, in a new tab
     */
    const ViewDigitalMediaJSON = () => {
        window.open(`${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}` +
            `/api/v1/digital-media/${digitalMedia['ods:ID'].replace(import.meta.env.VITE_DOI_URL, '')}`
        );
    };

    /**
     * Function to download a digital media item in JSON format
     */
    const DownloadDigitalMediaAsJSON = () => {
        /* Parse Specimen object to JSON */
        const jsonDigitalMedia = JSON.stringify(digitalMedia);

        /* Create JSON file */
        const jsonFile = new Blob([jsonDigitalMedia], { type: "application/json" });

        /* Create and click on link to download file */
        const link = document.createElement("a");
        link.href = URL.createObjectURL(jsonFile);

        link.download = `${digitalMedia['ods:ID'].replace(import.meta.env.VITE_DOI_URL as string, '')}_${digitalMedia['ods:version']}.json`;

        link.click();
    };

    return (
        <div>
            {/* Digital media identifier */}
            <Row>
                <Col>
                    <h2 className="fs-pageTitle">
                        {digitalMedia["ods:ID"].replace(import.meta.env.VITE_DOI_URL, '')}
                    </h2>
                </Col>
            </Row>
            {/* MIDS level, version select, annotations button and actions dropdown */}
            <Row className="mt-2">
                {/* MIDS level and version select */}
                <Col lg={{ span: 3 }}>
                    <Row>
                        <Col lg="auto">
                            <Dropdown items={versionDropdownItems}
                                selectedItem={{
                                    label: fetch.loading ? 'Loading..' : `Version ${digitalMedia['ods:version']}`,
                                    value: fetch.loading ? 'loading' : digitalMedia['ods:version'].toString()
                                }}
                                hasDefault={true}
                                styles={{
                                    color: '#f1f1f3',
                                    background: '#a1d8ca',
                                    borderRadius: '999px'
                                }}
                            />
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
                        <Col lg="auto"
                            className="pe-1"
                        >
                            <Button type="button"
                                variant="primary"
                                OnClick={() => ToggleAnnotationSidePanel()}
                            >
                                <span>
                                    {annotationMode ? 'Stop annotating' : 'Annotate'}
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
/* Import Dependencies */
import KeycloakService from "app/Keycloak";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/* Import Utilities */
import { RetrieveEnvVariable } from "app/Utilities";

/* Import Hooks */
import { useFetch } from "app/Hooks";

/* Import Types */
import { DigitalMedia } from "app/types/DigitalMedia";
import { DropdownItem } from "app/Types";

/* Import API */
import GetDigitalMediaVersions from "api/digitalMedia/GetDigitalMediaVersions";

/* Import Components */
import { TopBarActions } from "components/elements/Elements";
import { Button, Dropdown } from "components/elements/customUI/CustomUI";

/* Props type */
type Props = {
    digitalMedia: DigitalMedia,
    annotoriousMode: string,
    selectedTabIndex: number,
    SetAnnotoriousMode: Function
};


/**
 * Component that renders the top bar on the digital specimen page
 * @param digitalSpecimen The selected digital specimen
 * @param annotoriousMode String indicating the Annotorious mode
 * @param selectedTabIndex The index of the selected content block tab
 * @param SetAnnotoriousMode Function to set the Annotorious mode
 * @returns JSX Component
 */
const TopBar = (props: Props) => {
    const { digitalMedia, annotoriousMode, selectedTabIndex, SetAnnotoriousMode } = props;

    /* Hooks */
    const navigate = useNavigate();
    const fetch = useFetch();

    /* Base variables */
    const [digitalMediaVersions, setDigitalMediaVersions] = useState<number[] | undefined>();
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
    const versionDropdownItems: DropdownItem[] | undefined = digitalMediaVersions?.map(digitalMediaVersion => ({
        label: `Version ${digitalMediaVersion}`,
        value: `${digitalMediaVersion}`
    }));

    /* OnLoad: fetch digital media versions */
    fetch.Fetch({
        params: {
            handle: digitalMedia["@id"].replace(RetrieveEnvVariable('DOI_URL'), '')
        },
        Method: GetDigitalMediaVersions,
        Handler: (versions: number[]) => {
            setDigitalMediaVersions(versions);
        }
    });

    /**
     * Function to navigate to the digital media JSON view, in a new tab
     */
    const ViewDigitalMediaJSON = () => {
        window.open(`${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}` +
            `/api/digital-media/v1/${digitalMedia["@id"].replace(RetrieveEnvVariable('DOI_URL'), '')}`
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

        link.download = `${digitalMedia["@id"].replace(RetrieveEnvVariable('DOI_URL') as string, '')}_${digitalMedia['ods:version']}.json`;

        link.click();
    };

    return (
        <div>
            {/* Digital media identifier */}
            <Row>
                <Col>
                    <h2 className="fs-pageTitle">
                        {digitalMedia["dcterms:title"] ?? digitalMedia["@id"].replace(RetrieveEnvVariable('DOI_URL'), '')}
                    </h2>
                </Col>
            </Row>
            {/* MIDS level, version select, annotations button and actions dropdown */}
            <Row className="mt-2">
                {/* MIDS level and version select */}
                <Col lg={{ span: 3 }}>
                    <Row>
                        {versionDropdownItems &&
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
                                    OnChange={(dropdownItem: DropdownItem) =>
                                        navigate(`/dm/${digitalMedia["@id"].replace(RetrieveEnvVariable('DOI_URL'), '')}/${dropdownItem.value}`)}
                                />
                            </Col>
                        }
                    </Row>
                </Col>
                {(KeycloakService.IsLoggedIn() && !selectedTabIndex) &&
                    <Col className="d-flex justify-content-end pe-1">
                        <Button type="button"
                            variant="primary"
                            OnClick={() => SetAnnotoriousMode(annotoriousMode === 'move' ? 'draw' : 'move')}
                        >
                            <p>
                                {annotoriousMode === 'move' ? 'Visual Annotation' : 'Cancel visual annotation'}
                            </p>
                        </Button>
                    </Col>
                }
                <Col lg={(KeycloakService.IsLoggedIn() && !selectedTabIndex) && 'auto'}>
                    <TopBarActions actionDropdownItems={actionDropdownItems}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default TopBar;
/* Import dependencies */
import { RetrieveEnvVariable } from "app/Utilities";

/* Import components */
import { Button, Card } from "@radix-ui/themes";
import { DownloadIcon } from "@radix-ui/react-icons";

/* Import styling */
import './JsonViewer.scss';

/* Import types*/
import { JsonViewerData } from "types/dataMapperTypes";

/* Import utils */
import { isDigitalSpecimenJson } from "utils/Utils";

interface JsonViewerProps {
    json: JsonViewerData;
}

export const JsonViewer = ({ json }: JsonViewerProps) => {
    /* Base variables */
    const isSpecimen = isDigitalSpecimenJson(json);
    const currentMidsLevel = isSpecimen 
    ? json.attributes.digitalSpecimen['ods:midsLevel'] 
    : undefined;
    
    const version = isSpecimen 
    ? json.attributes.digitalSpecimen['ods:version'] ?? 1 
    : json.attributes['ods:version'] ?? 1;

    const totalMidsLevel = [1, 2, 3];

    const downloadJsonHandler = () => {
    const jsonData = JSON.stringify(json);
    const jsonFile = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    
    const doiUrl = RetrieveEnvVariable('DOI_URL') as string;
    const cleanId = json.id.replace(doiUrl, '');

    link.href = URL.createObjectURL(jsonFile);
    link.download = `${cleanId}_${version}.json`;
    link.click();
    };

    return (
        <section>
            <Card className="json-viewer-card">
                <Button variant="ghost" onClick={downloadJsonHandler}>
                    Download JSON
                    <DownloadIcon></DownloadIcon>
                </Button>
                {currentMidsLevel && currentMidsLevel >= 0 &&
                    <div id="mids-indicator">
                        <p>
                            MIDS level: {currentMidsLevel}
                        </p>
                        { totalMidsLevel.map((level) => {
                            return (
                                <div className={'mids-progress-dot ' + ((level === currentMidsLevel) || (level < currentMidsLevel) ? 'active' : '')} key={'mids-' + level}></div>
                            )
                        })}
                    </div>
                }

            </Card>
            <Card className="json-viewer-card">
                <pre>
                    <code>
                        {JSON.stringify(json, null, 2)}
                    </code>
                </pre>
            </Card>
        </section>
    )
}
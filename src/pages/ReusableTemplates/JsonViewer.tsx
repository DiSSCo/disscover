/* Import dependencies */
import { RetrieveEnvVariable } from "app/Utilities";

/* Import components */
import { Button, Card } from "@radix-ui/themes";
import { DownloadIcon } from "@radix-ui/react-icons";

/* Import styling */
import './JsonViewer.scss';

interface JsonViewerProps {
    json: any
}

export const JsonViewer = ({ json }: JsonViewerProps) => {
    /* Base variables */
    const currentMidsLevel = json?.attributes?.digitalSpecimen?.['ods:midsLevel'] || undefined;
    const totalMidsLevel = [1, 2, 3];

    const downloadJsonHandler = () => {
        /* Parse object to JSON */
        const jsonData = JSON.stringify(json);

        /* Create JSON file */
        const jsonFile = new Blob([jsonData], { type: "application/json" });

        /* Create and click on link to download file */
        const link = document.createElement("a");
        link.href = URL.createObjectURL(jsonFile);

        link.download = `${json["id"].replace(RetrieveEnvVariable('DOI_URL') as string, '')}_${json['ods:version'] || 1}.json`;

        link.click();
    };

    return (
        <section>
            <Card className="json-viewer-card">
                <Button variant="ghost" onClick={downloadJsonHandler}>
                    Download JSON
                    <DownloadIcon></DownloadIcon>
                </Button>
                {currentMidsLevel &&
                    <div id="mids-indicator">
                        <p>
                            MIDS level: {currentMidsLevel}
                        </p>
                        { totalMidsLevel.map((level) => {
                            return (
                                <div className={'mids-progress-dot ' + (level === currentMidsLevel ? 'active' : '')} key={'mids-' + level}></div>
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
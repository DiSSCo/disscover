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
import { downloadJsonFile, isDigitalSpecimenJson } from "utils/Utils";

interface JsonViewerProps {
    json: JsonViewerData;
}

export const JsonViewer = ({ json }: JsonViewerProps) => {
    /* Base variables */
    const isSpecimen = isDigitalSpecimenJson(json);
    const currentMidsLevel = isSpecimen 
        ? json.attributes.digitalSpecimen['ods:midsLevel'] 
        : undefined;

    /* MIDS levels range from Level 0 (Bare) up to Level 3 (Extended). */
    /* Level 0 is valid data, so we check for undefined / negative values explicitly. */
    const hasValidMidsLevel = currentMidsLevel !== undefined && currentMidsLevel >= 0;
    
    /* Set version for either Digital Specimen or Digital Media or default to 1 if no other version exist */
    const version = isSpecimen 
        ? json.attributes.digitalSpecimen['ods:version'] ?? 1 
        : json.attributes['ods:version'] ?? 1;

    /* Static array for Mids Level */
    const totalMidsLevel = [1, 2, 3];

    
    /* Determines the active class for progress dots up to and including the current level */
    const getMidsDotClass = (level: number) => {
        if (!hasValidMidsLevel) return 'mids-progress-dot';
        const isActive = level <= (currentMidsLevel as number);
        return `mids-progress-dot ${isActive ? 'active' : ''}`.trim();
    };

    const downloadJsonHandler = async () => {
        const doiUrl = RetrieveEnvVariable('DOI_URL') as string;
        const cleanId = json.id.replace(doiUrl, '');
        const filename = `${cleanId}_${version}.json`;

        await downloadJsonFile({ data: json, filename });
    };

    return (
        <section>
            <Card className="json-viewer-card">
                <Button variant="ghost" onClick={downloadJsonHandler}>
                    Download JSON
                    <DownloadIcon></DownloadIcon>
                </Button>
                {hasValidMidsLevel && (
                    <div id="mids-indicator">
                        <p>MIDS level: {currentMidsLevel}</p>
                        {totalMidsLevel.map((level) => (
                            <div 
                                key={`mids-${level}`} 
                                className={getMidsDotClass(level)} 
                            />
                        ))}
                    </div>
                )}
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
/* Import components */
import { CopyIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Card } from "@radix-ui/themes";
import { LabelValuePair } from "components/LabelValuePair/LabelValuePair";
import { OpenStreetMap } from "components/elements/customUI/CustomUI";

/* Import styles */
import './DigitalSpecimenCard.scss';

type SpecimenField = {
    label: string;
    value: any;
    type: string;
    hidden: boolean;
}

type Props = {
    cardHeader: string,
    annotate?: boolean,
    copy?: boolean,
    fragment: SpecimenField[],
    georeference?: boolean
    citation?: boolean
}

export const DigitalSpecimenCard = ({ cardHeader, annotate, copy, fragment, georeference = false, citation = false }: Props) => {
    /* Base variables */
    const getFieldValueByLabel = (labelName: string) => {
        return fragment.find((item) => item.label === labelName)?.value;
    };

    /* Craft citation based on a number of fields */
    const craftCitation = () => {
        const orgId = getFieldValueByLabel('Organisation ID');
        const orgName = getFieldValueByLabel('Organisation Name') ?? orgId;
        const digitalSpecimenId = getFieldValueByLabel('DOI') ?? getFieldValueByLabel('Digital Specimen ID');

        return (
            <>
                {orgId ? (
                    <a href={orgId} target="_blank" rel="noopener noreferrer">
                        {orgName}
                    </a>
                ) : (
                    orgName
                )}
                {` (${new Date().getFullYear()}). `}
                <a href="https://ror.org/02wddde16" target="_blank" rel="noopener noreferrer">
                    Distributed System of Scientific Collections
                </a>
                {`. [Dataset]. `}
                {digitalSpecimenId && (
                    <a href={digitalSpecimenId} target="_blank" rel="noopener noreferrer">
                        {digitalSpecimenId}
                    </a>
                )}
            </>
        );
    };

    /* Find coordinate values */
    const latitude = getFieldValueByLabel('Decimal Latitude') || getFieldValueByLabel('Latitude');
    const longitude = getFieldValueByLabel('Decimal Longitude') || getFieldValueByLabel('Longitude');

    return (
        <Card className="digital-specimen-card">
            <div className="ds-card-header">
                <h2>{cardHeader}</h2>
                { annotate &&
                    <Button variant="ghost">
                        Annotate
                        <Pencil2Icon />
                    </Button>
                }
                { copy && 
                    <Button variant="ghost">
                        Copy
                        <CopyIcon />
                    </Button>
                }
            </div>
            { georeference &&
                <div className="ds-card-georeference">
                    <OpenStreetMap latitude={latitude} longitude={longitude} />
                </div>
            }
            { citation &&
                <div className="ds-card-citation">
                    <p>{craftCitation()}</p>
                </div>
            }
            <div className="ds-card-body">
                {fragment
                    .filter((item: any) => !item.hidden)
                    .map((item: any, index: number) => (
                        <LabelValuePair 
                            key={item.label || index} 
                            item={item as { label: string; value: string; isHtml: boolean; type: string; hidden: boolean; }} 
                        />
                    ))
                }
            </div>
        </Card>
    )
}
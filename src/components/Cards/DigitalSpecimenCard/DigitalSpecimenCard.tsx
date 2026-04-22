/* Import components */
import { CopyIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Card } from "@radix-ui/themes";
import { LabelValuePair } from "components/LabelValuePair/LabelValuePair";
import { OpenStreetMap } from "components/elements/customUI/CustomUI";

/* Import styles */
import './DigitalSpecimenCard.scss';

type Props = {
    cardHeader: string,
    annotate?: boolean,
    copy?: boolean,
    fragment: any,
    georeference?: boolean
    citation?: boolean
}

export const DigitalSpecimenCard = ({ cardHeader, annotate, copy, fragment, georeference = false, citation = false }: Props) => {
    const craftCitation = (fragment: any) => {
        return (
        <>
        <a href={fragment['organisationId'].value}
            target="_blank"
            rel="noreferer"
        >
            {fragment['organisationName'].value ?? fragment['organisationId'].value}
        </a>
        {` (${new Date().getFullYear()}). `}
        <a href="https://ror.org/02wddde16"
            target="_blank"
            rel="noreferer"
        >
            Distributed System of Scientific Collections
        </a>
        {`. [Dataset]. `}
        <a href={fragment['digitalSpecimenId'].value}
            target="_blank"
            rel="noreferer"
        >
            {fragment['digitalSpecimenId'].value}
        </a>
        </>
        )
    
    }
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
                    <OpenStreetMap latitude={fragment?.['decimalLatitude'].value} longitude={fragment?.['decimalLongitude'].value} />
                </div>
            }
            { citation &&
                <div className="ds-card-citation">
                    <p>{craftCitation(fragment)}</p>
                </div>
            }
            <div className="ds-card-body">
            {Object.entries(fragment).map(([key, item]: [string, any]) => (
                <LabelValuePair key={key} item={item as { label: string; value: string; isHtml: boolean; type: string; hidden: boolean; }} />
            ))}
            </div>
        </Card>
    )
}
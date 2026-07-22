/* Import components */
import { CopyIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Card } from "@radix-ui/themes";
import { LabelValuePair } from "components/LabelValuePair/LabelValuePair";
import { OpenStreetMap } from "components/elements/customUI/CustomUI";

/* Import styles */
import './DigitalSpecimenCard.scss';

/* Import types */
import { UIProperty } from "types/dataMapperTypes";
import { useClipboard } from "hooks/useClipboard";

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
    citation?: boolean,
    AnnotateHelper?: Function
}

export const DigitalSpecimenCard = ({ cardHeader, annotate, copy: copyFunctionality, fragment, georeference = false, citation = false, AnnotateHelper }: Props) => {
    /* Base variables */
    const getFieldValueByLabel = (labelName: string) => {
        return fragment.find((item) => item.label === labelName)?.value;
    };
    const { copy, hasCopied } = useClipboard();

    /* Craft plain text citation for the copy button */
    const getCitationText = () => {
        const orgId = getFieldValueByLabel('Organisation ID');
        const orgName = getFieldValueByLabel('Organisation Name') ?? orgId ?? '';
        const digitalSpecimenId = getFieldValueByLabel('DOI') ?? getFieldValueByLabel('Digital Specimen ID') ?? '';

        return `${orgName} (${new Date().getFullYear()}). Distributed System of Scientific Collections. [Dataset]. ${digitalSpecimenId}`.trim();
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
                { annotate && AnnotateHelper &&
                    <Button variant="ghost" onClick={() => AnnotateHelper()}>
                        Annotate
                        <Pencil2Icon />
                    </Button>
                }
                { copyFunctionality && 
                    <Button variant="ghost" onClick={() => copy(getCitationText())}>
                         {hasCopied ? 'Copied!' : 'Copy'}
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
            <dl className="ds-card-body">
                {fragment
                    .filter((item: UIProperty) => !item.hidden)
                    .map((item: UIProperty, index: number) => (
                        <LabelValuePair 
                            key={item.label || index} 
                            item={item as { label: string; value: string; isHtml: boolean; type: string; hidden: boolean; }} 
                        />
                    ))
                }
            </dl>
        </Card>
    )
}
import { CopyIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Card } from "@radix-ui/themes";
import { LabelValuePair } from "components/LabelValuePair/LabelValuePair";

/* Import styles */
import './DigitalSpecimenCard.scss';

type Props = {
    cardHeader: string,
    annotate?: boolean,
    copy?: boolean,
    fragment: any
}

export const DigitalSpecimenCard = ({ cardHeader, annotate, copy, fragment }: Props) => {
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
            <div className="ds-card-body">
            {Object.entries(fragment).map(([key, item]: [string, any]) => (
                <LabelValuePair key={key} item={item as { label: string; value: string; isHtml: boolean; type: string; }} />
            ))}
            </div>
        </Card>
    )
}
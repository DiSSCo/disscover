import { CopyIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Badge, Button, Card } from "@radix-ui/themes";
import { LabelValuePair } from "components/LabelValuePair/LabelValuePair";

/* Import styles */
import './DigitalSpecimenCard.scss';

type Props = {
    cardHeader: string,
    annotate?: boolean,
    copy?: boolean,
    fragment: any,
}

export const DigitalSpecimenCard = ({ cardHeader, annotate, copy, fragment }: Props) => {
    return (
        <Card className="digital-specimen-card">
            <div className="ds-card-header">
                <div id="ds-card-header-title">
                    <h2>{cardHeader}</h2>
                    
                    <Badge variant="soft" color="grass">Verified</Badge>
                    <Badge variant="soft" color="red">Not verfied</Badge>
                </div>

                { annotate &&
                    <Button variant="ghost">
                        Annotate
                        <Pencil2Icon />
                    </Button>
                }
                { copy && 
                    <Button variant="ghost">
                        Copy citation
                        <CopyIcon />
                    </Button>
                }
            </div>      
            <div className="ds-card-body">
                {Object.entries(fragment).map(([key, item]) => (
                    <LabelValuePair key={key} item={item} />
                ))}
            </div>
        </Card>
    )
}
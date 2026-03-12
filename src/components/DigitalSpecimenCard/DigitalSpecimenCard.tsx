import { CopyIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Card } from "@radix-ui/themes";

type Props = {
    cardHeader: string,
    annotate?: boolean,
    copy?: boolean
}

export const DigitalSpecimenCard = ({ cardHeader, annotate, copy }: Props) => {
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
        </Card>
    )
}
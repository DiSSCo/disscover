/* Import dependencies */
import { ImageAnnotation } from "@annotorious/annotorious"

/* Import components */
import { Card } from "@radix-ui/themes";

/* Import utils */
import { RetrieveEnvVariable } from "app/Utilities";

/* Import styling */
import './Popups.scss';

type AnnotationDetailsProps = {
    annotation: ImageAnnotation;
}

export const AnnotationDetailsPopup = ({ annotation }: AnnotationDetailsProps) => {
    /* Base variables */
    const value = annotation.bodies?.[0]?.value || 'No value';
    const creator = annotation.bodies?.[0]?.creator?.name || 'Unknown user';
    const date = annotation.bodies[0].created?.toString() || 'Unknown date';

    return (
        <Card className="info-popup">
            <p className="info-popup-value">"{value}"</p>
            <div className="info-popup-details">
                <div>
                    <p className="info-popup-creator">{creator}</p>
                    <p className="info-popup-info">{date} - {annotation.id.replace(RetrieveEnvVariable('HANDLE_URL'), '')}</p>
                </div>
            </div>
        </Card>
    )
}
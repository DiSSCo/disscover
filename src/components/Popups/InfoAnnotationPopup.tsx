/* Import components */
import { Card } from "@radix-ui/themes";

/* Import styling */
import './InfoAnnotationPopup.scss';

/* Import dependencies */
import { RetrieveEnvVariable } from "app/Utilities";

type ImagePopupInfoProps = {
    annotation: any;
};

export const InfoAnnotationPopup = ({ annotation }: ImagePopupInfoProps) => {
    const value = annotation.bodies?.[0]?.value || 'No value';
    const creator = annotation.bodies?.[0]?.creator?.id || 'Unknown user';
    const date = annotation.bodies?.[0]?.created || 'Unknown date';

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
    );
};
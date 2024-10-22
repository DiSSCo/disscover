/* Import Dependencies */
import { Row, Col, Card } from "react-bootstrap";

/* Import Types */
import { MachineAnnotationService } from "app/types/MachineAnnotationService";


/* Props Type */
type Props = {
    MAS: MachineAnnotationService
};


/**
 * Component that renders a card for a MAS in the MAS overview
 * @returns JSX Component
 */
const MASCard = (props: Props) => {
    const { MAS } = props;

    return (
        <div>
            <Card>
                <p>{MAS["@id"]}</p>
            </Card>
        </div>
    );
};

export default MASCard;
/* Import Dependencies */
import { Row, Col, Card } from "react-bootstrap";

/* Import Types */
import { Dict } from "app/Types";


/* Props Type */
type Props = {
    masJobRecord: Dict
};


/**
 * Component that renders a card for a MAS in the MAS overview
 * @param masJobRecord The MAS job record to be rendered in the card
 * @returns JSX Component
 */
const MASJobRecordCard = (props: Props) => {
    const { masJobRecord } = props;

    return (
        <div>
            <Card className="px-3 py-2">
                <Row>
                    <Col>
                        <p className="tc-primary fw-lightBold">
                            Job ID: {masJobRecord['ods:ID']}
                        </p>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default MASJobRecordCard;
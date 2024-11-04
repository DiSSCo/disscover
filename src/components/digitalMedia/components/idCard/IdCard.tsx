/* Import Dependencies */
import jp from 'jsonpath';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Config */
import digitalMediaIdCardConfig from 'app/config/idCard/DigitalMediaIdCardConfig';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';


/* Props Type */
type Props = {
    digitalMedia: DigitalMedia
};


/**
 * Component that renders the ID card on the digital specimen page
 * @param digitalMedia The selected digital specimen
 * @returns JSX Component
 */
const IdCard = (props: Props) => {
    const { digitalMedia } = props;

    return (
        <div className="h-100 d-flex flex-column">
            {/* ID card items*/}
            <Row className="flex-grow-1 overflow-hidden">
                <Col>
                    <Card className="h-100 bgc-white px-3 py-3">
                        <div className="h-100 d-flex flex-column justify-content-between">
                            {/* ID card properties */}
                            {digitalMediaIdCardConfig({ digitalMedia }).map(idCardField => {
                                return (
                                    <Row key={idCardField.label}>
                                        {/* ID card item */}
                                        <Col className="fs-4">
                                            {/* Item label */}
                                            <p className="fw-lightBold">{idCardField.label}</p>
                                            <p className="textOverflow">{jp.query(digitalMedia, idCardField.jsonPath)}</p>
                                        </Col>
                                    </Row>
                                );
                            })}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default IdCard;
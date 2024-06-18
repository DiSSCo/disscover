/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Components */
import { InputField } from "components/elements/customUI/CustomUI";


const DOISearch = () => {
    return (
        <div>
            {/* Title */}
            <Row>
                <Col>
                    <p className="fw-lightBold">DOI</p>
                </Col>
            </Row>
            {/* DOI search field */}
            <Row className="mt-1">
                <Col>
                    <InputField name="doi"
                        placeholder="20.5000.1025/DW0-BNT-FM0"
                    />
                </Col>
            </Row>
        </div>
    );
};

export default DOISearch;
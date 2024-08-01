/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Components */
import { InputField } from "components/elements/customUI/CustomUI";


/**
 * Component that renders the search bar on the homepage
 * @returns JSX Component
 */
const SearchBar = () => {
    return (
        <div>
            {/* Title */}
            <Row>
                <Col>
                    <p className="fw-bold">Search Digital Specimens</p>
                </Col>
            </Row>
            {/* Query bar */}
            <Row className="mt-2">
                <Col>
                    <InputField name="query"
                        placeholder="Bellis perennis"
                    />
                </Col>
            </Row>
        </div>
    );
};

export default SearchBar;
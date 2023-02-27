/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';


const SearchFilters = () => {
    return (
        <Row>
            <Col className="px-4 py-2">
                <Row>
                    <Col>
                        Filters
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input className="w-100" />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default SearchFilters;
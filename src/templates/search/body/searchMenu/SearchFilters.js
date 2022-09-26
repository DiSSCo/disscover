import { Row, Col } from 'react-bootstrap';


const SearchFilters = () => {
    return (
        <Row>
            <Col className="px-4 py-2">
                <Row>
                    <Col className="search_filterMenuTitle">
                        Filters
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input className="search_filterMenuFilter" />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default SearchFilters;
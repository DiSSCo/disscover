import {Row, Col} from 'react-bootstrap';

function DefaultTableRow() {
    return (
        <Row className="search_tableRow">
            <Col md="12">
                No specimens were found
            </Col>
        </Row>
    );
}

export default DefaultTableRow;
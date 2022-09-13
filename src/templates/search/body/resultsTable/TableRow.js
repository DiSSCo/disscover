import {Row, Col} from 'react-bootstrap';

function TableRow(props) {
    const specimen = props.specimen['ods:authoritative'];
    const position = props.position;
    let index;

    /* Check if index is even or odd */
    if (position % 2 == 0) {
        index = 'even';
    } else {
        index = 'odd'
    }

    return (
        <Row className={["search_tableRow", index]} onClick={() => props.onClick(position)}>
            <Col md="3">
                {specimen['ods:name']}
            </Col>
            <Col md="3">
                Country
            </Col>
            <Col md="3">
                Basis of Record
            </Col>
            <Col md="3">
                {specimen['ods:institution']}
            </Col>
        </Row>
    );
}

export default TableRow;
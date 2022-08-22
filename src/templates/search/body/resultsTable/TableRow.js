import {Row, Col} from 'react-bootstrap';


function TableRow(props) {
    const specimen = props.specimen['ods:authoritative'];
    const position = props.position;
    let index;

    return (
        <Row key={specimen['auth']['ods:physicalSpecimenId']} className={["search_tableRow"]} onClick={() => props.onClick(position)}>
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
import { Container, Row, Col } from 'react-bootstrap';
import "./body.css";

/* Fontawesome icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrog } from '@fortawesome/free-solid-svg-icons'

const Body = (props) => {
    const specimen = props.specimen['ods:authoritative'];

    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 6, offset: 1 }}>
                    <Row>
                        <Col md={{ span: 10 }} className="specimen_rightTitleBlock">
                            <Row>
                                <Col md={{ span: 1 }} className="specimen_basisOfRecordSymbolBlock">
                                    <i className="icon">
                                        <FontAwesomeIcon icon={faFrog} className="specimen_basisOfRecordSymbol" />
                                    </i>
                                </Col>
                                <Col md={{ span: 11 }} className="specimen_titleBlock">
                                    <h2 className="specimen_title"> {specimen['ods:name']} </h2>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={{ span: 10 }} className="specimen_rightContentBlock">
                            <Row>
                                <Col md={{ span: 3 }} className="specimen_detailTitleBlock">
                                    <Row>
                                        <Col md={{ span: 10, offset: 1 }}>
                                            <p> Institution: </p>
                                            <p> Specimen type: </p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={{ span: 9 }} className="specimen_detailContentBlock">
                                    <Row>
                                        <Col md={{ span: 12 }}>
                                            <p> {specimen['ods:institutionCode']} </p>
                                            <p> {specimen['ods:materialType']} </p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={{ span: 10 }} className="folder" />
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Body;
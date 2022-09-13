import { Row, Col } from 'react-bootstrap';


const RecentAnnotations = () => {
    return (
        <Row className="px-2"> 
            <Col>
                <Row>
                    <Col md={{ span: 10 }} className="recentAnnotation my-2">
                        <Row>
                            <Col>
                                Spinosaurus Aegyptiacus
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Skeeto annotated on Specimen Type, Invalid Value
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 10 }} className="recentAnnotation my-2">
                        <Row>
                            <Col>
                                Dracorex Hogwartsia
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Skeeto annotated on Specimen Type, Invalid Value
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 10 }} className="recentAnnotation my-2">
                        <Row>
                            <Col>
                                Diploceraspis Conemaughensis
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Skeeto annotated on Specimen Type, Invalid Value
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default RecentAnnotations;
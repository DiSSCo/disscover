import { Row, Col } from 'react-bootstrap';

/* Temporary dummy image */
import Graph from 'webroot/img/graph.png';


const UserStatistics = () => {
    return (
        <Row>
            <Col>
                <Row>
                    <Col md={{ span: 3 }}>
                        <Row>
                            <Col md={{ span: 10, offset: 1 }} className="profile_userStatistic d-flex justify-content-center">
                                <img src={Graph} className="profile_testGraph" />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={{ span: 3 }}>
                        <Row>
                            <Col md={{ span: 10, offset: 1 }} className="profile_userStatistic d-flex justify-content-center">
                                <img src={Graph} className="profile_testGraph" />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={{ span: 3 }}>
                        <Row>
                            <Col md={{ span: 10, offset: 1 }} className="profile_userStatistic d-flex justify-content-center">
                                <img src={Graph} className="profile_testGraph" />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={{ span: 3 }}>
                        <Row>
                            <Col md={{ span: 10, offset: 1 }} className="profile_userStatistic d-flex justify-content-center">
                                <img src={Graph} className="profile_testGraph" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default UserStatistics;
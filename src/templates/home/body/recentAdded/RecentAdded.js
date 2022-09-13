import { Row, Col } from 'react-bootstrap';

/* Import icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';


const RecentAdded = () => {
    return (
        <Row className="px-2">
            <Col>
                <Row>
                    <Col md={{ span: 10 }} className="recentAddedSpecimen my-2 position-relative">
                        <Row>
                            <Col>
                                13-05-2022
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Spinosaurus Aegyptiacus
                            </Col>
                        </Row>

                        <FontAwesomeIcon icon={faBug} className="recentAddedSpecimenIcon" />
                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 10 }} className="recentAddedSpecimen my-2 position-relative">
                        <Row>
                            <Col>
                                20-06-2022
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Dracorex Hogwartsia
                            </Col>
                        </Row>

                        <FontAwesomeIcon icon={faBug} className="recentAddedSpecimenIcon" />
                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 10 }} className="recentAddedSpecimen my-2 position-relative">
                        <Row>
                            <Col>
                                31-07-2022
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Diploceraspis Conemaughensis
                            </Col>
                        </Row>

                        <FontAwesomeIcon icon={faBug} className="recentAddedSpecimenIcon" />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default RecentAdded;
import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


const Mids = () => {
    return (
        <Row className="mt-5">
            <Col md={{ span: 12 }}>
                <Row>
                    <Col md={{ span: 5 }} className="mt-5">
                        <Row>
                            <Col className="home_mainTitle">
                                Minimum Information about a <br /> Digital Specimen
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="home_introText">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={{ span: 12 }}>
                        <Row>
                            <Col md={{ span: 3 }}>
                                <Row>
                                    <Col md={{ span: 10 }}>
                                        <div className="home_midsBlock">
                                            <div className="home_midsTitleBlock py-2">
                                                MIDS level 0
                                            </div>
                                            <div className="home_midsContentBlock px-4 py-3">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={{ span: 2 }} className="home_midsArrows">
                                        <FontAwesomeIcon icon={faChevronRight} className="home_midsArrowLeft" />
                                        <FontAwesomeIcon icon={faChevronRight} className="home_midsArrowRight" />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={{ span: 3 }}>
                                <Row>
                                    <Col md={{ span: 10 }}>
                                        <div className="home_midsBlock">
                                            <div className="home_midsTitleBlock py-2">
                                                MIDS level 1
                                            </div>
                                            <div className="home_midsContentBlock px-4 py-3">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={{ span: 2 }} className="home_midsArrows">
                                        <FontAwesomeIcon icon={faChevronRight} className="home_midsArrowLeft" />
                                        <FontAwesomeIcon icon={faChevronRight} className="home_midsArrowRight" />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={{ span: 3 }}>
                                <Row>
                                    <Col md={{ span: 10 }}>
                                        <div className="home_midsBlock">
                                            <div className="home_midsTitleBlock py-2">
                                                MIDS level 2
                                            </div>
                                            <div className="home_midsContentBlock px-4 py-3">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={{ span: 2 }} className="home_midsArrows">
                                        <FontAwesomeIcon icon={faChevronRight} className="home_midsArrowLeft" />
                                        <FontAwesomeIcon icon={faChevronRight} className="home_midsArrowRight" />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={{ span: 3 }}>
                                <Row>
                                    <Col md={{ span: 10 }}>
                                        <div className="home_midsBlock">
                                            <div className="home_midsTitleBlock py-2">
                                                MIDS level 3
                                            </div>
                                            <div className="home_midsContentBlock px-4 py-3">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Mids;
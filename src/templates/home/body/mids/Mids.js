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
                            Minimum Information about a Digital Specimen (MIDS) is a specification defining the information elements expected to be present when publishing digitised specimen information at various levels of digitisation. Digital Specimens are online digital representations of their physical counterparts in natural science collections. The definition of digitisation used here is the process of making physical objects digitally available. Levels of digitisation represent a simple categorisation of the type and depth of digitisation achieved by different approaches.
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
/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


const Mids = () => {
    const midsLevels = [0, 1, 2, 3];

    return (
        <Row className="mt-5">
            <Col md={{ span: 12 }}>
                <Row>
                    <Col md={{ span: 5 }} className="mt-5">
                        <Row>
                            <Col className="home_mainTitle">
                                <h4>
                                    Minimum Information about a <br /> Digital Specimen
                                </h4>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="home_introText">
                                Minimum Information about a Digital Specimen (MIDS) is a specification defining the information elements 
                                expected to be present when publishing digitised specimen information at various levels of digitisation. 
                                Digital Specimens are online digital representations of their physical counterparts in natural science collections. 
                                The definition of digitisation used here is the process of making physical objects digitally available. Levels of 
                                digitisation represent a simple categorisation of the type and depth of digitisation achieved by different approaches.
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={{ span: 12 }}>
                        <Row>
                            {midsLevels.map((level, i) => {
                                return (
                                    <Col md={{ span: 3 }} key={i}>
                                        <Row>
                                            <Col md={{ span: 10 }}>
                                                <div>
                                                    <div className="home_midsTitleBlock py-2 bg-primary-dark fw-bold text-white text-center">
                                                        MIDS level {level}
                                                    </div>
                                                    <div className="px-4 py-3 br-bl br-br border-2-primary-dark">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                                                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                                                        aliquip ex ea commodo consequat.
                                                    </div>
                                                </div>
                                            </Col>
                                            {level < 3 &&
                                                <Col md={{ span: 2 }} className="home_midsArrows text-center mt-auto mb-auto">
                                                    <FontAwesomeIcon icon={faChevronRight} className="c-primary-dark" />
                                                    <FontAwesomeIcon icon={faChevronRight} className="c-primary" />
                                                </Col>
                                            }
                                        </Row>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Mids;
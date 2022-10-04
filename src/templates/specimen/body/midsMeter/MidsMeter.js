import { Row, Col } from 'react-bootstrap';

/* Import Components */
import MidsDetails from './MidsDetails';

/* Fontawesome icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'


const MidsMeter = (props) => {
    const specimen = props.specimen;
    const midsDetailsVisibility = props.midsDetailsVisibility;
    const scrollToMids = props.scrollToMids;

    return (
        <Row>
            <Col>
                <Row>
                    <Col md={{ span: 12 }} className="specimen_midsMeterBlock py-4">
                        <Row>
                            <Col md={{ span: 8, offset: 1 }}>
                                Completion level (MIDS)
                            </Col>
                            <Col md={{ span: 2 }} className="specimen_midsMeterTitleRight">
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    onClick={() => props.ToggleMidsDetails()}
                                    className={"specimen_midsMeterChevronDown " + midsDetailsVisibility}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 10, offset: 1 }} className="specimen_midsMeterBar">
                                Lv {specimen['Meta']['midsLevel']['value']}.
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <MidsDetails
                        visibility={midsDetailsVisibility}
                        specimen={specimen}
                        scrollToMids={scrollToMids}
                    />
                </Row>
            </Col>



        </Row>
    );
}

export default MidsMeter;
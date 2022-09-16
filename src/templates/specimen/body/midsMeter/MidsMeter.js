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
            <Col md={{ span: 12 }} className="specimen_midsMeterBlock py-4">
                <Row>
                    <Col md={{ span: 8, offset: 1 }}>
                        Completion level (MIDS)
                    </Col>
                    <Col md={{ span: 2 }} className="annotate_midsMeterTitleRight">
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            onClick={() => props.ToggleMidsDetails()}
                            className={"annotate_midsMeterChevronDown " + midsDetailsVisibility}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 10, offset: 1 }} className="annotate_midsMeterBar">
                        Lv {specimen['Meta']['midsLevel']['value']}.
                    </Col>
                </Row>
            </Col>

            <MidsDetails
                visibility={midsDetailsVisibility}
                specimen={specimen}
                scrollToMids={scrollToMids}
            />
        </Row>
    );
}

export default MidsMeter;
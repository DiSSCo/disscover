import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

/* Fontawesome icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'


const MidsMeter = (props) => {
    const specimen = props.specimen;

    return (
        <Row>
            <Col md={{ span: 12 }} className="specimen_midsMeterBlock py-4">
                <Row>
                    <Col md={{ span: 7, offset: 1 }} className="specimen_midsMeterTitle">
                        Completion level (MIDS)
                    </Col>
                    <Col md={{ span: 3 }} className="specimen_midsMeterTitleRight">
                        <Link to={'/annotate/' + specimen['Specimen']['physicalSpecimenId']['value']} state={{ specimen: specimen, mode: 'annotate', mids: true }}>
                            Details
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 10, offset: 1 }} className="specimen_midsMeterBar mt-2">
                        Lv {specimen['Meta']['midsLevel']['value']}.
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default MidsMeter;
import { useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


const MidsDetailsProperty = (props) => {
    const specimenProperty = props.specimenProperty;
    const property = props.property;
    const scrollToMids = props.scrollToMids;

    const midsRef = useRef(null);

    useEffect(() => {
        if (scrollToMids === 'midsHandle_' + property) {
            props.ScrollMids(midsRef);
        }
    });

    return (
        <Row className="py-1" ref={midsRef}>
            <Col md={{ span: 12 }} id={'midsHandle_' + property}>
                <Row>
                    <Col md={{ span: 6 }} className="textOverflow">
                        {specimenProperty['displayName']}
                    </Col>
                    <Col md={{ span: 3 }} className="specimen_midsDetailsIndication">
                        MIDS {specimenProperty['mids']['level']}
                    </Col>
                    <Col md={{ span: 3 }}>
                        Details
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default MidsDetailsProperty;
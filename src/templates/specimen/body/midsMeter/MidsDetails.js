import { useRef } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Components */
import MidsDetailsRow from './MidsDetailsRow';


const MidsDetails = (props) => {
    const visibility = props.visibility;
    const specimen = props.specimen;

    const scrollMidsContainerRef = useRef(null);
    const scrollToMids = props.scrollToMids;

    function ScrollMids(ref) {
        scrollMidsContainerRef.current.scrollTop = ref.current.offsetTop;
    }

    return (
        <Col md={{ span: 12 }} className="position-relative">
            <div className={"position-absolute specimen_midsDetailsBlock w-100 overflow-hidden " + visibility}>
                <Row className="h-100 m-3">
                    <Col md={{ span: 12 }} className="h-100">
                        <Row>
                            <Col md={{ span: 12 }} className="specimen_midsDetailsBlockTitle">
                                MIDS indications
                            </Col>
                        </Row>
                        <Row className="h-100">
                            <Col md={{ span: 12 }} className="specimen_midsDetailsSections overflow-scroll position-relative" ref={scrollMidsContainerRef}>
                                {Object.keys(specimen).map((key, _i) => {
                                    return (
                                        <MidsDetailsRow
                                            key={key}
                                            specimenGroup={specimen[key]}
                                            group={key}
                                            scrollToMids={scrollToMids}

                                            ScrollMids={(ref) => ScrollMids(ref)}
                                        />
                                    );
                                })}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Col>
    );
}

export default MidsDetails;
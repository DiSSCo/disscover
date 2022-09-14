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
        <Col md={{ span: 7 }} className="annotate_midsDetails">
            <div className={"position-absolute annotate_midsDetailsBlock " + visibility}>
                <Row className="h-100 m-3">
                    <Col md={{ span: 12 }} className="h-100">
                        <Row>
                            <Col md={{ span: 12 }} className="annotate_midsDetailsBlockTitle">
                                MIDS indications
                            </Col>
                        </Row>
                        <Row className="h-100">
                            <Col md={{ span: 12 }} className="annotate_midsDetailsSections" ref={scrollMidsContainerRef}>
                                {Object.keys(specimen).map((key, _i) => {
                                    return (
                                        <MidsDetailsRow
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
import React from "react";
import { Row, Col } from 'react-bootstrap';

function SampleOccurrence() {
    return (
        <Col md="4" className="sampleOccurence">
            <Row>
                <img className="sampleOccurenceImage" src="https://www.teunstuinposters.nl/site/tuinposters/96/zoom/tuinposter_kikker.jpg" />
            </Row>
            <Row>
                <Col>
                    <div className="sampleOccurenceName">
                        Frogger
                    </div>
                </Col>
            </Row>
        </Col>
    );
}

export default SampleOccurrence;
import React from "react";
import { Row, Col } from 'react-bootstrap';

function SampleSpecimen() {
    return (
        <Col md="4" className="sampleSpecimen">
            <Row>
                <img className="sampleSpecimenImage" src="https://www.teunstuinposters.nl/site/tuinposters/96/zoom/tuinposter_kikker.jpg" />
            </Row>
            <Row>
                <Col>
                    <div className="sampleSpecimenName">
                        Frogger
                    </div>
                </Col>
            </Row>
        </Col>
    );
}

export default SampleSpecimen;
import React from "react";
import { Row, Col } from 'react-bootstrap';

function SampleSpecimen() {
    return (
        <Col md="4" className="sampleSpecimen">
            <Row>
                <img className="sampleSpecimenImage" src="https://medialib.naturalis.nl/file/id/RGM.1332243_1/format/large" />
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
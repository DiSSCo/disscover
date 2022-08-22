import React from "react";
import { Row, Col } from 'react-bootstrap';

function SampleSpecimen() {
    return (
        <Col md="4" className="sampleSpecimen">
            <Row>
                <img className="sampleSpecimenImage"
                    src="https://api.gbif.org/v1/image/unsafe/fit-in/500x/http%3A%2F%2Fn2t.net%2Fark%3A%2F65665%2Fm356c5f382-f218-400f-8503-91d4dff71b1f"
                    alt="Example specimen"
                />
            </Row>
            <Row>
                <Col>
                    <div className="sampleSpecimenName">
                        Smilodon
                    </div>
                </Col>
            </Row>
        </Col>
    );
}

export default SampleSpecimen;
import React from "react";
import { Row, Col } from 'react-bootstrap';

function SampleSpecimen() {
    return (
        <Col md="3" className="sampleSpecimen">
            <Row>
                <Col md={{ span: 12 }}>
                    <div className="w-100 position-relative">
                        <img className="sampleSpecimenImage w-100"
                            src="https://api.gbif.org/v1/image/unsafe/fit-in/500x/http%3A%2F%2Fn2t.net%2Fark%3A%2F65665%2Fm356c5f382-f218-400f-8503-91d4dff71b1f"
                            alt="Example specimen"
                        />

                        <div className="sampleSpecimenInfo">
                            Smilodon Populator
                            <br />
                            <button type="button" className="sampleSpecimenButton mt-3">
                                Go to Specimen
                            </button>
                        </div>
                    </div>

                </Col>
            </Row>
        </Col>
    );
}

export default SampleSpecimen;
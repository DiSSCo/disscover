import { useEffect, useState } from "react";
import { Row, Col } from 'react-bootstrap';

/* Import API */
import GetDigitalMedias from "api/digitalMedia/getDigitalMedias";


function SampleSpecimen() {
    const [digitalMedia, setDigitalMedia] = useState();

    useEffect(() => {
        GetDigitalMedias(Process);

        function Process(result) {
            setDigitalMedia(result);
        }
    }, []);

    if (digitalMedia) {
        return (
            <Row className="mt-3 mb-3">
                <Col>
                    <div className="home_mediaSliderBlock">
                        <div className="home_mediaSlider">
                            {digitalMedia.map((mediaItem, i) => {
                                return (
                                    <div key={i} className="home_mediaSliderItem mx-3">
                                        <Row className="h-25 align-items-center justify-content-center">
                                            <Col className="home_mediaItemTitle col-md-auto my-2 mx-2">
                                                {mediaItem['specimen']['specimenName']}
                                            </Col>
                                        </Row>

                                        <img src={mediaItem['mediaUrl']} className="home_mediaItem position-absolute w-100 h-75" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default SampleSpecimen
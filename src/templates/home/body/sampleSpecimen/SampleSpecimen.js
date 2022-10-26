import { useEffect, useState } from "react";
import { Row, Col } from 'react-bootstrap';

/* Import API */
import GetDigitalMedias from "api/digitalMedia/getDigitalMedias";


function SampleSpecimen() {
    const [digitalMedia, setDigitalMedia] = useState([]);

    useEffect(() => {
        GetDigitalMedias(Process);

        function Process(result) {
            setDigitalMedia(result);
        }
    }, []);

    const [imageHover, setImageHover] = useState({});

    function ToggleImageHover(i, toggle) {
        let copyImageHover = { ...imageHover };

        if (!toggle) {
            delete copyImageHover[i];
        } else if (Object.keys(imageHover).length >= 1 || toggle) {
            copyImageHover = { [i]: 'active' };
        }

        setImageHover(copyImageHover);
    }

    if (digitalMedia.length > 0) {
        return (
            <div className="home_thematicSectionBackground">
                <Row>
                    <Col md={{ span: 12 }}>
                        <Row>
                            {digitalMedia.slice(0, 6).map((media, i) => {
                                return (
                                    <Col key={i} md={{ span: 2 }}
                                        className="p-0 home_sampleSpecimenImageSection position-relative"
                                        onMouseEnter={() => ToggleImageHover(i, true)}
                                        onMouseLeave={() => ToggleImageHover(i, false)}
                                    >
                                        <div className={`home_sampleSpecimenImageCover position-absolute ${imageHover[i]}`}>
                                            Specimen
                                        </div>

                                        <img src={media['mediaUrl']}
                                            className={`home_sampleSpecimenImage ${imageHover[i]}`}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>

                        <Row>
                            <Col md={{ span: 1 }} className="home_sampleSpecimenFiller" />

                            {digitalMedia.slice(5, 10).map((media, i) => {
                                i += 6;

                                return (
                                    <Col key={i} md={{ span: 2 }}
                                        className="p-0 home_sampleSpecimenImageSection position-relative"
                                        onMouseEnter={() => ToggleImageHover(i, true)}
                                        onMouseLeave={() => ToggleImageHover(i, false)}
                                    >
                                        <div className={`home_sampleSpecimenImageCover position-absolute ${imageHover[i]}`}>
                                            Specimen
                                        </div>

                                        <img src={media['mediaUrl']}
                                            className={`home_sampleSpecimenImage ${imageHover[i]}`}
                                        />
                                    </Col>
                                );
                            })}

                            <Col md={{ span: 1 }} className="home_sampleSpecimenFiller" />
                        </Row>

                        <Row>
                            {digitalMedia.slice(10, 16).map((media, i) => {
                                i += 11;

                                return (
                                    <Col key={i} md={{ span: 2 }}
                                        className="p-0 home_sampleSpecimenImageSection position-relative"
                                        onMouseEnter={() => ToggleImageHover(i, true)}
                                        onMouseLeave={() => ToggleImageHover(i, false)}
                                    >
                                        <div className={`home_sampleSpecimenImageCover position-absolute ${imageHover[i]}`}>
                                            Specimen
                                        </div>

                                        <img src={media['mediaUrl']}
                                            className={`home_sampleSpecimenImage ${imageHover[i]}`}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                </Row >
            </div >
        );
    }
}

export default SampleSpecimen;
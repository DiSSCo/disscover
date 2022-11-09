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

    function RenderImageBlocks(range) {
        let imageBlockView = [];

        for (let i in digitalMedia.slice(range[0], range[1])) {
            const index = parseInt(i) + range[0];
            const media = digitalMedia[index];

            imageBlockView.push(
                <Col key={i} md={{ span: 2 }}
                    className="p-0 home_sampleSpecimenImageSection position-relative"
                    onMouseEnter={() => ToggleImageHover(index, true)}
                    onMouseLeave={() => ToggleImageHover(index, false)}
                >
                    <div className={`home_sampleSpecimenImageCover bg-white text-center position-absolute ${imageHover[index]}`}>
                        Specimen
                    </div>

                    <img src={media['mediaUrl']}
                        className={`home_sampleSpecimenImage w-100 ${imageHover[index]}`}
                    />
                </Col>
            );
        }

        return imageBlockView;
    }

    if (digitalMedia.length > 0) {
        return (
            <Row className="mt-5 position-relative">
                <Col md={{ span: 12 }} className="mt-5">
                    <Row className="mt-4">
                        <Col>
                            <div className="home_fullWidthBackground bg-backdrop">
                                <Row>
                                    <Col md={{ span: 12 }}>
                                        <Row>
                                            {RenderImageBlocks([0, 6])}
                                        </Row>

                                        <Row>
                                            <Col md={{ span: 1 }} className="home_sampleSpecimenFiller bg-backdrop" />

                                            {RenderImageBlocks([6, 11])}

                                            <Col md={{ span: 1 }} className="home_sampleSpecimenFiller bg-backdrop" />
                                        </Row>

                                        <Row>
                                            {RenderImageBlocks([11, 17])}
                                        </Row>
                                    </Col>
                                </Row >
                            </div >
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default SampleSpecimen;
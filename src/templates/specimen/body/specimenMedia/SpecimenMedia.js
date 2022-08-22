import { Row, Col } from 'react-bootstrap';


const SpecimenImages = (props) => {
    let specimenImages = props.specimenImages;

    if (typeof (specimenImages) == 'string') {
        specimenImages = [specimenImages];
    }

    return (
        <Row className="specimen_mediaGallery">
            <Col md={{span: 11}} className="specimen_mediaGalleryTitleBlock">
                <Row>
                    <Col className="col-md-auto specimen_mediaGalleryTitle">
                        Media gallery
                    </Col>
                </Row>
            </Col>
            <Col md={{ span: 11 }} className="specimen_mediaGalleryContent">
                <div className="specimen_mediaSlider">
                    {specimenImages.map((img, i) =>
                            <img className="specimen_media"
                                src={img}
                                alt={'Specimen ' + i}
                            />
                    )}

                    <img className="specimen_media" src="https://medialib.naturalis.nl/file/id/RGM.1332243_1/format/large" alt='Test' />
                    <img className="specimen_media" src="https://medialib.naturalis.nl/file/id/RGM.1332243_1/format/large" alt='Test' />
                    <img className="specimen_media" src="https://medialib.naturalis.nl/file/id/RGM.1332243_1/format/large" alt='Test' />
                    <img className="specimen_media" src="https://medialib.naturalis.nl/file/id/RGM.1332243_1/format/large" alt='Test' />
                </div>
            </Col>
        </Row>
    );
}

export default SpecimenImages;
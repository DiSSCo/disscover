import { Row, Col } from 'react-bootstrap';


const SpecimenMedia = (props) => {
    let specimenMedia = props.specimenMedia;

    return (
        <Row>
            <Col md={{ span: 12 }} className="specimen_mediaGalleryTitleBlock mt-4">
                <Row>
                    <Col className="col-md-auto specimen_mediaGalleryTitle">
                        Media gallery
                    </Col>
                </Row>
            </Col>
            <Col md={{ span: 12 }} className="specimen_mediaGalleryContent">
                <div className="specimen_mediaSlider">
                    <Row>
                        {(specimenMedia.length > 0) ? specimenMedia.map((mediaItem, i) => {
                            return (
                                <Col className="col-md-auto">
                                    <div className="w-100 position-relative">
                                        <img className="specimen_media"
                                            src={mediaItem['mediaUrl']}
                                            alt={'Specimen ' + i}
                                        />

                                        <div className="specimen_mediaCover p-5">
                                            Media Cover
                                            <br />
                                            Click for more information
                                        </div>
                                    </div>
                                </Col>
                            );
                        })
                            : <Row>
                                <Col className="mx-3 my-2">
                                    No media yet
                                </Col>
                            </Row>
                        }
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default SpecimenMedia;
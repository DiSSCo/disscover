import { Row, Col } from 'react-bootstrap';


const SpecimenMedia = (props) => {
    let specimenMedia = props.specimenMedia;

    return (
        <Row>
            <Col md={{ span: 12 }} className="specimen_mediaGalleryTitleBlock border-b-1-primary-dark mt-4">
                <Row>
                    <Col className="specimen_mediaGalleryTitle col-md-auto bg-white fw-bold border-l-2-primary-dark
                        border-t-2-primary-dark border-r-2-primary-dark br-tl br-tr"
                    >
                        Media gallery
                    </Col>
                </Row>
            </Col>
            <Col md={{ span: 12 }} className="specimen_mediaGalleryContent overflow-scroll p-0">
                <div className="specimen_mediaSlider">
                    <Row>
                        {(specimenMedia.length > 0) ? specimenMedia.map((mediaItem, i) => {
                            return (
                                <Col className="col-md-auto">
                                    <div className="w-100 position-relative d-inline-block">
                                        <img className="specimen_media m-0 border-l-2-primary-dark"
                                            src={mediaItem['mediaUrl']}
                                            alt={'Specimen ' + i}
                                        />

                                        <div className="specimen_mediaCover p-5 position-absolute w-100 h-100 fw-bold text-white text-center">
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
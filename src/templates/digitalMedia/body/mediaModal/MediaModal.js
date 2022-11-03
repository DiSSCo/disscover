import { useState } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';

/* Import Components */
import ImageAnnotate from './ImageAnnotate';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';


const MediaModal = (props) => {
    const digitalMediaItem = props.digitalMediaItem;
    const mediaModalToggle = props.mediaModalToggle;

    const [annotations, setAnnotations] = useState([]);

    return (
        <Modal show={mediaModalToggle} size="xl" className="digitalMedia_modal">
            <Row className="h-100 justify-content-center">
                <Col className="h-100">
                    <Row className="h-100">
                        <Col md={{ span: 10 }} className="bg-white pe-0 h-100 position-relative">
                            <ImageAnnotate digitalMediaItem={digitalMediaItem}
                                annotations={annotations}

                                SetAnnotations={(annotations) => setAnnotations(annotations)}
                            />

                            <Col className="position-absolute end-0 top-0 me-3 mt-2">
                                <FontAwesomeIcon icon={faX}
                                    className="digitalMedia_modalCloseButton"
                                    onClick={() => props.ToggleMediaModal()}
                                />
                            </Col>
                        </Col>
                        <Col md={{ span: 2 }} className="digitalMedia_modalMenu bg-backdrop h-100 end-0">
                            <Row>
                                <Col className="digitalMedia_modalMenuTitle text-white fw-bold ps-4 bg-primary-blue">
                                    Image Annotation
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                   
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Modal>
    );
}

export default MediaModal;
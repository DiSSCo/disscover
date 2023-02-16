/* Import Dependencies */
import { useState } from 'react';
import { Annotation, IAnnotation } from 'react-mark-image';
import { Row, Col, Modal } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMedia } from 'redux/digitalMedia/DigitalMediaSlice';
import { getDigitalMediaAnnotations } from 'redux/digitalMedia/DigitalMediaSlice';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    observationModalToggle: boolean,
    ToggleObservationModal: Function
};


const ObservationModal = (props: Props) => {
    const { observationModalToggle, ToggleObservationModal } = props;

    /* Base Variables */
    const digitalMedia = useAppSelector(getDigitalMedia);
    const digitalMediaAnnotations = useAppSelector(getDigitalMediaAnnotations);

    /* Functionality for handling new, changed or removed Observation Annotations */
    const [observationAnnotations, setObservationAnnotations] = useState<IAnnotation[]>(
        []
        // TODO: implement DB annotations: digitalMediaAnnotations.observation ? digitalMediaAnnotations.observation : []
    );

    return (
        <Modal show={observationModalToggle} size="xl" className="digitalMedia_modal">
            <Row className="h-100 justify-content-center">
                <Col className="h-100">
                    <Row className="h-100">
                        <Col md={{ span: 10 }} className="bg-white pe-0 h-100 position-relative">
                            <Annotation
                                src={digitalMedia.mediaUrl}
                                alt={digitalMedia.id}
                                onAnnotationsUpdate={(annotations) => setObservationAnnotations(annotations)}
                                annotations={observationAnnotations}
                                // TODO: implement DB annotations: annotations={observationAnnotations}
                                className="h-100"
                            />

                            <Col className="position-absolute end-0 top-0 me-3 mt-2">
                                <FontAwesomeIcon icon={faX}
                                    className="digitalMedia_modalCloseButton"
                                    onClick={() => ToggleObservationModal()}
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

export default ObservationModal;
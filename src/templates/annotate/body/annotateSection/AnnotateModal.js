import { useState } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';

/* Fontawesome icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPencil, faSave, faXmark, faTrash } from '@fortawesome/free-solid-svg-icons'


const AnnotateModal = (props) => {
    const modalToggle = props.modalToggle;
    const modalAnnotations = props.modalAnnotations;
    const modalProperty = props.modalProperty;
    const annotationInput = props.annotationInput;
    const editMode = props.editMode;

    const [editHover, setEditHover] = useState();

    function IsHover(toggle, propertyKey) {
        if (toggle) {
            setEditHover(propertyKey);
        } else {
            setEditHover('');
        }
    }

    return (
        <Modal show={modalToggle} className="annotate_modal">
            <Modal.Header className="annotate_modalHeader">
                <Modal.Title className="annotate_modalHeaderTitle">
                    {modalProperty['displayName']}
                </Modal.Title>

                <button type="button" onClick={() => props.ToggleModal()} className="annotate_modalHeaderButton">
                    Dismiss
                </button>
            </Modal.Header>

            <Modal.Body className="annotate_modalBody">
                <Row>
                    <Col md={{ span: 12 }}>
                        <p> <span className="annotate_modalValueTitle"> Current value: </span> {modalProperty['currentValue']} </p>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6 }}>
                        Discussion
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 12 }}>
                        {modalAnnotations ? Object.keys(modalAnnotations).map((key, _i) => {
                            const modalAnnotation = modalAnnotations[key];
                            const propertyKey = modalProperty['property'] + key;

                            if (UserService.getSubject() === modalAnnotation['creator']) {
                                return (
                                    <Row key={propertyKey} className="mb-3">
                                        <Col md={{ span: 12 }}>
                                            <Row onMouseEnter={() => IsHover(true, propertyKey)}
                                                onMouseLeave={() => IsHover(false, propertyKey)}>
                                                <Col md={{ span: 2 }}>
                                                    {editMode[modalProperty['property']] ?
                                                        (editMode[modalProperty['property']] === propertyKey) &&
                                                        <>
                                                            <FontAwesomeIcon
                                                                icon={faXmark}
                                                                onClick={() => props.ToggleEditMode(propertyKey)}
                                                                className="annotate_editIcon xmark"
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={faSave}
                                                                onClick={() => props.UpdateAnnotation(modalAnnotation, propertyKey, key)}
                                                                className="annotate_editIcon save"
                                                            />
                                                            <br />
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                                className="annotate_editIcon delete"
                                                                onClick={() => props.RemoveAnnotation(modalAnnotation, propertyKey, key)}
                                                            />
                                                        </>
                                                        : editHover === propertyKey &&
                                                        <FontAwesomeIcon
                                                            icon={faPencil}
                                                            onClick={() => props.ToggleEditMode(propertyKey)}
                                                            className="annotate_editIcon pencil"
                                                        />
                                                    }
                                                </Col>
                                                <Col md={{ span: 10 }}>
                                                    <Row>
                                                        {editMode[modalProperty['property']] ?
                                                            (editMode[modalProperty['property']] === propertyKey) ?
                                                                <Col md={{ span: 10 }} className="annotate_annotationMessage me edit">
                                                                    <textarea
                                                                        className="annotate_editTextarea"
                                                                        defaultValue={modalAnnotation['body']['value']}
                                                                        onChange={(input) => props.UpdateModifications(input, propertyKey)}
                                                                    />
                                                                </Col>
                                                                : <Col md={{ span: 10 }} className="annotate_annotationMessage me">
                                                                    {modalAnnotation['body']['value']}
                                                                </Col>
                                                            : <Col md={{ span: 10 }} className="annotate_annotationMessage me">
                                                                {modalAnnotation['body']['value']}
                                                            </Col>
                                                        }

                                                        <Col md={{ span: 2 }}>
                                                            <img
                                                                src="https://crafatar.com/avatars/af781660900a493687708eee23874086?size=64&overlay"
                                                                className="img-fluid"
                                                                alt="User avatar"
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                );
                            } else {
                                return (
                                    <Row key={key} className="mb-3">
                                        <Col md={{ span: 10 }}>
                                            <Row>
                                                <Col md={{ span: 2 }}>
                                                    <img
                                                        src="https://crafatar.com/avatars/af781660900a493687708eee23874086?size=64&overlay"
                                                        className="img-fluid"
                                                        alt="User avatar"
                                                    />
                                                </Col>
                                                <Col md={{ span: 10 }} className="annotate_annotationMessage">
                                                    {modalAnnotations[key]['body']['value']}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                );
                            }
                        }) : 'No annotations yet'}
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer className="annotate_modalFooter">
                <Row className="w-100">
                    <Col md={{ span: 11 }}>
                        <textarea
                            className="w-100 annotate_annotationInput"
                            onChange={(annotationInput) => props.UpdateAnnotationInput(annotationInput)}
                            value={annotationInput}
                            disabled={!(UserService.isLoggedIn())}
                        />
                    </Col>
                    <Col md={{ span: 1 }}>
                        <button
                            type="button"
                            className="annotate_annotationSubmit"
                            onClick={() => props.SaveAnnotation()}
                            disabled={!(UserService.isLoggedIn())}
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal >
    );
}

export default AnnotateModal;
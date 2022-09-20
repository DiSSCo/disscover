import { useState } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';
import UserService from 'keycloak/Keycloak';

/* Import Components */
import RelationshipLink from './annotationTypes/RelationshipLink';
import Correcting from './annotationTypes/Correcting';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSave, faTrash, faPencil, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const AnnotateModal = (props) => {
    const modalToggle = props.modalToggle;
    const modalAnnotations = props.modalAnnotations;
    const modalProperty = props.modalProperty;
    const editMode = props.editMode;

    let propertyAnnotations = [];

    if (modalAnnotations) {
        if (modalAnnotations[modalProperty['property']]) {
            propertyAnnotations = modalAnnotations[modalProperty['property']];
        }
    }

    const [editHover, setEditHover] = useState();

    function IsHover(toggle, propertyKey) {
        if (toggle) {
            setEditHover(propertyKey);
        } else {
            setEditHover('');
        }
    }

    const [annotationType, setAnnotationType] = useState();
    const annotationTypes = [{
        key: "link",
        displayName: "Relationship/Link"
    }, {
        key: "correcting",
        displayName: "Error correction"
    }, {
        key: "quality_flagging",
        displayName: "Quality flag"
    }, {
        key: "score_of_annotation",
        displayName: "Score of annotation"
    }, {
        key: "addition",
        displayName: "Addition"
    }
    ];

    function RenderAnnotationType() {
        if (annotationType) {
            switch (annotationType) {
                case 'link':
                    return (<RelationshipLink
                        modalProperty={modalProperty}
                        SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                    />);
                case 'correcting':
                    return (<Correcting />);
            }
        } else {
            return (<RelationshipLink
                modalProperty={modalProperty}
                SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
            />);
        }
    }

    function UpdateAnnotationType(type) {
        setAnnotationType(type);
    }

    return (
        <Modal show={modalToggle} size="xl" className="annotate_modal">
            <Row className="h-100">
                <Col md={{ span: 5, offset: 1 }}>
                    <Modal.Header className="annotate_modalHeader">
                        <Modal.Title className="annotate_modalHeaderTitle">
                            {modalProperty['displayName']}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="annotate_modalBody">
                        <Row>
                            <Col className="col-md-auto annotate_modalCurrentValue py-1 mx-3">
                                <span className="annotate_modalCurrentValueTitle"> Current value: </span>

                                {(typeof modalProperty['currentValue'] === 'string') &&
                                    modalProperty['currentValue'].includes('</') ?
                                    parse(modalProperty['currentValue'])
                                    : modalProperty['currentValue']
                                }
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md={{ span: 12 }}>
                                {propertyAnnotations ? Object.keys(propertyAnnotations).map((key, _i) => {
                                    const modalAnnotation = propertyAnnotations[key];

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
                                                                        onClick={() => props.UpdateAnnotation(modalAnnotation, propertyKey)}
                                                                        className="annotate_editIcon save"
                                                                    />
                                                                    <br />
                                                                    <FontAwesomeIcon
                                                                        icon={faTrash}
                                                                        className="annotate_editIcon delete"
                                                                        onClick={() => props.RemoveAnnotation(modalAnnotation, propertyKey)}
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
                </Col>

                <Col md={{ span: 5 }} className="position-relative">
                    <button type="button" onClick={() => props.ToggleModal()} className="annotate_modalHeaderButton">
                        Dismiss
                    </button>

                    <Modal.Body className="annotate_modalBody right">
                        <Row>
                            <Col md={{ span: 12 }}>
                                <p> Select an annotation type: </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <select onChange={e => UpdateAnnotationType(e.target.value)} className="annotate_annotationTypeSelect px-2 py-2">
                                    {annotationTypes.map((type, _i) => {
                                        return (
                                            <option
                                                key={type['key']}
                                                value={type['key']}
                                                className="annotate_annotationTypeSelectOption"
                                            >
                                                {type['displayName']}
                                            </option>
                                        );
                                    })}
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {RenderAnnotationType()}
                            </Col>
                        </Row>
                    </Modal.Body>
                </Col>
            </Row>

            {/* <Modal.Footer className="annotate_modalFooter">
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
            </Modal.Footer> */}
        </Modal >
    );
}

export default AnnotateModal;
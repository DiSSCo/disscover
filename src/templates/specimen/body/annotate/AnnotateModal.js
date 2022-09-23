import { useState } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';
import UserService from 'keycloak/Keycloak';

/* Import Components */
import Commenting from './annotationTypes/Commenting';
import Linking from './annotationTypes/Linking';
import Correcting from './annotationTypes/Correcting';
import QualityFlagging from './annotationTypes/QualityFlagging';
import Adding from './annotationTypes/Adding';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSave, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';


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

    function RenderEditMode(propertyKey, modalAnnotation) {
        if (editMode[modalProperty['property']] === propertyKey) {
            return (
                <Col md={{ span: 10 }} className="annotate_annotationMessage me edit">
                    <textarea
                        className="annotate_editTextarea"
                        defaultValue={modalAnnotation['body']['value']}
                        onChange={(input) => props.UpdateModifications(input, propertyKey)}
                    />
                </Col>
            );
        } else {
            return (
                <Col md={{ span: 10 }} className="annotate_annotationMessage me">
                    {modalAnnotation['body']['value']}
                </Col>
            );
        }
    }

    const [annotationType, setAnnotationType] = useState();
    const annotationTypes = [{
        key: "commenting",
        displayName: "Commenting"
    }, {
        key: "linking",
        displayName: "Relationship/Link"
    }, {
        key: "correcting",
        displayName: "Error correction"
    }, {
        key: "quality_flagging",
        displayName: "Quality flag"
    }, {
        key: "adding",
        displayName: "Addition"
    }
    ];

    function RenderAnnotationType() {
        if (annotationType) {
            switch (annotationType) {
                case 'commenting':
                    return (<Commenting
                        modalProperty={modalProperty}
                        SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                    />);
                case 'linking':
                    return (<Linking
                        modalProperty={modalProperty}
                        SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                    />);
                case 'correcting':
                    return (<Correcting
                        modalProperty={modalProperty}
                        SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                    />);
                case 'quality_flagging':
                    return (<QualityFlagging
                        modalProperty={modalProperty}
                        SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                    />);
                case 'adding':
                    return (<Adding
                        modalProperty={modalProperty}
                        SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                    />);
            }
        } else {
            return (<Commenting
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
                        <Row className="px-2">
                            <Col md={{ span: 12 }} className="annotate_modalCurrentValue py-2">
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
                                    const isoDate = new Date(Date.parse(modalAnnotation['created']));
                                    const date = `${(isoDate.getMonth() + 1)}-${isoDate.getDate()}-${isoDate.getFullYear()}`;

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
                                                                    RenderEditMode(propertyKey, modalAnnotation)
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
                                                            <Row>
                                                                <Col className="col-md-auto annotate_annotationDate">
                                                                    {`${date} · Username`}
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
                                                    <Row>
                                                        <Col className="col-md-auto annotate_annotationDate">
                                                            {`${date} · Username`}
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
        </Modal >
    );
}

export default AnnotateModal;
import { useState } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';

/* Import Components */
import CommentingForm from './annotationTypes/commenting/CommentingForm';
import CommentingMessage from './annotationTypes/commenting/CommentingMessage';

import LinkingForm from './annotationTypes/linking/LinkingForm';
import LinkingMessage from './annotationTypes/linking/LinkingMessage';

import CorrectingForm from './annotationTypes/correcting/CorrectingForm';
import CorrectingMessage from './annotationTypes/correcting/CorrectingMessage';

import QualityFlaggingForm from './annotationTypes/qualityFlagging/QualityFlaggingForm';
import QualityFlaggingMessage from './annotationTypes/qualityFlagging/QualityFlaggingMessage';

import AddingForm from './annotationTypes/adding/AddingForm';
import AddingMessage from './annotationTypes/adding/AddingMessage';


const AnnotateModal = (props) => {
    const modalToggle = props.modalToggle;
    const modalAnnotations = props.modalAnnotations;
    const modalProperty = props.modalProperty;
    const editMode = props.editMode;
    const annotationType = props.annotationType;
    const annotationTypes = props.annotationTypes;

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
                <Col md={{ span: 12 }} className="annotate_annotationMessage me edit">
                    <textarea
                        className="annotate_editTextarea"
                        defaultValue={modalAnnotation['body']['value']}
                        onChange={(input) => props.UpdateModifications(input, propertyKey)}
                    />
                </Col>
            );
        } else {
            return (
                <Col md={{ span: 12 }} className="annotate_annotationMessage me">
                    {modalAnnotation['body']['value']}
                </Col>
            );
        }
    }

    function RenderAnnotationType() {
        if (annotationType) {
            switch (annotationType) {
                case 'commenting':
                    return (<CommentingForm
                        modalProperty={modalProperty}
                        SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                    />);
                case 'linking':
                    return (<LinkingForm
                        modalProperty={modalProperty}
                        SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                    />);
                case 'correcting':
                    return (<CorrectingForm
                        modalProperty={modalProperty}
                        SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                    />);
                case 'quality_flagging':
                    return (<QualityFlaggingForm
                        modalProperty={modalProperty}
                        SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                    />);
                case 'adding':
                    return (<AddingForm
                        modalProperty={modalProperty}
                        SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                    />);
            }
        } else {
            return (<CommentingForm
                modalProperty={modalProperty}
                SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
            />);
        }
    }

    const annotationMessageTypes = {
        'commenting': CommentingMessage,
        'correcting': CorrectingMessage,
        'adding': AddingMessage,
        'quality_flagging': QualityFlaggingMessage,
        'linking': LinkingMessage
    }

    function UpdateAnnotationType(type) {
        props.SetAnnotationType(type);
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
                                    const propertyKey = modalProperty['property'] + key;

                                    const MessageComponent = annotationMessageTypes[modalAnnotation['motivation']];

                                    return (
                                        <MessageComponent uniqueKey={key}
                                            modalAnnotation={modalAnnotation}
                                            propertyKey={propertyKey}
                                            editMode={editMode}
                                            modalProperty={modalProperty}
                                            editHover={editHover}

                                            IsHover={(toggle, propertyKey) => IsHover(toggle, propertyKey)}
                                            RenderEditMode={(propertyKey, modalAnnotation) => RenderEditMode(propertyKey, modalAnnotation)}

                                            ToggleEditMode={(propertyKey) => props.ToggleEditMode(propertyKey)}
                                            UpdateAnnotation={(modalAnnotation, propertyKey) => props.UpdateAnnotation(modalAnnotation, propertyKey)}
                                            RemoveAnnotation={(modalAnnotation, propertyKey) => props.RemoveAnnotation(modalAnnotation, propertyKey)}
                                        />
                                    );
                                }) : 'No annotations yet'}
                            </Col>
                        </Row>
                    </Modal.Body>
                </Col>

                <Col md={{ span: 5 }} className="position-relative">
                    <button type="button" onClick={() => props.ToggleModal()} className="annotate_modalHeaderButton">
                        Dismiss
                    </button>

                    <Modal.Body className="annotate_modalBody right mb-3">
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
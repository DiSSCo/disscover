import { useEffect, useState } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';
import UserService from 'keycloak/Keycloak';

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

    const [formData, setFormData] = useState({
        attribute: modalProperty['property'],
        annotationTypes: {
            commenting: {},
            adding: {},
            correcting: {},
            quality_flagging: {},
            linking: {}
        }
    });

    let propertyAnnotations;

    if (modalAnnotations) {
        if (modalAnnotations[modalProperty['property']]) {
            propertyAnnotations = JSON.parse(JSON.stringify(modalAnnotations[modalProperty['property']]));
        }
    }

    useEffect(() => {
        if (propertyAnnotations && modalToggle) {
            const userId = UserService.getSubject();
            let localValues = {
                commenting: {},
                adding: {},
                correcting: {},
                quality_flagging: {},
                linking: {}
            }

            if (propertyAnnotations['commenting']) {
                if (propertyAnnotations['commenting'][userId]) {
                    localValues['commenting'] = JSON.parse(JSON.stringify(propertyAnnotations['commenting'][userId]['body']));
                }
            }
            if (propertyAnnotations['adding']) {
                if (propertyAnnotations['commenting'][userId]) {
                    localValues['adding'] = JSON.parse(JSON.stringify(propertyAnnotations['adding'][userId]['body']));
                }
            }
            if (propertyAnnotations['correcting']) {
                if (propertyAnnotations['correcting'][userId]) {
                    localValues['correcting'] = JSON.parse(JSON.stringify(propertyAnnotations['correcting'][userId]['body']));
                }
            }
            if (propertyAnnotations['quality_flagging']) {
                if (propertyAnnotations['quality_flagging'][userId]) {
                    localValues['quality_flagging'] = JSON.parse(JSON.stringify(propertyAnnotations['quality_flagging'][userId]['body']));
                }
            }
            if (propertyAnnotations['linking']) {
                if (propertyAnnotations['linking'][userId]) {
                    localValues['linking'] = JSON.parse(JSON.stringify(propertyAnnotations['linking'][userId]['body']));
                }
            }

            setFormData({
                attribute: modalProperty['property'],
                annotationTypes: localValues,
            });
        } else {
            setFormData({
                attribute: '',
                annotationTypes: {
                    commenting: {},
                    adding: {},
                    correcting: {},
                    quality_flagging: {},
                    linking: {}
                }
            });
        }
    }, [modalToggle]);

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
                <Col md={{ span: 12 }} className="annotate_annotationMessage edit">
                    <textarea
                        className="annotate_editTextarea"
                        defaultValue={modalAnnotation['body']['value']}
                        onChange={(input) => props.UpdateModifications(input, propertyKey)}
                    />
                </Col>
            );
        } else {
            return (
                <Col md={{ span: 12 }} className="annotate_annotationMessage">
                    {modalAnnotation['body']['value']}
                </Col>
            );
        }
    }

    function RenderMultipleMode(annotationType) {
        useEffect(() => {
            const formDataCopy = { ...formData };

            if (!Array.isArray(formDataCopy['annotationTypes'][annotationType]['value'])) {
                formDataCopy['annotationTypes'][annotationType]['value'] = [formData['annotationTypes'][annotationType]['value']];

                setFormData(formDataCopy);
            }
        }, []);

        function AddField() {
            const copyFormData = { ...formData };

            copyFormData['annotationTypes'][annotationType]['value'].push('');

            setFormData(copyFormData);
        }

        if (formData) {
            return (
                <>
                    <Row>
                        {Object.keys(formData['annotationTypes'][annotationType]['value']).map((index, _i) => {
                            return (
                                <Col key={index}
                                    md={{ span: 12 }}
                                    className="mb-2"
                                >
                                    <input className="annotate_annotationTypeField"
                                        name="value"
                                        defaultValue={formData['annotationTypes'][annotationType]['value'][index]}
                                        onChange={(value) => UpdateFormData('adding', 'value', value, index)}
                                        autoComplete="false"
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                    <Row className="mt-1">
                        <Col>
                            <button type="button"
                                className="annotate_annotationTypeMultipleAdd"
                                onClick={() => AddField()}
                            >
                                Add field
                            </button>
                        </Col>
                    </Row>
                </>
            );
        }
    }

    function UpdateFormData(annotationType, formField, value, index = -1) {
        const formDataCopy = { ...formData };

        if (index >= 0) {
            if (!formDataCopy['annotationTypes'][annotationType][[formField]]) {
                formDataCopy['annotationTypes'][annotationType][[formField]] = [];
                formDataCopy['annotationTypes'][annotationType][[formField]][index] = value.target.value;
            } else {
                formDataCopy['annotationTypes'][annotationType][[formField]][index] = value.target.value;
            }
        } else {
            formDataCopy['annotationTypes'][annotationType][[formField]] = value.target.value;
        }

        setFormData(formDataCopy);
    }

    function SubmitForm(annotationType) {
        const annotation = {
            type: 'Annotation',
            motivation: annotationType,
            body: {
                type: modalProperty['property'],
                ...formData['annotationTypes'][annotationType]
            },
            target: {
                type: 'digital_specimen',
                indvProp: modalProperty['property']
            }
        };

        props.SaveAnnotation(annotation);
    }

    function RenderAnnotationType() {
        if (formData) {
            if (annotationType) {
                switch (annotationType) {
                    case 'commenting':
                        return (<CommentingForm
                            modalProperty={modalProperty}
                            formData={formData['annotationTypes']}

                            UpdateFormData={(annotationType, formField, value) => UpdateFormData(annotationType, formField, value)}
                            SubmitForm={(annotationType) => SubmitForm(annotationType)}
                            SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                        />);
                    case 'linking':
                        return (<LinkingForm
                            modalProperty={modalProperty}
                            formData={formData['annotationTypes']}

                            UpdateFormData={(annotationType, formField, value) => UpdateFormData(annotationType, formField, value)}
                            SubmitForm={(annotationType) => SubmitForm(annotationType)}
                            SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                        />);
                    case 'correcting':
                        return (<CorrectingForm
                            modalProperty={modalProperty}
                            formData={formData['annotationTypes']}

                            UpdateFormData={(annotationType, formField, value) => UpdateFormData(annotationType, formField, value)}
                            SubmitForm={(annotationType) => SubmitForm(annotationType)}
                            SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                        />);
                    case 'quality_flagging':
                        return (<QualityFlaggingForm
                            modalProperty={modalProperty}
                            formData={formData['annotationTypes']}

                            UpdateFormData={(annotationType, formField, value) => UpdateFormData(annotationType, formField, value)}
                            SubmitForm={(annotationType) => SubmitForm(annotationType)}
                            SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                        />);
                    case 'adding':
                        return (<AddingForm
                            modalProperty={modalProperty}
                            formData={formData['annotationTypes']}

                            UpdateFormData={(annotationType, formField, value) => UpdateFormData(annotationType, formField, value)}
                            SubmitForm={(annotationType) => SubmitForm(annotationType)}
                            RenderMultipleMode={(annotationType, latestAnnotationData) => RenderMultipleMode(annotationType, latestAnnotationData)}
                        />);
                }
            } else {
                return (<CommentingForm
                    modalProperty={modalProperty}
                    formData={formData['annotationTypes']}

                    UpdateFormData={(annotationType, formField, value) => UpdateFormData(annotationType, formField, value)}
                    SubmitForm={(annotationType) => SubmitForm(annotationType)}
                    SaveAnnotation={(annotation) => props.SaveAnnotation(annotation)}
                />);
            }
        }
    }

    const annotationMessageTypes = {
        'commenting': CommentingMessage,
        'adding': AddingMessage,
        'correcting': CorrectingMessage,
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
                                    const modalAnnotations = propertyAnnotations[key];
                                    const propertyKey = modalProperty['property'] + key;

                                    const MessageComponent = annotationMessageTypes[key];

                                    for (const annotationKey in modalAnnotations) {
                                        const modalAnnotation = modalAnnotations[annotationKey];

                                        return (
                                            <MessageComponent key={key}
                                                uniqueKey={key}
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
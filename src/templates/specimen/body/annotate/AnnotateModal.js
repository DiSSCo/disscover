import { useEffect, useState, useRef } from 'react';
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

/* Import API */
import InsertAnnotation from 'api/annotate/InsertAnnotation';
import DeleteAnnotation from 'api/annotate/DeleteAnnotation';


const AnnotateModal = (props) => {
    const targetId = props.targetId;
    const targetType = props.targetType;

    const modalToggle = props.modalToggle;
    const modalAnnotations = props.modalAnnotations;
    const modalProperty = props.modalProperty;
    const annotationType = props.annotationType;

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
    }];

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

    const [annotationFormToggle, setAnnotationFormToggle] = useState();

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

            for (const key in localValues) {
                if (propertyAnnotations[key]) {
                    if (propertyAnnotations[key][userId]) {
                        localValues[key] = JSON.parse(JSON.stringify(propertyAnnotations[key][userId]['body']));
                    }
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

    function RenderMultipleMode(annotationType) {
        const formDataCopy = { ...formData };

        if (!Array.isArray(formDataCopy['annotationTypes'][annotationType]['value'])) {
            formDataCopy['annotationTypes'][annotationType]['value'] = [formData['annotationTypes'][annotationType]['value']];

            setFormData(formDataCopy);
        }


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
                                    <input className="annotate_annotationTypeField w-100"
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

    function UpdateAnnotationType(type) {
        props.SetAnnotationType(type, true);

        if (Object.keys(formData['annotationTypes'][type]).length > 0) {
            setEditType(type);
        } else {
            setEditType('');
        }
    }

    function ToggleAnnotationForm(close = false) {
        if (annotationFormToggle || close) {
            setAnnotationFormToggle('');

            if (editType) {
                setEditType();
            }
        } else {
            setAnnotationFormToggle('active');

            if (Object.keys(formData['annotationTypes']['commenting']).length > 0) {
                setEditType('commenting');
            }
        }
    }

    const [editType, setEditType] = useState();

    function ToggleEditMode(type = '') {
        if (type !== editType) {
            if (!annotationFormToggle && type) {
                ToggleAnnotationForm();
            }

            props.SetAnnotationType(type, true);
            setEditType(type);
        } else {
            ToggleAnnotationForm(true);
            setEditType('');
        }
    }

    function UpdateFormData(annotationType, formField, value, index = -1) {
        const formDataCopy = { ...formData };

        if (typeof (value.target.value) === 'object') {
            value = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()} ${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}.${value.getMilliseconds()}`;
        } else {
            value = value.target.value;
        }

        if (index >= 0) {
            if (!formDataCopy['annotationTypes'][annotationType][[formField]]) {
                formDataCopy['annotationTypes'][annotationType][[formField]] = [];
                formDataCopy['annotationTypes'][annotationType][[formField]][index] = value;
            } else {
                formDataCopy['annotationTypes'][annotationType][[formField]][index] = value;
            }
        } else {
            formDataCopy['annotationTypes'][annotationType][[formField]] = value;
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
                type: targetType,
                indvProp: modalProperty['property']
            }
        };

        SaveAnnotation(annotation);

        if (!editType) {
            setEditType(annotationType);
        }
    }

    function SaveAnnotation(annotation) {
        if (annotation) {
            annotation['target']['id'] = `https://hdl.handle.net/${targetId}`

            InsertAnnotation(annotation, UserService.getToken(), Process);

            function Process(result) {
                if (result) {
                    const copyModalAnnotations = { ...modalAnnotations };

                    if (!copyModalAnnotations[modalProperty['property']]) {
                        copyModalAnnotations[modalProperty['property']] = { [result['motivation']]: { [result['creator']]: result } }
                    } else if (!copyModalAnnotations[modalProperty['property']][result['motivation']]) {
                        copyModalAnnotations[modalProperty['property']][result['motivation']] = { [result['creator']]: result };
                    } else {
                        copyModalAnnotations[modalProperty['property']][result['motivation']][result['creator']] = result;
                    }

                    props.SetModalAnnotations(copyModalAnnotations);
                }
            }
        }
    }

    function RemoveAnnotation(type) {
        const annotation = modalAnnotations[modalProperty['property']][type][UserService.getSubject()];

        DeleteAnnotation(annotation['id'], UserService.getToken(), Process);

        function Process(success) {
            if (success) {
                const copyModalAnnotations = { ...modalAnnotations };

                delete copyModalAnnotations[modalProperty['property']][type][annotation['creator']];

                props.SetModalAnnotations(copyModalAnnotations);
            }
        }
    }

    function RenderAnnotationType() {
        if (formData) {
            let annotationExists;

            if (annotationType['type'] && annotationType['form']) {
                if (Object.keys(formData['annotationTypes'][annotationType['type']]).length > 0) {
                    annotationExists = true;
                }

                switch (annotationType['type']) {
                    case 'commenting':
                        return (<CommentingForm
                            modalProperty={modalProperty}
                            formData={formData['annotationTypes']}
                            annotationExists={annotationExists}

                            UpdateFormData={(annotationType, formField, value) => UpdateFormData(annotationType, formField, value)}
                            SubmitForm={(annotationType) => SubmitForm(annotationType)}
                            RemoveAnnotation={(annotation) => RemoveAnnotation(annotation)}
                        />);
                    case 'linking':
                        return (<LinkingForm
                            modalProperty={modalProperty}
                            formData={formData['annotationTypes']}
                            annotationExists={annotationExists}

                            UpdateFormData={(annotationType, formField, value) => UpdateFormData(annotationType, formField, value)}
                            SubmitForm={(annotationType) => SubmitForm(annotationType)}
                            RemoveAnnotation={(annotation) => RemoveAnnotation(annotation)}
                        />);
                    case 'correcting':
                        return (<CorrectingForm
                            modalProperty={modalProperty}
                            formData={formData['annotationTypes']}
                            annotationExists={annotationExists}

                            UpdateFormData={(annotationType, formField, value) => UpdateFormData(annotationType, formField, value)}
                            SubmitForm={(annotationType) => SubmitForm(annotationType)}
                            RemoveAnnotation={(annotation) => RemoveAnnotation(annotation)}
                        />);
                    case 'quality_flagging':
                        return (<QualityFlaggingForm
                            modalProperty={modalProperty}
                            formData={formData['annotationTypes']}
                            annotationExists={annotationExists}

                            UpdateFormData={(annotationType, formField, value) => UpdateFormData(annotationType, formField, value)}
                            SubmitForm={(annotationType) => SubmitForm(annotationType)}
                            RemoveAnnotation={(annotation) => RemoveAnnotation(annotation)}
                        />);
                    case 'adding':
                        return (<AddingForm
                            modalProperty={modalProperty}
                            formData={formData['annotationTypes']}
                            annotationExists={annotationExists}

                            UpdateFormData={(annotationType, formField, value) => UpdateFormData(annotationType, formField, value)}
                            SubmitForm={(annotationType) => SubmitForm(annotationType)}
                            RemoveAnnotation={(annotation) => RemoveAnnotation(annotation)}
                            RenderMultipleMode={(annotationType) => RenderMultipleMode(annotationType)}
                        />);
                }
            } else {
                if (Object.keys(formData['annotationTypes']['commenting']).length > 0) {
                    annotationExists = true;
                }

                return (<CommentingForm
                    modalProperty={modalProperty}
                    formData={formData['annotationTypes']}

                    UpdateFormData={(annotationType, formField, value) => UpdateFormData(annotationType, formField, value)}
                    SubmitForm={(annotationType) => SubmitForm(annotationType)}
                    RemoveAnnotation={(type) => RemoveAnnotation(type)}
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

    let showNewAnnotationButton = "d-none";

    for (const key in formData['annotationTypes']) {
        if (Object.keys(formData['annotationTypes'][key]).length === 0) {
            showNewAnnotationButton = "";
        }
    }

    const scrollModalAnnotationsBodyRef = useRef();

    function ScrollToAnnotation(ref) {
        scrollModalAnnotationsBodyRef.current.scrollTop = (ref.current.offsetTop - 75);
    }

    return (
        <Modal show={modalToggle} size="xl" className="annotate_modal">
            <Row className="h-100 justify-content-center">
                <Col md={{ span: 6 }} className={`h-100 annotate_modalAnnotationSection ${annotationFormToggle}`}>
                    <div className="w-100 m-0 p-0 position-relative">
                        <button type="button" 
                            onClick={() => { props.ToggleModal(); ToggleAnnotationForm(true); ToggleEditMode(); }} 
                            className="annotate_modalHeaderButton position-absolute px-3 border-0 bg-backdrop text-white br-tl br-tr"
                        >
                            Dismiss
                        </button>
                    </div>

                    <Modal.Header className="annotate_modalHeader position-relative bg-primary-blue text-white">
                        <Modal.Title className="annotate_modalHeaderTitle">
                            {modalProperty['displayName']}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="annotate_modalBody bg-white">
                        <Row className="px-2">
                            <Col md={{ span: 12 }} className="annotate_modalCurrentValue border-b-2-primary-dark">
                                <span className="fw-bold"> Current value: </span>

                                {(typeof modalProperty['currentValue'] === 'string') &&
                                    modalProperty['currentValue'].includes('</') ?
                                    parse(modalProperty['currentValue'])
                                    : modalProperty['currentValue']
                                }
                            </Col>
                        </Row>
                        <Row className="annotate_modalAnnotationsBody mt-3 overflow-scroll" ref={scrollModalAnnotationsBodyRef}>
                            <Col>
                                <Row>
                                    <Col md={{ offset: 1 }}
                                        className={`col-md-auto mb-3 annotate_modalAddAnnotationButton border-2-primary-dark ${showNewAnnotationButton}`}
                                        onClick={() => ToggleAnnotationForm()}
                                    >
                                        Add new annotation
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ span: 12 }}>
                                        {propertyAnnotations ? Object.keys(propertyAnnotations).map((key, _i) => {
                                            const modalAnnotations = propertyAnnotations[key];

                                            const propertyKey = modalProperty['property'] + key;

                                            const MessageComponent = annotationMessageTypes[key];

                                            let viewComponents = [];

                                            for (const annotationKey in modalAnnotations) {
                                                const modalAnnotation = modalAnnotations[annotationKey];

                                                if (modalAnnotation['creator'] === UserService.getSubject()) {
                                                    viewComponents.push(<MessageComponent key={key}
                                                        modalAnnotation={modalAnnotation}
                                                        propertyKey={propertyKey}
                                                        modalProperty={modalProperty}
                                                        editType={editType}
                                                        annotationType={annotationType}

                                                        ToggleEditMode={(type) => ToggleEditMode(type)}
                                                        ScrollToAnnotation={(ref) => ScrollToAnnotation(ref)}
                                                    />);
                                                } else {
                                                    viewComponents.push(<MessageComponent key={key}
                                                        modalAnnotation={modalAnnotation}
                                                        propertyKey={propertyKey}
                                                        modalProperty={modalProperty}
                                                        annotationType={annotationType}
                                                    />);
                                                }
                                            }

                                            return (viewComponents);
                                        })
                                            : <Row>
                                                <Col md={{ span: 10, offset: 1 }}>
                                                    No annotations yet
                                                </Col>
                                            </Row>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Col>

                <Col md={{ span: 5 }} className={`position-relative h-100 annotate_modalFormSection ${annotationFormToggle}`}>
                    <Modal.Body className="annotate_modalBody right bg-white overflow-scroll mb-3">
                        <Row>
                            <Col md={{ span: 12 }}>
                                <p> Select an annotation type: </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <select onChange={e => UpdateAnnotationType(e.target.value)}
                                    className="annotate_annotationTypeSelect px-2 py-2 bg-primary-blue border-0 text-white"
                                    value={annotationType['type'] ? annotationType['type'] : 'commenting'}
                                >
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
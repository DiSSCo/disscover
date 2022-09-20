import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';
import './annotate.css';

/* Import API */
import GetAnnotations from 'api/annotate/GetAnnotations';
import InsertAnnotation from 'api/annotate/InsertAnnotation';
import PatchAnnotation from 'api/annotate/PatchAnnotation';
import DeleteAnnotation from 'api/annotate/DeleteAnnotation';

/* Import Components */
import AnnotateRow from './AnnotateRow';
import AnnotateModal from './AnnotateModal';


const AnnotateSection = (props) => {
    const specimen = props.specimen;
    const token = UserService.getToken();

    /* Modal handling */
    const [modalToggle, setModalToggle] = useState(false);
    const [modalProperty, setModalProperty] = useState({ 'property': '' });
    const [modalAnnotations, setModalAnnotations] = useState();

    useEffect(() => {
        SetAnnotations();
    }, []);

    function SetAnnotations() {
        /* Search for annotations data and put into view */
        GetAnnotations(specimen['Meta']['id']['value'], Process);

        function Process(annotations) {
            const annotationsForModal = {};

            for (const i in annotations) {
                const annotation = annotations[i];

                if (!annotationsForModal[annotation['target']['indvProp']]) {
                    annotationsForModal[annotation['target']['indvProp']] = { [annotation['id']]: annotation };
                } else {
                    annotationsForModal[annotation['target']['indvProp']][annotation['id']] = annotation;
                }
            }

            setModalAnnotations(annotationsForModal);
        }
    }

    function ToggleModal(property = null, displayName = null, currentValue = null) {
        setModalToggle(!modalToggle);

        if (property && property !== modalProperty['property']) {
            let copyModalProperty = { ...modalProperty };

            copyModalProperty['property'] = property;
            copyModalProperty['displayName'] = displayName;
            copyModalProperty['currentValue'] = currentValue;

            setModalProperty(copyModalProperty);
        }
    }

    function SaveAnnotation(annotation) {
        console.log(annotation);

        if (annotation) {
            const newAnnotation = {
                type: 'Annotation',
                motivation: 'https://hdl.handle.net/pid-motivation-correcting',
                body: {
                    type: annotation['property'],
                    value: annotation['value'],
                    reference: annotation['motivation']
                },
                target: {
                    type: 'https://hdl.handle.net/digitalSpecimen-type',
                    id: `https://hdl.handle.net/${specimen['Meta']['id']['value']}`,
                    indvProp: annotation['property']
                }
            };

            InsertAnnotation(newAnnotation, token, Process);

            function Process(result) {
                if (result) {
                    const copyModalAnnotations = { ...modalAnnotations };

                    if (!copyModalAnnotations[modalProperty['property']]) {
                        copyModalAnnotations[modalProperty['property']] = { [result['id']]: result }
                    } else {
                        copyModalAnnotations[modalProperty['property']][result['id']] = result;
                    }

                    console.log(copyModalAnnotations);

                    setModalAnnotations(copyModalAnnotations);
                }
            }
        }
    }

    const [modifications, setModifications] = useState({});

    function UpdateModifications(input, propertyKey, remove = false) {
        let copyModification = { ...modifications };

        if (!remove) {
            copyModification[propertyKey] = input.target.value;
        } else {
            delete copyModification[propertyKey];
        }

        setModifications(copyModification);
    }

    const [editMode, setEditMode] = useState({});

    function ToggleEditMode(propertyKey) {
        let editObject = { ...editMode };

        if (!(modalProperty['property'] in editMode)) {
            editObject[modalProperty['property']] = propertyKey;
        } else if (editMode[modalProperty['property']] === propertyKey) {
            delete editObject[modalProperty['property']];
        }

        setEditMode(editObject);
    }

    function UpdateAnnotation(annotation, propertyKey) {
        annotation['body']['value'] = modifications[propertyKey];

        PatchAnnotation(annotation, token, Process);

        function Process(result) {
            ToggleEditMode(propertyKey);
            UpdateModifications(null, propertyKey, true);

            const copyModalAnnotations = { ...modalAnnotations };

            copyModalAnnotations[modalProperty['property']][result['id']] = result;

            console.log(copyModalAnnotations);

            setModalAnnotations(copyModalAnnotations);
        }
    }

    function RemoveAnnotation(annotation, propertyKey) {
        DeleteAnnotation(annotation['id'], token, Process);

        function Process(success) {
            if (success) {
                ToggleEditMode(propertyKey);
                UpdateModifications(null, propertyKey, true);

                const copyModalAnnotations = { ...modalAnnotations };

                delete copyModalAnnotations[modalProperty['property']][annotation['id']];

                setModalAnnotations(copyModalAnnotations);
            }
        }
    }

    const [toggledAnnotationRows, setToggledAnnotationRows] = useState({ Meta: 'active' });

    function ToggleAnnotationRow(group) {
        let copyToggledAnnotationRows = { ...toggledAnnotationRows }

        if (!toggledAnnotationRows[group]) {
            copyToggledAnnotationRows[group] = 'active';
        } else {
            delete copyToggledAnnotationRows[group];
        }

        setToggledAnnotationRows(copyToggledAnnotationRows);
    }

    return (
        <div>
            {modalAnnotations &&
                <Row>
                    <Col md={{ span: 12 }}>
                        {Object.keys(specimen).map((key, _i) => {
                            if (key != 'Auth') {

                                return (
                                    <AnnotateRow
                                        key={key}
                                        specimenGroup={specimen[key]}
                                        group={key}
                                        toggledAnnotationRows={toggledAnnotationRows}
                                        modalAnnotations={modalAnnotations}

                                        ToggleModal={(property, displayName, currentValue) => ToggleModal(property, displayName, currentValue)}
                                        ToggleAnnotationRow={(group) => ToggleAnnotationRow(group)}
                                        UpdateScrollToMids={(midsHandle) => props.UpdateScrollToMids(midsHandle)}
                                    />
                                );
                            }
                        })}
                    </Col>
                </Row>
            }

            {UserService.isLoggedIn() &&
                <AnnotateModal
                    modalToggle={modalToggle}
                    modalAnnotations={modalAnnotations}
                    modalProperty={modalProperty}
                    editMode={editMode}

                    ToggleModal={() => ToggleModal()}
                    SaveAnnotation={(annotation) => SaveAnnotation(annotation)}
                    ToggleEditMode={(propertyKey) => ToggleEditMode(propertyKey)}
                    UpdateModifications={(input, propertyKey) => UpdateModifications(input, propertyKey)}
                    UpdateAnnotation={(annotation, propertyKey, index) => UpdateAnnotation(annotation, propertyKey, index)}
                    RemoveAnnotation={(annotation, propertyKey, index) => RemoveAnnotation(annotation, propertyKey, index)}
                />
            }
        </div >
    );
}

export default AnnotateSection;
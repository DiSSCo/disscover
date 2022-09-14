import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';

/* Import API */
import GetAnnotations from 'api/annotate/GetAnnotations';
import InsertAnnotation from 'api/annotate/InsertAnnotation';
import PatchAnnotation from 'api/annotate/PatchAnnotation';
import DeleteAnnotation from 'api/annotate/DeleteAnnotation';

/* Import components */
import AnnotateRow from './AnnotateRow';
import AnnotateModal from './AnnotateModal';


const AnnotateSection = (props) => {
    const token = UserService.getToken();
    const specimen = props.specimen;

    /* Modal handling */
    const [modalToggle, setModalToggle] = useState(false);
    const [modalProperty, setModalProperty] = useState({ 'property': '' });
    const [modalAnnotations, setModalAnnotations] = useState([]);

    function ToggleModal(property = null, displayName = null, currentValue = null) {
        setModalToggle(!modalToggle);

        if (property && property !== modalProperty['property']) {
            let copyModalProperty = { ...modalProperty };

            copyModalProperty['property'] = property;
            copyModalProperty['displayName'] = displayName;
            copyModalProperty['currentValue'] = currentValue;

            setModalProperty(copyModalProperty);

            GetPropertyAnnotations(property);
        }

        function GetPropertyAnnotations(property) {
            /* Search for annotations data and put into view */
            GetAnnotations(specimen['Meta']['id']['value'], token, Process);

            function Process(annotations) {
                setModalAnnotations(annotations);
            }
        }
    }

    const [annotationInput, setAnnotationInput] = useState();

    function UpdateAnnotationInput(input) {
        setAnnotationInput(input.target.value);
    }

    function SaveAnnotation() {
        if (annotationInput) {
            const annotation = {
                type: 'Annotation',
                motivation: 'https://hdl.handle.net/pid-motivation-correcting',
                body: {
                    type: 'TextualBody',
                    value: annotationInput,
                    reference: 'https://bionomia.net/Q3822242'
                },
                target: {
                    type: 'https://hdl.handle.net/digitalSpecimen-type',
                    id: `https://hdl.handle.net/${specimen['Meta']['id']['value']}`,
                    indvProp: modalProperty['property']
                }
            };            

            InsertAnnotation(annotation, token, Process);

            function Process(result) {
                if (result) {
                    const copyModalAnnotations = { ...modalAnnotations };
                    const newIndex = Object.keys(copyModalAnnotations).length;

                    copyModalAnnotations[newIndex] = result;

                    setModalAnnotations(copyModalAnnotations);
                }
            }

            setAnnotationInput('');
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

    function UpdateAnnotation(annotation, propertyKey, index) {
        annotation['body']['value'] = modifications[propertyKey];

        PatchAnnotation(annotation, token, Process);

        function Process(result) {
            ToggleEditMode(propertyKey);
            UpdateModifications(null, propertyKey, true);

            const copyModalAnnotations = { ...modalAnnotations };

            copyModalAnnotations[index] = result;

            setModalAnnotations(copyModalAnnotations);
        }
    }

    function RemoveAnnotation(annotation, propertyKey, index) {
        DeleteAnnotation(annotation['id'], token, Process);

        function Process(success) {
            if (success) {
                ToggleEditMode(propertyKey);
                UpdateModifications(null, propertyKey, true);

                const copyModalAnnotations = { ...modalAnnotations };

                delete copyModalAnnotations[index];

                setModalAnnotations(copyModalAnnotations);
            }
        }
    }

    const [toggledAnnotationRows, setToggledAnnotationRows] = useState({});

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

                                    ToggleModal={(property, displayName, currentValue) => ToggleModal(property, displayName, currentValue)}
                                    ToggleAnnotationRow={(group) => ToggleAnnotationRow(group)}
                                    UpdateScrollToMids={(midsHandle) => props.UpdateScrollToMids(midsHandle)}
                                />
                            );
                        }
                    })}
                </Col>
            </Row>

            <AnnotateModal
                modalToggle={modalToggle}
                modalAnnotations={modalAnnotations}
                modalProperty={modalProperty}
                annotationInput={annotationInput}
                editMode={editMode}

                ToggleModal={() => ToggleModal()}
                UpdateAnnotationInput={(annotationInput) => UpdateAnnotationInput(annotationInput)}
                SaveAnnotation={() => SaveAnnotation()}
                ToggleEditMode={(propertyKey) => ToggleEditMode(propertyKey)}
                UpdateModifications={(input, propertyKey) => UpdateModifications(input, propertyKey)}
                UpdateAnnotation={(annotation, propertyKey, index) => UpdateAnnotation(annotation, propertyKey, index)}
                RemoveAnnotation={(annotation, propertyKey, index) => RemoveAnnotation(annotation, propertyKey, index)}
            />
        </div >
    );
}

export default AnnotateSection;
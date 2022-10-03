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
                    annotationsForModal[annotation['target']['indvProp']] = { [annotation['motivation']]: { [annotation['creator']]: annotation } };
                } else {
                    annotationsForModal[annotation['target']['indvProp']][annotation['motivation']] = { [annotation['creator']]: annotation };
                }
            }

            setModalAnnotations(annotationsForModal);
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

    function ToggleModal(property = null, propertyObject) {
        setModalToggle(!modalToggle);

        if (!modalToggle) {
            setAnnotationType('commenting');
        }

        if (property && property !== modalProperty['property']) {
            let copyModalProperty = { ...modalProperty };

            copyModalProperty['property'] = property;
            copyModalProperty['displayName'] = propertyObject['displayName'];
            copyModalProperty['currentValue'] = propertyObject['value'];
            copyModalProperty['multiple'] = propertyObject['multiple'];

            setModalProperty(copyModalProperty);
        }
    }

    function SaveAnnotation(annotation) {
        if (annotation) {
            annotation['target']['id'] = `https://hdl.handle.net/${specimen['Meta']['id']['value']}`

            InsertAnnotation(annotation, token, Process);

            function Process(result) {
                if (result) {
                    const copyModalAnnotations = { ...modalAnnotations };

                    if (!copyModalAnnotations[modalProperty['property']]) {
                        copyModalAnnotations[modalProperty['property']] = { [result['motivation']]: { [result['creator']]: result } }
                    } else {
                        copyModalAnnotations[modalProperty['property']][result['motivation']] = { [result['creator']]: result };
                    }

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

            copyModalAnnotations[modalProperty['property']][result['motivation']] = { [result['creator']]: result };

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

                delete copyModalAnnotations[modalProperty['property']][annotation['motivation']][annotation['creator']];

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
                <Row className="mt-5">
                    <Col md={{ span: 11 }}>
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
                    annotationType={annotationType}
                    annotationTypes={annotationTypes}

                    ToggleModal={() => ToggleModal()}
                    SaveAnnotation={(annotation) => SaveAnnotation(annotation)}
                    ToggleEditMode={(propertyKey) => ToggleEditMode(propertyKey)}
                    UpdateModifications={(input, propertyKey) => UpdateModifications(input, propertyKey)}
                    UpdateAnnotation={(annotation, propertyKey) => UpdateAnnotation(annotation, propertyKey)}
                    RemoveAnnotation={(annotation, propertyKey) => RemoveAnnotation(annotation, propertyKey)}
                    SetAnnotationType={(type) => setAnnotationType(type)}
                />
            }
        </div >
    );
}

export default AnnotateSection;
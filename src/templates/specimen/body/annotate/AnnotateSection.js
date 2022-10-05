import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';
import './annotate.css';

/* Import API */
import GetAnnotations from 'api/annotate/GetAnnotations';
import InsertAnnotation from 'api/annotate/InsertAnnotation';
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
                } else if (!annotationsForModal[annotation['target']['indvProp']][annotation['motivation']]) {
                    annotationsForModal[annotation['target']['indvProp']][annotation['motivation']] = {[annotation['creator']]: annotation };
                } else {
                    annotationsForModal[annotation['target']['indvProp']][annotation['motivation']][annotation['creator']] = annotation;
                }
            }

            setModalAnnotations(annotationsForModal);
        }
    }

    const [annotationType, setAnnotationType] = useState('');

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
                    } else if (!copyModalAnnotations[modalProperty['property']][result['motivation']]) {
                        copyModalAnnotations[modalProperty['property']][result['motivation']] = { [result['creator']]: result };
                    } else {
                        copyModalAnnotations[modalProperty['property']][result['motivation']][result['creator']] = result ;
                    }

                    setModalAnnotations(copyModalAnnotations);
                }
            }
        }
    }

    // function UpdateAnnotation(annotation, propertyKey) {
    //     PatchAnnotation(annotation, token, Process);

    //     function Process(result) {
    //         const copyModalAnnotations = { ...modalAnnotations };

    //         copyModalAnnotations[modalProperty['property']][result['motivation']] = { [result['creator']]: result };

    //         setModalAnnotations(copyModalAnnotations);
    //     }
    // }

    function RemoveAnnotation(type) {
        const annotation = modalAnnotations[modalProperty['property']][type][UserService.getSubject()];

        DeleteAnnotation(annotation['id'], token, Process);

        function Process(success) {
            if (success) {
                const copyModalAnnotations = { ...modalAnnotations };

                delete copyModalAnnotations[modalProperty['property']][type][annotation['creator']];

                console.log(copyModalAnnotations);

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
                    annotationType={annotationType}
                    annotationTypes={annotationTypes}

                    ToggleModal={() => ToggleModal()}
                    SaveAnnotation={(annotation) => SaveAnnotation(annotation)}
                    // UpdateAnnotation={(annotation, propertyKey) => UpdateAnnotation(annotation, propertyKey)}
                    RemoveAnnotation={(annotation, propertyKey) => RemoveAnnotation(annotation, propertyKey)}
                    SetAnnotationType={(type) => setAnnotationType(type)}
                />
            }
        </div >
    );
}

export default AnnotateSection;
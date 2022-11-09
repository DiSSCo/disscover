import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';
import './annotate.scss';

/* Import API */
import InsertAnnotation from 'api/annotate/InsertAnnotation';
import DeleteAnnotation from 'api/annotate/DeleteAnnotation';

/* Import Components */
import AnnotateRow from './AnnotateRow';
import AnnotateModal from './AnnotateModal';


const AnnotateSection = (props) => {
    const specimen = props.specimen;
    const modalToggle = props.modalToggle;
    const modalProperty = props.modalProperty;
    const modalAnnotations = props.modalAnnotations;
    const annotationType = props.annotationType;

    const token = UserService.getToken();

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
                        copyModalAnnotations[modalProperty['property']][result['motivation']][result['creator']] = result;
                    }

                    props.SetModalAnnotations(copyModalAnnotations);
                }
            }
        }
    }

    function RemoveAnnotation(type) {
        const annotation = modalAnnotations[modalProperty['property']][type][UserService.getSubject()];

        DeleteAnnotation(annotation['id'], token, Process);

        function Process(success) {
            if (success) {
                const copyModalAnnotations = { ...modalAnnotations };

                delete copyModalAnnotations[modalProperty['property']][type][annotation['creator']];

                props.SetModalAnnotations(copyModalAnnotations);
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

                                        ToggleModal={(property, displayName, currentValue) => props.ToggleModal(property, displayName, currentValue)}
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

                    ToggleModal={() => props.ToggleModal()}
                    SaveAnnotation={(annotation) => SaveAnnotation(annotation)}
                    RemoveAnnotation={(annotation) => RemoveAnnotation(annotation)}
                    SetAnnotationType={(type, form) => props.SetAnnotationType(type, form)}
                />
            }
        </div >
    );
}

export default AnnotateSection;
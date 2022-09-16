import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';

/* Import Components */
import AnnotateRow from './AnnotateRow';
import AnnotateModal from './AnnotateModal';


const AnnotateSection = (props) => {
    const specimen = props.specimen;

    /* Modal handling */
    const [modalToggle, setModalToggle] = useState(false);
    const [modalProperty, setModalProperty] = useState({ 'property': '' });
    // const [modalAnnotations, setModalAnnotations] = useState([]);

    function ToggleModal(property = null, displayName = null, currentValue = null) {
        setModalToggle(!modalToggle);

        if (property && property !== modalProperty['property']) {
            let copyModalProperty = { ...modalProperty };

            copyModalProperty['property'] = property;
            copyModalProperty['displayName'] = displayName;
            copyModalProperty['currentValue'] = currentValue;

            setModalProperty(copyModalProperty);

            // GetPropertyAnnotations(property);
        }

        // function GetPropertyAnnotations(property) {
        //     /* Search for annotations data and put into view */
        //     GetAnnotations(specimen['Meta']['id']['value'], token, Process);

        //     function Process(annotations) {
        //         setModalAnnotations(annotations);
        //     }
        // }
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
            <Row className="mt-5">
                <Col md={{ span: 12 }} className="mt-5">
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

            {UserService.isLoggedIn() &&
                <AnnotateModal
                    modalToggle={modalToggle}
                    // modalAnnotations={modalAnnotations}
                    modalProperty={modalProperty}
                    // annotationInput={annotationInput}
                    // editMode={editMode}

                    ToggleModal={() => ToggleModal()}
                // UpdateAnnotationInput={(annotationInput) => UpdateAnnotationInput(annotationInput)}
                // SaveAnnotation={() => SaveAnnotation()}
                // ToggleEditMode={(propertyKey) => ToggleEditMode(propertyKey)}
                // UpdateModifications={(input, propertyKey) => UpdateModifications(input, propertyKey)}
                // UpdateAnnotation={(annotation, propertyKey, index) => UpdateAnnotation(annotation, propertyKey, index)}
                // RemoveAnnotation={(annotation, propertyKey, index) => RemoveAnnotation(annotation, propertyKey, index)}
                />
            }
        </div >
    );
}

export default AnnotateSection;
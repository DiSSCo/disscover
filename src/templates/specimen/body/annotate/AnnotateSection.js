import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';
import './annotate.scss';


/* Import Components */
import AnnotateRow from './AnnotateRow';
import AnnotateModal from './AnnotateModal';


const AnnotateSection = (props) => {
    const specimen = props.specimen;
    const modalToggle = props.modalToggle;
    const modalProperty = props.modalProperty;
    const modalAnnotations = props.modalAnnotations;
    const annotationType = props.annotationType;

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
                    targetId={specimen['Meta']['id']['value']}
                    targetType={'digital_specimen'}

                    modalToggle={modalToggle}
                    modalAnnotations={modalAnnotations}
                    modalProperty={modalProperty}
                    annotationType={annotationType}

                    ToggleModal={() => props.ToggleModal()}
                    SetAnnotationType={(type, form) => props.SetAnnotationType(type, form)}
                    SetModalAnnotations={(modalAnnotations) => props.SetModalAnnotations(modalAnnotations)}
                />
            }
        </div >
    );
}

export default AnnotateSection;
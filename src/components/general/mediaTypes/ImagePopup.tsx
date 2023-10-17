/* Import Dependencies */
import classNames from 'classnames';
import { Formik, Form, Field } from 'formik';
import KeycloakService from 'keycloak/Keycloak';
import { ImageAnnotation } from '@annotorious/react';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import styles from './mediaTypes.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    selectedAnnotation: ImageAnnotation,
    editAnnotation: ImageAnnotation,
    tooltipFieldRef: any,
    annotorious: any,

    RefreshAnnotations: Function,
    SubmitAnnotation: Function,
    SetSelectedAnnotation: Function,
    SetEditAnnotation: Function,
    RemoveAnnotation: Function
};


const ImagePopup = (props: Props) => {
    const { selectedAnnotation, editAnnotation, tooltipFieldRef, annotorious,
        RefreshAnnotations, SubmitAnnotation, SetSelectedAnnotation, SetEditAnnotation, RemoveAnnotation } = props;

    /* Function for validating Annotation value input */
    const ValidateAnnotation = (values: Dict) => {
        const errors: Dict = {};

        if (!values.annotationValue) {
            errors.annotationValue = "Empty annotations are not accepted";
        }

        return errors;
    }

    /* ClassNames */
    const classEditBlock = classNames({
        'd-none': !editAnnotation
    });

    const classInfoBlock = classNames({
        'd-none': editAnnotation
    });

    return (
        <div className={styles.annotoriousPopUp}>
            <Row>
                <Col className="bgc-white px-3 py-2">
                    {/* Annotation values */}
                    <Row className={`${styles.annotoriousPopUpSection} pb-2`}>
                        <Col>
                            <div className={classEditBlock}>
                                <Formik
                                    initialValues={{
                                        annotationValue: editAnnotation?.body.length ?
                                            editAnnotation.body[0].value[0] : '',
                                    }}
                                    enableReinitialize={true}
                                    validate={ValidateAnnotation}
                                    onSubmit={async (form) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));

                                        /* Submit new Annotation */
                                        if (!selectedAnnotation.body.length) {
                                            /* Patch Annotation */
                                            SubmitAnnotation([form.annotationValue], 'insert');
                                        } else {
                                            /* Insert Annotation */
                                            SubmitAnnotation([form.annotationValue], 'patch')
                                        }
                                    }}
                                >
                                    {({ errors }) => (
                                        <Form>
                                            <Row>
                                                <Col>
                                                    <Field name="annotationValue"
                                                        type="text"
                                                        innerRef={tooltipFieldRef}
                                                        className="w-100 formField fs-4 py-1"
                                                    />

                                                    {errors.annotationValue &&
                                                        <p className="fs-5 c-denied mt-2">
                                                            {errors.annotationValue as string}
                                                        </p>
                                                    }
                                                </Col>
                                                <Col className="col-md-auto ps-0">
                                                    <button type="submit"
                                                        className="secondaryButton fs-4 px-3"
                                                    >
                                                        Save
                                                    </button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    )}
                                </Formik>
                            </div>

                            <div className={classInfoBlock}>
                                <Row>
                                    <Col>
                                        <p className="fs-4">
                                            {(selectedAnnotation?.body && selectedAnnotation.body.length) ?
                                                selectedAnnotation.body[0].value[0] : ''
                                            }
                                        </p>
                                    </Col>
                                    {(KeycloakService.IsLoggedIn() && selectedAnnotation?.body.length
                                        && KeycloakService.GetSubject() === selectedAnnotation.body[0].creator.id) &&
                                        <>
                                            <Col className="col-md-auto">
                                                <FontAwesomeIcon icon={faPencil}
                                                    className="c-pointer"
                                                    onClick={() => SetEditAnnotation(selectedAnnotation)}
                                                />
                                            </Col>
                                            <Col className="col-md-auto ps-0">
                                                <FontAwesomeIcon icon={faTrashCan}
                                                    className="c-pointer"
                                                    onClick={() => RemoveAnnotation()}
                                                />
                                            </Col>
                                        </>
                                    }
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    {/* Close button */}
                    <Row className="mt-3">
                        <Col className="d-flex justify-content-end">
                            <button type="button"
                                className="primaryButton fs-4 px-3"
                                onClick={() => {
                                    if (!selectedAnnotation.body.length) {
                                        /* Remove when annotation was left empty */
                                        RefreshAnnotations();
                                    }

                                    SetSelectedAnnotation(null);

                                    annotorious.state.selection.clear();
                                }}
                            >
                                {selectedAnnotation ?
                                    <span> Close </span>
                                    : <span> Cancel </span>
                                }
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default ImagePopup;
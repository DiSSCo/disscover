/* Import Dependencies */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Formik, Form, Field } from 'formik';
import KeycloakService from 'keycloak/Keycloak';
import Moment from 'moment';
import { Capitalize } from 'app/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMediaAnnotations } from 'redux/digitalMedia/DigitalMediaSlice';
import { getUser } from 'redux/user/UserSlice';

/* Import Types */
import { Dict } from 'app/Types';
import { Annotation } from 'app/types/Annotation';

/* Import Styles */
import styles from './mediaTypes.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    tooltipFieldRef: any,
    annotorious: any,

    SubmitAnnotation: Function,
    RemoveAnnotation: Function
};


const ImagePopup = (props: Props) => {
    const { tooltipFieldRef, annotorious, SubmitAnnotation, RemoveAnnotation } = props;

    /* Base variables */
    const user = useAppSelector(getUser);
    const digitalMediaAnnotations = useAppSelector(getDigitalMediaAnnotations);
    const [editMode, setEditMode] = useState<boolean>(false);
    const annotoriousAnnotation = annotorious.getSelected()[0];
    const selectedAnnotation: Annotation | undefined = digitalMediaAnnotations.visual.find((annotation) => annotation['ods:id'] === annotoriousAnnotation.id);

    /* OnChange of Selected Annotation in Annotorious: check if it is a template for a new Annotation, if so, set Edit Mode to true */
    useEffect(() => {
        if (annotoriousAnnotation && !annotoriousAnnotation.id.includes('20.5000.1025') && !annotoriousAnnotation.id.includes('TEST')) {
            setEditMode(true);
        }
    }, [annotoriousAnnotation]);

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
        'd-none': !editMode
    });

    const classInfoBlock = classNames({
        'd-none': editMode
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
                                        annotationValue: selectedAnnotation ? selectedAnnotation['oa:body']['oa:value'] : ''
                                    }}
                                    enableReinitialize={true}
                                    validate={ValidateAnnotation}
                                    onSubmit={async (form) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));

                                        /* Submit new Annotation */
                                        if (!annotoriousAnnotation.id.includes('20.5000.1025') && !annotoriousAnnotation.id.includes('TEST')) {
                                            /* Insert Annotation */
                                            SubmitAnnotation([form.annotationValue], 'insert');
                                        } else {
                                            /* Patch Annotation */
                                            SubmitAnnotation([form.annotationValue], 'patch', );

                                            /* Disable edit mode */
                                            setEditMode(false);
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
                                                            {errors.annotationValue}
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

                            {selectedAnnotation &&
                                <div className={classInfoBlock}>
                                    {/* Creator and Actions */}
                                    <Row>
                                        <Col>
                                            <p className="c-primary fw-lightBold"> {selectedAnnotation['oa:creator']['foaf:name']} </p>
                                        </Col>
                                        <Col className="col-md-auto">
                                            <p className="c-primary"> {Moment(selectedAnnotation['dcterms:created']).format('MMMM DD - YYYY')} </p>
                                        </Col>
                                    </Row>
                                    {/* ID and Version */}
                                    <Row>
                                        <Col>
                                            <p className="fs-4 c-grey"> {selectedAnnotation['ods:id']} </p>
                                        </Col>
                                        <Col className="col-md-auto">
                                            <p className="fs-4 c-grey"> Version: {selectedAnnotation['ods:version']} </p>
                                        </Col>
                                    </Row>
                                    {/* Motivation and Value */}
                                    <Row className="mt-2">
                                        <Col className="col-md-auto pe-0">
                                            <p className="c-primary fw-lightBold"> {Capitalize(selectedAnnotation['oa:motivation'].replace('oa:', '').replace('ods:', ''))}: </p>
                                        </Col>
                                        <Col className="ps-1">
                                            <p>
                                                {selectedAnnotation['oa:body']['oa:value'][0] as string ?? ''}
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            }
                        </Col>
                    </Row>
                    {/* Actions and Close button */}
                    <Row className="mt-3">
                        <Col>
                            <button type="button"
                                className="primaryButton fs-4 px-3"
                                onClick={() => annotorious.cancelSelected()}
                            >
                                {editMode ?
                                    <span> Cancel </span>
                                    : <span> Close </span>
                                }
                            </button>
                        </Col>
                        {(KeycloakService.IsLoggedIn() && !editMode && user.orcid && selectedAnnotation && user.orcid === selectedAnnotation['oa:creator']['ods:id']) &&
                            <>
                                <Col className="col-md-auto">
                                    <FontAwesomeIcon icon={faPencil}
                                        className="c-pointer c-primary"
                                        onClick={() => setEditMode(true)}
                                    />
                                </Col>
                                <Col className="col-md-auto ps-0">
                                    <FontAwesomeIcon icon={faTrashCan}
                                        className="c-pointer c-primary"
                                        onClick={() => RemoveAnnotation(selectedAnnotation)}
                                    />
                                </Col>
                            </>
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default ImagePopup;
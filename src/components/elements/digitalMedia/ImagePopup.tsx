/* Import Dependencies */
import { useAnnotator, useSelection } from "@annotorious/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from 'date-fns';
import { Formik, Form, Field } from "formik";
import KeycloakService from "app/Keycloak";
import { useRef } from "react";
import { Row, Col } from "react-bootstrap";

/* Import Hooks */
import { useNotification, useTrigger } from "app/Hooks";

/* Import Types */
import { Annotation } from "app/types/Annotation";

/* Import Styles */
import styles from './DigitalMedia.module.scss';

/* Import Icons */
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

/* Import API */
import DeleteAnnotation from "api/annotation/DeleteAnnotation";

/* Import Components */
import { Button, LoadingScreen } from "../customUI/CustomUI";


/* Props Type */
type Props = {
    annotation?: Annotation,
    editAnnotationWithId?: string,
    loading: boolean,
    SetAnnotoriousMode: Function,
    SetEditAnnotationWithId: Function,
    SubmitAnnotation: Function,
    RefreshAnnotations: Function,
    ToggleLoading: Function
};


/**
 * Component that renders the image popup that appears when clicking on a visual annotation in the image viewer
 * @param annotation The annotation to be represented in the popup
 * @param editAnnotationWithId String holding the identifier of the annotation being annotated
 * @param loading Boolean indicating if the loading state is active
 * @param SetAnnotoriousMode Function to set the Annotorious mode
 * @param SetEditAnnotationWithId Function to set the edit annotation with ID state
 * @param SubmitAnnotation Function to submit the visual annotation
 * @param RefreshAnnotations Function to refresh the visual annotations on the canvas
 * @param ToggleLoading Function to the loading state
 * @returns JSX Component
 */
const ImagePopup = (props: Props) => {
    const { annotation, editAnnotationWithId, loading, SetAnnotoriousMode, SetEditAnnotationWithId, SubmitAnnotation, RefreshAnnotations, ToggleLoading } = props;

    /* Hooks */
    const annotorious = useAnnotator();
    const annotationValueFieldRef = useRef<HTMLInputElement>(null);
    const notification = useNotification();
    const trigger = useTrigger();

    /* Base variables */
    const annotoriousAnnotation = useSelection().selected[0].annotation;
    const isExistingAnnotation = annotoriousAnnotation.id.includes('/');
    const initialFormValues: {
        annotationValue: string
    } = {
        annotationValue: annotation ? annotation["oa:hasBody"]["oa:value"][0] : ''
    };
    let userTag: string = annotation?.['dcterms:creator']['schema:name'] ?? annotation?.['dcterms:creator']['@id'] ?? '';

    /* OnChange of annotation value field ref, set focus on field if adding or editing the annotation */
    trigger.SetTrigger(() => {
        if (annotationValueFieldRef && !isExistingAnnotation) {
            annotationValueFieldRef.current?.focus();
        }
    }, [annotationValueFieldRef]);

    return (
        <div className={`${styles.imagePopup} position-relative px-4 pt-2 pb-3 bgc-white b-grey br-corner box-shadow overflow-hidden`}>
            {/* If annotation does not exist or is being edited, show form */}
            {(!isExistingAnnotation || editAnnotationWithId) ?
                <Formik initialValues={initialFormValues}
                    onSubmit={async (values) => {
                        await new Promise((resolve) => setTimeout(resolve, 100));

                        SubmitAnnotation(values.annotationValue);
                    }}
                >
                    <Form className="h-100">
                        {/* Title */}
                        <Row>
                            <Col>
                                <p className="tc-primary fw-bold">
                                    {`${!editAnnotationWithId ? 'New' : 'Edit'} annotation`}
                                </p>
                            </Col>
                        </Row>
                        {/* Annotation value input field */}
                        <Row className="mt-2">
                            <Col>
                                <Field name="annotationValue"
                                    placeholder="Annotation value"
                                    className="w-100 px-2 py-1 br-corner"
                                    innerRef={annotationValueFieldRef}
                                    autoComplete="off"
                                />
                            </Col>
                        </Row>
                        {/* Submit button */}
                        <Row className="mt-3">
                            <Col>
                                <Button type="button"
                                    variant="grey"
                                    OnClick={() => {
                                        if (editAnnotationWithId) {
                                            SetEditAnnotationWithId(undefined);
                                        } else {
                                            annotorious.cancelSelected();
                                            SetAnnotoriousMode('move');
                                        }
                                    }}
                                >
                                    <p>Cancel</p>
                                </Button>
                            </Col>
                            <Col lg="auto">
                                <Button type="submit"
                                    variant="primary"
                                >
                                    <p>Save Annotation</p>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Formik>
                : <>
                    {annotation &&
                        <div className="h-100 d-flex flex-column">
                            {/* Creator and identifier; modificiation date and version */}
                            <Row>
                                <Col>
                                    <p className="fs-4 tc-primary fw-lightBold">
                                        {userTag}
                                    </p>
                                    <p className="fs-5 tc-grey">
                                        {annotation["ods:ID"].replace(import.meta.env.VITE_HANDLE_URL, '')}
                                    </p>
                                </Col>
                                <Col lg="auto">
                                    <p className="fs-4 tc-primary fw-lightBold">
                                        {format(annotation['dcterms:modified'], 'MMMM dd - yyyy')}
                                    </p>
                                    <p className="fs-5 tc-grey d-flex justify-content-end">
                                        {`Version ${annotation["ods:version"]}`}
                                    </p>
                                </Col>
                            </Row>
                            {/* Annotation value */}
                            <Row className="flex-grow-1 overflow-scroll mt-3">
                                <Col>
                                    <p className="fs-4">
                                        <span className="fw-bold">Value: </span>
                                        {annotation["oa:hasBody"]["oa:value"][0]}
                                    </p>
                                </Col>
                            </Row>
                            {/* If annotation belongs to user, show options to edit or delete the annotation */}
                            {KeycloakService.GetParsedToken()?.orcid === annotation["dcterms:creator"]["@id"] &&
                                <Row className="flex-row-reverse">
                                    <Col lg="auto"
                                        className="ps-0"
                                    >
                                        <Button type="button"
                                            variant="blank"
                                            className="px-0 py-0"
                                            OnClick={async () => {
                                                if (window.confirm(`Are you sure, you want to delete this annotation with ID: ${annotation['ods:ID']}?`)) {
                                                    ToggleLoading();

                                                    try {
                                                        await DeleteAnnotation({ annotationId: annotation['ods:ID'] });

                                                        /* Refresh annotations */
                                                        RefreshAnnotations();
                                                    } catch {
                                                        notification.Push({
                                                            key: `${annotation['ods:ID']}-${Math.random()}`,
                                                            message: `Failed to delete the annotation. Please try deleting it again.`,
                                                            template: 'error'
                                                        });
                                                    } finally {
                                                        ToggleLoading();
                                                    };
                                                }
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTrashCan}
                                                className="tc-primary"
                                            />
                                        </Button>
                                    </Col>
                                    <Col lg="auto">
                                        <Button type="button"
                                            variant="blank"
                                            className="px-0 py-0"
                                            OnClick={() => {
                                                SetEditAnnotationWithId(annotation["ods:ID"]);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPencil}
                                                className="tc-primary"
                                            />
                                        </Button>
                                    </Col>
                                </Row>
                            }
                        </div>
                    }
                </>
            }

            <LoadingScreen visible={loading}
                text="Saving annotation"
                displaySpinner
            />
        </div>
    );
};

export default ImagePopup;
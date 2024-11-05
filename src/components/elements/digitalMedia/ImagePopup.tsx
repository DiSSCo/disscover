/* Import Dependencies */
import { useSelection } from "@annotorious/react";
import { format } from 'date-fns';
import { Formik, Form, Field } from "formik";
import { useRef } from "react";
import { Row, Col } from "react-bootstrap";

/* Import Hooks */
import { useTrigger } from "app/Hooks";

/* Import Types */
import { Annotation } from "app/types/Annotation";

/* Import Styles */
import styles from './DigitalMedia.module.scss';

/* Import Components */
import { Button, LoadingScreen } from "../customUI/CustomUI";


/* Props Type */
type Props = {
    annotation?: Annotation,
    loading: boolean,
    SubmitAnnotation: Function
};


/**
 * Component that renders the image popup that appears when clicking on a visual annotation in the image viewer
 * @param annotation The annotation to be represented in the popup
 * @param loading Boolean indicating if the loading state is active
 * @param SubmitAnnotation Function to submit the visual annotation
 * @returns JSX Component
 */
const ImagePopup = (props: Props) => {
    const { annotation, loading, SubmitAnnotation } = props;

    /* Hooks */
    const annotationValueFieldRef = useRef<HTMLInputElement>(null);
    const trigger = useTrigger();

    /* Base variables */
    const annotoriousAnnotation = useSelection().selected[0].annotation;
    const isExistingAnnotation = annotoriousAnnotation.id.includes('/');
    const initialFormValues: {
        annotationValue: string
    } = {
        annotationValue: ''
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
            {!isExistingAnnotation ?
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
                                    New annotation
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
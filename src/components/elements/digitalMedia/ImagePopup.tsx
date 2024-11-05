/* Import Dependencies */
import { useSelection } from "@annotorious/react";
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
    annotations: Annotation[],
    loading: boolean,
    SubmitAnnotation: Function
};


/**
 * Component that renders the image popup that appears when clicking on a visual annotation in the image viewer
 * @param annotations The annotations of the digital media item
 * @param loading Boolean indicating if the loading state is active
 * @param SubmitAnnotation Function to submit the visual annotation
 * @returns JSX Component
 */
const ImagePopup = (props: Props) => {
    const { annotations, loading, SubmitAnnotation } = props;

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

    /* OnChange of annotation value field ref, set focus on field if adding or editing the annotation */
    trigger.SetTrigger(() => {
        if (annotationValueFieldRef && !isExistingAnnotation) {
            annotationValueFieldRef.current?.focus();
        }
    }, [annotationValueFieldRef]);

    return (
        <div className={`${styles.imagePopup} position-relative px-4 pt-2 pb-3 bgc-white b-grey br-corner box-shadow`}>
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
                : <div>
                    {/* Creator and date */}
                    <Row>
                        <Col>

                        </Col>
                    </Row>
                </div>
            }
            
            <LoadingScreen visible={loading}
                text="Saving annotation"
                displaySpinner
            />
        </div>
    );
};

export default ImagePopup;
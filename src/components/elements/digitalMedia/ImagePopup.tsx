/* Import Dependencies */
import { useSelection } from "@annotorious/react";
import { Formik, Form, Field } from "formik";
import { Row, Col } from "react-bootstrap";

/* Import Types */
import { Annotation } from "app/types/Annotation";

/* Import Styles */
import styles from './DigitalMedia.module.scss';

/* Import Components */
import { Button } from "../customUI/CustomUI";


/* Props Type */
type Props = {
    annotations: Annotation[]
};


/**
 * Component that renders the image popup that appears when clicking on a visual annotation in the image viewer
 * @returns JSX Component
 */
const ImagePopup = (props: Props) => {
    const { annotations } = props;

    /* Base variables */
    const annotoriousAnnotation = useSelection().selected[0].annotation;
    const isExistingAnnotation = !!annotations.find((annotation) => annotation['ods:ID'] === annotoriousAnnotation.id);
    const initialFormValues: {
        annotationValue: string
    } = {
        annotationValue: ''
    };

    return (
        <div className={`${styles.imagePopup} px-4 pt-2 pb-3 bgc-white b-grey br-corner box-shadow`}>
            {/* If annotation does not exist or is being edited, show form */}
            {!isExistingAnnotation ?
                <Formik initialValues={initialFormValues}
                    onSubmit={async (form) => {
                        await new Promise((resolve) => setTimeout(resolve, 100));


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
        </div>
    );
};

export default ImagePopup;
/* Import Dependencies */
import { Field } from "formik";
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { AnnotationFormProperty } from "app/Types";


/* Props Type */
type Props = {
    fieldProperty: AnnotationFormProperty,
    fieldName: string
};


/**
 * Component that renders a string field for terms with the type of boolean in the annotation wizard form
 * @param fieldProperty The annotation form field property that corresponds to the targetted term
 * @param fieldName The name of the annotation form field
 * @returns JSX Component
 */
const BooleanField = (props: Props) => {
    const { fieldProperty, fieldName } = props;

    return (
        <div>
            <Row>
                <Col lg="auto"
                    className="pe-0"
                >
                    <Field name={`annotationValues.${fieldName}`}
                        type="checkbox"
                        className="w-100 b-grey br-corner mt-1 py-1 px-2"
                    />
                </Col>
                <Col className="d-flex align-items-center">
                    <p className="fs-4">
                        {fieldProperty.name}
                    </p>
                </Col>
            </Row>
        </div>
    );
};

export default BooleanField;
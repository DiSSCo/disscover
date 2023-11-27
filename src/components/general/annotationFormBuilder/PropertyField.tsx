/* Import Dependencies */
import { Field } from "formik";
import { Row, Col } from 'react-bootstrap';


/* Props Typing */
interface Props {
    name: string
};


const PropertyField = (props: Props) => {
    const { name } = props;

    return (
        <Row className="mt-3">
            <Col>
                <p> {name.split('.').pop()} </p>

                <Field name={name}
                    className="w-100"
                />
            </Col>
        </Row>
    );
}

export default PropertyField;
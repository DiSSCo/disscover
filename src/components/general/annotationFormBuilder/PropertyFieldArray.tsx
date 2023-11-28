/* Import Dependencies */
import { Field } from "formik";
import { ExtractFromSchema } from "app/utilities/AnnotationUtilities";
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from "app/Types";


/* Props Typing */
interface Props {
    name: string,
    classProperties?: {},
    Remove?: Function
};


const PropertyFieldArray = (props: Props) => {
    const { name, classProperties, Remove } = props;

    /* Base variables */
    const properties = ExtractFromSchema(name.split('.').pop() as string);
    const arrayIndexes: Dict[] = classProperties?.[name.split('.').pop() as keyof typeof classProperties] as unknown as Dict[];

    return (
        <>
            {(arrayIndexes && arrayIndexes.length) ? arrayIndexes.map((_, index) => {
                return (
                    <div className={`${index > 0 ? 'b-top-grey pt-2' : ''} mt-3`}>
                        <Row>
                            <Col>
                                <p className="fw-lightBold"> {`${name.split('.').pop()} #${index + 1}`} </p>
                            </Col>
                            <Col className="col-md-auto">
                                <p className="c-denied c-pointer"
                                    onClick={() => Remove && Remove(index)}
                                >
                                    Remove this index
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {Object.keys(properties).map((propertyName, index) => {
                                    return (
                                        <Row className="mt-3">
                                            <Col>
                                                <p> {propertyName} </p>

                                                <Field name={`${name}[${index}][${propertyName}]`}
                                                    className="formField w-100"
                                                />
                                            </Col>
                                        </Row>
                                    );
                                })}
                            </Col>
                        </Row>
                    </div>
                );
            }) : <p className="mt-3"> Press the plus icon to add a new instance of this array </p>}
        </>
    );
}

export default PropertyFieldArray;
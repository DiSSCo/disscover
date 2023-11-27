/* Import Dependencies */
import { FieldArray, Field } from "formik";
import { ExtractFromSchema } from "app/utilities/AnnotationUtilities";
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from "app/Types";


/* Props Typing */
interface Props {
    name: string,
    classProperties?: {}
};


const PropertyFieldArray = (props: Props) => {
    const { name, classProperties } = props;

    /* Base variables */
    const properties = ExtractFromSchema(name.split('.').pop() as string);
    const initialValues: Dict = {};
    const arrayIndexes: Dict[] = classProperties?.[name.split('.').pop() as keyof typeof classProperties] as unknown as Dict[];

    /* Create initial values for value index */
    for (const propertyName in properties) {
        initialValues[propertyName] = '';
    }

    return (
        <FieldArray name={name}>
            {({ push, remove }) => (
                <div className="bgc-accent">
                    <button type="button"
                        onClick={() => push(initialValues)}
                    >
                        Add {name.split('.').pop() as string}
                    </button>

                    {arrayIndexes && arrayIndexes.map((indexValue) => {
                        return (
                            <>
                                {Object.keys(properties).map((propertyName, index) => {
                                    const property = properties[propertyName as keyof typeof properties];

                                    return (
                                        <Row>
                                            <Col>
                                                <p> {propertyName} </p>

                                                <Field name={`${name}[${index}][${propertyName}]`}
                                                    className="w-100"
                                                />
                                            </Col>
                                        </Row>
                                    );
                                })}
                            </>
                        );
                    })}
                </div>
            )}
        </FieldArray>
    );
}

export default PropertyFieldArray;
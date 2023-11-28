/* Import Dependencies */
import { cloneElement } from 'react';
import { FieldArray } from 'formik';
import { ExtractFromSchema } from 'app/utilities/AnnotationUtilities';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    title: string,
    fields: JSX.Element[],
    classProperties: Dict
};


const ArrayTemplate = (props: Props) => {
    const { title, fields, classProperties } = props;

    /* Base variables */
    const properties = ExtractFromSchema(fields[0].props.name.split('.').pop() as string)
    const initialValues: Dict = {};

    /* Create initial values for value index */
    for (const propertyName in properties) {
        initialValues[propertyName] = '';
    }

    return (
        <div className="mb-3">
            <FieldArray name={fields[0].props.name}>
                {({ push, remove }) => (
                    <>
                        <Row>
                            <Col className="bgc-secondary c-white px-4 py-2">
                                <Row>
                                    <Col>
                                        <p className="fs-3 fw-lightBold"> {title} </p>
                                    </Col>
                                    <Col className="col-md-auto">
                                        <FontAwesomeIcon icon={faPlus} onClick={() => push(initialValues)}
                                            className="c-pointer"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="px-5">
                                {fields.map((field) => {
                                    const fieldArray = cloneElement(field, {
                                        classProperties: classProperties,
                                        Remove: (index: number) => remove(index)
                                    });

                                    return fieldArray;
                                })}
                            </Col>
                        </Row>
                    </>
                )}
            </FieldArray>
        </div>
    );
}

export default ArrayTemplate;
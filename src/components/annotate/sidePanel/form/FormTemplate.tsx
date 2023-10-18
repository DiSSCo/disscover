/* Import Dependencies */
import { isEmpty } from 'lodash';
import { Field } from 'formik';
import { Capitalize } from 'app/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Sources */
import AnnotationMotivations from 'sources/annotationMotivations.json';

/* Import Components */
import ValueField from './ValueField';


/* Props Typing */
interface Props {
    motivation: string
};


const FormTemplate = (props: Props) => {
    const { motivation } = props;

    /* Base variables */
    const annotationMotivations = { ...AnnotationMotivations };
    const motivationObject = annotationMotivations[motivation as keyof typeof annotationMotivations];

    return (
        <Row>
            <Col>
                {/* Value Field */}
                <p className="formFieldTitle pb-1"> Annotation value </p>
                <ValueField motivationObject={motivationObject} />

                {/* Generate additional form fields based upon chosen motivation */}
                {!isEmpty(motivationObject.additionalFields) &&
                    <>
                        {Object.entries(motivationObject.additionalFields).map((additionalField) => {
                            if (additionalField[1] === 'string') {
                                return (
                                    <div key={additionalField[0]} className="mt-3">
                                        <p className="formFieldTitle pb-1"> {Capitalize(additionalField[0])} </p>
                                        <Field name={`additionalFields.${additionalField[0]}`}
                                            className="formField w-100"
                                        />
                                    </div>
                                );
                            } else if (additionalField[1] === 'text') {
                                return (
                                    <div key={additionalField[0]} className="mt-3">
                                        <p className="formFieldTitle pb-1"> {Capitalize(additionalField[0])} </p>
                                        <Field name={`additionalFields.${additionalField[0]}`} as="textarea"
                                            className="formField w-100"
                                        />
                                    </div>
                                );
                            }
                        })}
                    </>
                }
            </Col>
        </Row>
    );
}

export default FormTemplate;
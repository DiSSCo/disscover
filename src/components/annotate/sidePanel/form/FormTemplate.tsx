/* Import Dependencies */
import { isEmpty } from 'lodash';
import { Field } from 'formik';
import { Capitalize } from 'app/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Sources */
import AnnotationMotivations from 'sources/annotationMotivations.json';

/* Import Components */
import ValueField from './ValueField';
import ObjectTemplate from './ObjectTemplate';
import ArrayTemplate from './ArrayTemplate';


/* Props Typing */
interface Props {
    motivation: string,
    classValue: string,
    formValues: Dict,
    classFormFields: Dict
};


const FormTemplate = (props: Props) => {
    const { motivation, classValue, formValues, classFormFields } = props;

    /* Base variables */
    const annotationMotivations = { ...AnnotationMotivations };
    const motivationObject = annotationMotivations[motivation as keyof typeof annotationMotivations];

    return (
        <Row className="h-100">
            <Col className="h-100">
                <div className="h-100 d-flex flex-column">
                    <Row>
                        <Col>
                            {/* If a field property is selected */}
                            {(!classValue || !['ods:adding', 'oa:editing'].includes(motivation)) &&
                                <>
                                    {/* Value Field */}
                                    <p className="formFieldTitle pb-1"> Annotation value </p>
                                    <ValueField motivationObject={motivationObject} />
                                </>
                            }

                            {/* Generate additional form fields based upon chosen motivation */}
                            {!isEmpty(motivationObject.additionalFields) &&
                                <>
                                    {Object.entries(motivationObject.additionalFields).map((additionalField, index) => {
                                        if (additionalField[1] === 'string') {
                                            return (
                                                <div key={additionalField[0]} className={(!classValue || index > 0) ? 'mt-3' : ''}>
                                                    <p className="formFieldTitle pb-1"> {Capitalize(additionalField[0])} </p>
                                                    <Field name={`additionalFields.${additionalField[0]}`}
                                                        className="formField w-100"
                                                    />
                                                </div>
                                            );
                                        } else if (additionalField[1] === 'text') {
                                            return (
                                                <div key={additionalField[0]} className={(!classValue || index > 0) ? 'mt-3' : ''}>
                                                    <p className="formFieldTitle pb-1"> {Capitalize(additionalField[0])} </p>
                                                    <Field name={`additionalFields.${additionalField[0]}`} as="textarea"
                                                        className="formField no-resize w-100"
                                                    />
                                                </div>
                                            );
                                        }
                                    })}
                                </>
                            }
                        </Col>
                    </Row>

                    {/* If annotating a class instance and motivation is adding or editing: show all fields */}
                    {(classValue && (motivation === 'ods:adding' || motivation === 'oa:editing')) &&
                        <Row className="flex-grow-1 overflow-hidden">
                            <Col className="h-100 py-3">
                                <div className="b-grey h-100 overflow-y-scroll overflow-x-hidden pb-3">
                                    {Object.keys(classFormFields).map((classKey) => {
                                        const classData = classFormFields[classKey];
                                        const template = (classData.template === 'object') ?
                                            <ObjectTemplate key={classKey}
                                                title={classData.title}
                                                fields={classData.fields}
                                            />
                                            : <ArrayTemplate key={classKey}
                                                title={classData.title}
                                                fields={classData.fields}
                                                classProperties={formValues.classProperties}
                                            />;

                                        return template;
                                    })}
                                </div>
                            </Col>
                        </Row>
                    }
                </div>
            </Col>
        </Row>
    );
}

export default FormTemplate;
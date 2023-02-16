/* Import Dependencies */
import { Field, FieldArray } from 'formik';
import { Capitalize } from 'global/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { AnnotationMotivation, Dict } from 'global/Types';

/* Import Sources */
import AnnotationMotivations from 'sources/annotationMotivations.json';

/* Import Components */
import ValueField from './ValueField';


/* Props Typing */
interface Props {
    motivation: string
    property: string,
    targetType: string,
    formValues: Dict
};


const FormTemplate = (props: Props) => {
    const { motivation, property, targetType, formValues } = props;

    /* Base variables */
    const annotationMotivations: Dict = AnnotationMotivations;
    const motivationSpecs: AnnotationMotivation = annotationMotivations[motivation];

    return (
        <Row className="mt-3">
            <Col>
                <Row>
                    <Col md={{ span: 9 }}>
                        <div className="annotate_annotationTypeContext px-2 py-2 bg-primary-light">
                            {motivationSpecs.context}
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <p className="annotate_annotationTypeFieldTitle"> Chosen attribute: </p>

                        <Field type="text" className="annotate_annotationTypeField w-100"
                            disabled
                            name="property"
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p className="annotate_annotationTypeFieldTitle"> Value: </p>

                        {/*(annotation.body.value.length > 1) ?
                            props.RenderMultipleMode('adding')
                            :*/
                        }

                        <FieldArray name="value">
                            {({ remove, push }) => (
                                formValues.value.map((value: string, i: number) => {
                                    const key = `value${i}`;

                                    return (
                                        <ValueField key={key}
                                            name={`value.${i}`}
                                            property={property}
                                            targetType={targetType}
                                        />
                                    );
                                })
                            )}
                        </FieldArray>
                    </Col>
                </Row>

                {Object.keys(motivationSpecs.additionalFields).map((additionalField: string) => {
                    const additionalFieldType = motivationSpecs.additionalFields[additionalField];

                    return (
                        <Row key={additionalField} className="mt-3">
                            <Col>
                                <p className="annotate_annotationTypeFieldTitle"> {Capitalize(additionalField)}: </p>

                                {(additionalFieldType === 'textArea') ?
                                    <Field type="text" name={additionalField}
                                        component="textarea"
                                        className="annotate_annotationTypeTextArea w-100"
                                        rows={4}
                                    />
                                    : <Field type="text" name={additionalField}
                                        className="annotate_annotationTypeField w-100"
                                    />
                                }
                            </Col>
                        </Row>
                    );
                })}
            </Col>
        </Row>
    );

}

export default FormTemplate;
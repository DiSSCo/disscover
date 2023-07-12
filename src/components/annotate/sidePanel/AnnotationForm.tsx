/* Import Components */
import { Formik, Form, Field } from 'formik';
import { isEmpty } from 'lodash';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getAnnotateTarget, setAnnotateTarget } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Sources */
import HarmonisedAttributes from 'sources/hamonisedAttributes.json';
import AnnotationMotivations from 'sources/annotationMotivations.json';

/* Import API */
import InsertAnnotation from 'api/annotate/InsertAnnotation';

/* Import Components */
import FormTemplate from './form/FormTemplate';


/* Props Typing */
interface Props {
    ToggleAnnotationForm: Function
};


const AnnotationForm = (props: Props) => {
    const { ToggleAnnotationForm } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const harmonisedAttributes = { ...HarmonisedAttributes };
    const annotationMotivations = { ...AnnotationMotivations };
    const defaultTargetProperties = [
        'ods:physicalSpecimenId', 'ods:physicalSpecimenIdType',
        'ods:specimenName', 'ods:type', 'ods:organisationId'
    ];

    /* Function for submitting a new Annotation */
    const SubmitAnnotation = (form: Dict) => {
        /* Prepare new Annotation object */
        const annotation = {
            type: 'Annotation',
            motivation: form.motivation,
            body: {
                type: form.targetProperty,
                value: form.annotationValue,
                ...(!isEmpty(form.additionalFields) && { ...form.additionalFields }),
            },
            target: {
                id: annotateTarget.target.id,
                type: annotateTarget.targetType,
                indvProp: form.targetProperty
            }
        };

        /* Post Annotation */
        InsertAnnotation(annotation, KeycloakService.GetToken()).then((annotation) => {
            /* Update Annotations array of target */
            const copyAnnotateTarget = { ...annotateTarget };
            const copyAnnotations = [...copyAnnotateTarget.annotations];

            copyAnnotations.push(annotation);
            copyAnnotateTarget.annotations = copyAnnotations;

            dispatch(setAnnotateTarget(copyAnnotateTarget));

            /* Return to Annotations overview */
            ToggleAnnotationForm();
        }).catch(error => {
            console.warn(error);
        });
    }

    return (
        <Formik
            initialValues={{
                targetProperty: annotateTarget.property,
                motivation: '',
                annotationValue: '',
                additionalFields: {}
            }}
            enableReinitialize={true}
            onSubmit={async (form) => {
                await new Promise((resolve) => setTimeout(resolve, 500));

                /* Submit new Annotation */
                SubmitAnnotation(form);
            }}
        >
            {({ values }) => (
                <Form className="h-100 d-flex flex-column">
                    {/* Initial form fields: target property and motivation */}
                    <Row>
                        <Col>
                            {/* If not present, Target Property */}
                            {!annotateTarget.property &&
                                <Row className="mt-5">
                                    <Col>
                                        <p className="formFieldTitle"> Target property </p>
                                        <Field name="targetProperty" as="select"
                                            className="formField w-100 mt-1"
                                        >
                                            <option value="" disabled={true}>
                                                Select target property
                                            </option>

                                            {defaultTargetProperties.concat(Object.keys(annotateTarget.target.data)).map((property) => {
                                                return (
                                                    <option key={property} value={property}>
                                                        {harmonisedAttributes[property as keyof typeof harmonisedAttributes].displayName}
                                                    </option>
                                                );
                                            })}
                                        </Field>
                                    </Col>
                                </Row>
                            }

                            {/* Motivation */}
                            <Row className="mt-3">
                                <Col>
                                    <p className="formFieldTitle pb-1"> Motivation type </p>
                                    <Field name="motivation" as="select"
                                        className="formField w-100"
                                    >
                                        <option value="" disabled={true}>
                                            Select motivation
                                        </option>

                                        {Object.keys(annotationMotivations).map((motivation) => {
                                            const motivationObject = annotationMotivations[motivation as keyof typeof annotationMotivations];

                                            return (
                                                <option key={motivation} value={motivation}>
                                                    {motivationObject.displayName}
                                                </option>
                                            );
                                        })}
                                    </Field>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* Generate Annotation form, based on chosen motivation */}
                    <Row className="flex-grow-1 mt-3">
                        <Col>
                            {values.motivation &&
                                <FormTemplate motivation={values.motivation} />
                            }
                        </Col>
                    </Row>
                    {/* Submit Button */}
                    <Row>
                        <Col>
                            <button type="button"
                                className="primaryButton cancel px-4 py-1"
                                onClick={() => ToggleAnnotationForm()}
                            >
                                Cancel
                            </button>
                        </Col>
                        <Col className="col-md-auto">
                            <button type="submit"
                                className={`primaryButton ${(!values.motivation || !values.annotationValue) && 'disabled'} px-4 py-1`}
                                disabled={(!values.motivation || !values.annotationValue)}
                            >
                                Save
                            </button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik >
    );
}

export default AnnotationForm;
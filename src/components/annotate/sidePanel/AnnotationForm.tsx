/* Import Components */
import { Formik, Form, Field } from 'formik';
import { isEmpty } from 'lodash';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getAnnotateTarget, getEditAnnotation, setAnnotationFormToggle,
    setEditAnnotation, setHighlightAnnotationId
} from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { AnnotationTemplate, Dict } from 'app/Types';
import { Annotation } from 'app/types/Annotation';

/* Import Sources */
import AnnotationMotivations from 'sources/annotationMotivations.json';

/* Import API */
import InsertAnnotation from 'api/annotate/InsertAnnotation';
import PatchAnnotation from 'api/annotate/PatchAnnotation';

/* Import Components */
import FormTemplate from './form/FormTemplate';


/* Props Typing */
interface Props {
    UpdateAnnotationView: Function
};


const AnnotationForm = (props: Props) => {
    const { UpdateAnnotationView } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const editAnnotation = useAppSelector(getEditAnnotation);
    const annotationMotivations = { ...AnnotationMotivations };

    /* Function for submitting a new Annotation */
    const SubmitAnnotation = (form: Dict) => {
        /* Prepare new Annotation object */
        const annotation: AnnotationTemplate = {
            ...(!isEmpty(editAnnotation) && { "ods:id": editAnnotation['ods:id'] }),
            "oa:motivation": form.motivation,
            "oa:target": {
                "ods:id": annotateTarget.target['ods:id'],
                "ods:type": annotateTarget.targetType,
                "oa:selector": {
                    "ods:type": "FieldValueSelector",
                    "ods:field": form.targetProperty
                }
            },
            "oa:body": {
                "ods:type": form.targetProperty,
                "oa:value": [form.annotationValue],
                ...(!isEmpty(form.additionalFields) && { ...form.additionalFields }),
            }
        };

        /* Check if to post or patch */
        if (!isEmpty(editAnnotation)) {
            /* Patch Annotation */
            PatchAnnotation(annotation, editAnnotation['ods:id'], KeycloakService.GetToken()).then((annotation) => {
                UpdateAnnotationView(annotation);

                dispatch(setHighlightAnnotationId(annotation['ods:id']));
            }).catch(error => {
                console.warn(error);
            });
        } else {
            /* Post Annotation */
            InsertAnnotation(annotation, KeycloakService.GetToken()).then((annotation) => {
                UpdateAnnotationView(annotation);

                dispatch(setHighlightAnnotationId(annotation['ods:id']));
            }).catch(error => {
                console.warn(error);
            });
        }
    }

    return (
        <Formik
            initialValues={{
                targetProperty: !isEmpty(editAnnotation) ? editAnnotation['oa:target']['oa:selector']?.['ods:field'] : annotateTarget.property,
                motivation: !isEmpty(editAnnotation) ? editAnnotation['oa:motivation'] as string : '',
                annotationValue: !isEmpty(editAnnotation) ? editAnnotation['oa:body']['oa:value'] : '',
                additionalFields: {
                    ...(!isEmpty(editAnnotation) && editAnnotation['oa:body']['dcterms:reference'] && { reference: editAnnotation['oa:body']['dcterms:reference'] })
                }
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
                            {!annotateTarget.property && isEmpty(editAnnotation) &&
                                <Row className="mt-5">
                                    <Col>
                                        <p className="formFieldTitle"> Target property </p>
                                        <Field name="targetProperty" as="select"
                                            className="formField w-100 mt-1"
                                        >
                                            <option value="">
                                                Whole specimen
                                            </option>

                                            {Object.keys(annotateTarget.target).map((property) => {
                                                return (
                                                    <option key={property} value={property}>
                                                        {property}
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
                                    <p className="formFieldTitle pb-1"> Annotation type </p>
                                    <Field name="motivation" as="select"
                                        className="formField w-100" disabled={!isEmpty(editAnnotation)}
                                    >
                                        <option value="" disabled={true}>
                                            Select annotation type
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
                                onClick={() => {
                                    dispatch(setEditAnnotation({} as Annotation));
                                    dispatch(setAnnotationFormToggle(false));
                                }}
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
/* Import Dependencies */
import { Field, FieldArray } from 'formik';
import KeycloakService from 'keycloak/Keycloak';
import { Capitalize } from 'global/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getAnnotateTarget } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { AnnotationMotivation, Dict } from 'global/Types';

/* Import Sources */
import AnnotationMotivations from 'sources/annotationMotivations.json';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import ValueField from '../sidePanel/form/ValueField';


/* Props Typing */
interface Props {
    motivation: string
    property: string,
    targetType: string,
    formValues: Dict
};


const FormTemplate = (props: Props) => {
    return <> </>;
    // const { motivation, property, targetType, formValues } = props;

    // /* Base variables */
    // const annotateTarget = useAppSelector(getAnnotateTarget);
    // const annotationMotivations: Dict = AnnotationMotivations;
    // const motivationSpecs: AnnotationMotivation = annotationMotivations[motivation];

    // /* Check if Annotation belonging to motivation has a current value */
    // const annotation = annotateTarget.annotations.find(annotation =>
    //     (annotation.motivation === motivation && annotation.creator === KeycloakService.GetSubject())
    // );
    // let annotationValue: string[] = [''];

    // if (annotation) {
    //     if (Array.isArray(annotation.body.value)) {
    //         annotationValue = annotation.body.value;
    //     } else {
    //         annotationValue = [annotation.body.value];
    //     }
    // }

    // return (
    //     <Row className="mt-3">
    //         <Col>
    //             <Row>
    //                 <Col md={{ span: 9 }}>
    //                     <div className="annotate_annotationTypeContext px-2 py-2 bg-primary-light">
    //                         {motivationSpecs.context}
    //                     </div>
    //                 </Col>
    //             </Row>
    //             <Row className="mt-4">
    //                 <Col>
    //                     <p className="annotate_annotationTypeFieldTitle"> Chosen attribute: </p>

    //                     <Field type="text" className="annotate_annotationTypeField w-100"
    //                         disabled
    //                         name="property"
    //                     />
    //                 </Col>
    //             </Row>
    //             <Row className="mt-3">
    //                 <Col>
    //                     <p className="annotate_annotationTypeFieldTitle"> Value: </p>

    //                     <FieldArray name="value">
    //                         {({ push, remove }) => (
    //                             <>
    //                                 {formValues.value.map((value: string | Date, index: number) => {
    //                                     const key = `value${index}`;

    //                                     return (
    //                                         <Row className="mt-3" key={key}>
    //                                             <Col>
    //                                                 <ValueField name={`value.${index}`}
    //                                                     value={value}
    //                                                     property={property}
    //                                                     targetType={targetType}
    //                                                 />
    //                                             </Col>

    //                                             {index > 0 &&
    //                                                 <Col className="col-md-auto">
    //                                                     <button type="button"
    //                                                         onClick={() => remove(index)}
    //                                                     >
    //                                                         <FontAwesomeIcon icon={faX} />
    //                                                     </button>
    //                                                 </Col>
    //                                             }
    //                                         </Row>
    //                                     );
    //                                 })}

    //                                 <Row className="mt-3">
    //                                     {/* If Annotation value is not null, or multiple values exist, show multiple field option */
    //                                         (formValues.value.length >= annotationValue.length && formValues.value[0]) &&
    //                                         <Col className="col-md-auto">
    //                                             <button type="button"
    //                                                 onClick={() => push('')}
    //                                             >
    //                                                 <FontAwesomeIcon icon={faPlus} />
    //                                             </button>
    //                                         </Col>
    //                                     }
    //                                 </Row>
    //                             </>
    //                         )}
    //                     </FieldArray>
    //                 </Col>
    //             </Row>

    //             {Object.keys(motivationSpecs.additionalFields).map((additionalField: string) => {
    //                 const additionalFieldType = motivationSpecs.additionalFields[additionalField];

    //                 return (
    //                     <Row key={additionalField} className="mt-3">
    //                         <Col>
    //                             <p className="annotate_annotationTypeFieldTitle"> {Capitalize(additionalField)}: </p>

    //                             {(additionalFieldType === 'textArea') ?
    //                                 <Field type="text" name={additionalField}
    //                                     component="textarea"
    //                                     className="annotate_annotationTypeTextArea w-100"
    //                                     rows={4}
    //                                 />
    //                                 : <Field type="text" name={additionalField}
    //                                     className="annotate_annotationTypeField w-100"
    //                                 />
    //                             }
    //                         </Col>
    //                     </Row>
    //                 );
    //             })}
    //         </Col>
    //     </Row>
    // );
}

export default FormTemplate;
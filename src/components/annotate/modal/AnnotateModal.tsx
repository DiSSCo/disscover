/* Import Dependencies */
import { useState, useRef } from 'react';
import { Formik, Form } from 'formik';
import KeycloakService from 'keycloak/Keycloak';
import classNames from 'classnames';
import { Row, Col, Modal } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getAnnotateTarget, setAnnotateTarget } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Annotation, AnnotationTemplate, Dict } from 'global/Types';

/* Import Sources */
import AnnotationMotivations from 'sources/annotationMotivations.json';

/* Import Components */
import MessageTemplate from './MessageTemplate';
import FormTemplate from './FormTemplate';

/* Import API */
import InsertAnnotation from 'api/annotate/InsertAnnotation';
import PatchAnnotation from 'api/annotate/PatchAnnotation';
import DeleteAnnotation from 'api/annotate/DeleteAnnotation';


/* Props Typing */
interface Props {
    modalToggle: boolean,
    ToggleModal: Function
};


const AnnotateModal = (props: Props) => {
    const { modalToggle, ToggleModal } = props;

    /* Configure Store */
    const dispatch = useAppDispatch();

    /* Base variables */
    const { property, motivation, target, targetType, annotations } = useAppSelector(getAnnotateTarget);
    const annotationMotivations: Dict = AnnotationMotivations;

    /* Function for auto scrolling to a selected Annotation */
    const refModalAnnotations = useRef<HTMLDivElement>(null);

    const ScrollToAnnotation = (annotationRef: React.RefObject<HTMLDivElement>) => {
        if (refModalAnnotations.current && annotationRef.current) {
            refModalAnnotations.current.scrollTop = (annotationRef.current.offsetTop - 75);
        }
    }

    /* Function for changing the Annotation motivation in form */
    const [annotationMotivation, setAnnotationMotivation] = useState(motivation ? motivation : 'commenting');
    const motivationAnnotation = annotations.find(annotation =>
        (annotation.motivation === annotationMotivation && annotation.creator === KeycloakService.GetSubject())
    );

    /* Function for toggling to Annotate mode */
    const [annotateMode, setAnnotateMode] = useState(false);

    /* Function for checking the type of an Annotation value */
    const CheckAnnotationValue = () => {
        let annotationValue = [''];

        if (motivationAnnotation) {
            if (typeof motivationAnnotation.body.value == 'string') {
                annotationValue = [motivationAnnotation.body.value]
            } else {
                annotationValue = motivationAnnotation.body.value;
            }
        }

        return annotationValue;
    }

    /* Function for updating the Annotation Target state after succesful submit */
    const UpdateAnnotationTarget = (annotationRecord?: Annotation, remove?: boolean) => {
        if (annotationRecord) {
            /* Check if annotation currently exists in state, if so update, else push to array */
            const index = annotations.findIndex(annotation => annotation.id === annotationRecord.id);
            const annotationsArray = [...annotations];

            if (index > -1) {
                /* If to be removed, remove from state */
                if (remove) {
                    annotationsArray.splice(index, 1);
                } else {
                    annotationsArray[index] = annotationRecord;
                }
            } else {
                annotationsArray.push(annotationRecord);
            }

            dispatch(setAnnotateTarget({
                property,
                target: target,
                targetType: targetType,
                annotations: annotationsArray
            }));
        }
    }

    const classModalForm = classNames({
        'annotate_modalFormSection': true,
        'active': annotateMode
    });

    return (
        <Modal show={modalToggle} size="xl" className="annotate_modal">
            <Row className="h-100 justify-content-center">
                {/* Left side of Modal: displays annotations as in messages */}
                <Col md={{ span: 6 }} className={`h-100 annotate_modalAnnotationSection `}>
                    <div className="w-100 m-0 p-0 position-relative">
                        <button type="button"
                            onClick={() => { ToggleModal(); setAnnotateMode(false); }}
                            className="annotate_modalHeaderButton position-absolute px-3 border-0 bg-backdrop text-white br-tl br-tr"
                        >
                            Dismiss
                        </button>
                    </div>

                    <Modal.Header className="annotate_modalHeader position-relative bg-primary-blue text-white">
                        <Modal.Title className="annotate_modalHeaderTitle">
                            {property}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="annotate_modalBody bg-white">
                        <Row className="px-2">
                            <Col md={{ span: 12 }} className="annotate_modalCurrentValue border-b-2-primary-dark">
                                <>
                                    <span className="fw-bold"> Current value: </span>

                                    <span> {`${target[property as keyof typeof target]}`} </span>
                                </>
                            </Col>
                        </Row>
                        <Row className="annotate_modalAnnotationsBody mt-3 overflow-scroll" ref={refModalAnnotations}>
                            <Col>
                                <Row>
                                    <Col md={{ offset: 1 }}
                                        className={`col-md-auto mb-3 annotate_modalAddAnnotationButton border-2-primary-dark `}
                                        onClick={() => setAnnotateMode(!annotateMode)}
                                    >
                                        Add new annotation
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ span: 12 }}>
                                        {(annotations.length > 0) ? annotations.map((annotation) => {
                                            return <MessageTemplate key={annotation.id}
                                                annotation={annotation}
                                                motivation={annotationMotivation}
                                                annotateMode={annotateMode}

                                                SetAnnotationMotivation={(motivation: string) => setAnnotationMotivation(motivation)}
                                                ActivateAnnotateMode={() => setAnnotateMode(true)}
                                                ScrollToAnnotation={(annotationRef: React.RefObject<HTMLDivElement>) => ScrollToAnnotation(annotationRef)}
                                            />;
                                        })
                                            : <Row>
                                                <Col md={{ span: 10, offset: 1 }}>
                                                    No annotations yet
                                                </Col>
                                            </Row>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Col>
                {/* Right side of modal: on toggle, displays form for: adding, editing and removing annotations */}
                <Col md={{ span: 5 }} className={`${classModalForm} position-relative h-100`}>
                    <Modal.Body className="annotate_modalBody right bg-white overflow-scroll mb-3">
                        <Formik
                            initialValues={{
                                motivation: annotationMotivation,
                                property: property,
                                value: CheckAnnotationValue(),
                                method: !motivationAnnotation ? 'post' : 'patch',
                                description: '',
                                based_on: '',
                                reference: ''
                            }}
                            enableReinitialize
                            onSubmit={async (values) => {
                                await new Promise((resolve) => setTimeout(resolve, 100));

                                const annotation: AnnotationTemplate = {
                                    type: 'Annotation',
                                    motivation: values.motivation,
                                    body: {
                                        type: values.property,
                                        value: values.value,
                                        ...(values.description && { description: values.description }),
                                        ...(values.based_on && { description: values.based_on }),
                                        ...(values.reference && { description: values.reference })
                                    },
                                    target: {
                                        id: `https://hdl.handle.net/${target.id}`,
                                        type: targetType,
                                        indvProp: values.property
                                    }
                                };

                                if (values.method === 'post') {
                                    InsertAnnotation(annotation, KeycloakService.GetToken())
                                        .then((annotation) => {
                                            if (annotation) {
                                                UpdateAnnotationTarget(annotation);
                                            }
                                        });
                                } else if (values.method === 'patch' && motivationAnnotation) {
                                    PatchAnnotation(annotation, motivationAnnotation.id, KeycloakService.GetToken())
                                        .then((annotation) => {
                                            if (annotation) {
                                                UpdateAnnotationTarget(annotation);
                                            }
                                        });
                                }
                            }}
                        >
                            {({ values }) => (
                                <Form>
                                    <Row>
                                        <Col md={{ span: 12 }}>
                                            <p> Select an annotation type: </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <select
                                                onChange={e => setAnnotationMotivation(e.target.value)}
                                                className="annotate_annotationTypeSelect px-2 py-2 bg-primary-blue border-0 text-white"
                                                value={annotationMotivation}
                                            >
                                                {Object.keys(AnnotationMotivations).map((motivation: string) => {
                                                    const motivationData: Dict = annotationMotivations[motivation];

                                                    return (
                                                        <option
                                                            key={motivation}
                                                            value={motivation}
                                                            className="annotate_annotationTypeSelectOption"
                                                        >
                                                            {motivationData.displayName}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormTemplate motivation={annotationMotivation}
                                                property={property}
                                                targetType={targetType}
                                                formValues={values}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">
                                        <Col className="annotate_licenseText">
                                            <p> All annotations are publicly available and subject to the CC-0 license </p>
                                        </Col>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col className="col-md-auto">
                                            <button type="submit"
                                                className="annotate_annotationTypeSubmit border-2-primary-dark"
                                            >
                                                Save annotation
                                            </button>
                                        </Col>
                                        {annotations.find(annotation => (annotation.body.type === property && annotation.motivation === annotationMotivation)) &&
                                            <Col className="col-md-auto">
                                                <button type="button"
                                                    className="annotate_annotationTypeRemove"
                                                    onClick={() => DeleteAnnotation(
                                                        annotations.find(annotation =>
                                                            (annotation.body.type === property && annotation.motivation === annotationMotivation))?.id,
                                                        KeycloakService.GetToken()).then((response) => {
                                                            if (response) {
                                                                /* Remove annotations from state */
                                                                UpdateAnnotationTarget(annotations.find(annotation =>
                                                                    (annotation.body.type === property && annotation.motivation === annotationMotivation)
                                                                ), true);
                                                            }
                                                        })}
                                                >
                                                    Remove Annotation
                                                </button>
                                            </Col>
                                        }
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Col>
            </Row>
        </Modal >
    );
}

export default AnnotateModal;
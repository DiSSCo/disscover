/* Import Dependencies */
import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Annotation, Dict } from 'global/Types';

/* Import Sources */
import AnnotationMotivations from 'sources/annotationMotivations.json';


/* Props Typing */
interface Props {
    annotation: Annotation,
    motivation: string,
    annotateMode: boolean,
    SetAnnotationMotivation: Function,
    ActivateAnnotateMode: Function,
    ScrollToAnnotation: Function
};


const MessageTemplate = (props: Props) => {
    const { annotation, motivation, annotateMode,
        ActivateAnnotateMode, SetAnnotationMotivation, ScrollToAnnotation
    } = props;

    /* Base variables */
    let annotationValue = annotation.body.value;
    const annotationMotivations: Dict = AnnotationMotivations;
    const motivationSpecs = annotationMotivations[annotation.motivation];

    /* Create ref for annotation message */
    const annotationRef = useRef(null);

    /* Onload: If annotation from user and equal to chosen motviation is present, scroll to */
    useEffect(() => {
        if (annotation.motivation === motivation && annotation.creator === KeycloakService.GetSubject() && annotateMode) {
            ScrollToAnnotation(annotationRef);
        } else if (annotation.motivation === motivation && annotation.creator === KeycloakService.GetSubject()) {
            setTimeout(function () {
                ScrollToAnnotation(annotationRef);
            }, 500);
        }
    }, [motivation]);

    /* Check if Annotation value is multi value */
    if (Array.isArray(annotationValue)) {
        annotationValue = annotationValue.join(', ');
    }

    /* Format Annotation created date */
    const isoDate = new Date(annotation.created * 1000);
    const date = `${(isoDate.getMonth() + 1)}-${isoDate.getDate()}-${isoDate.getFullYear()}`;

    /* Function for if Annotation is the user's and pressed, to fire events */
    const OnclickEvents = () => {
        if (annotation.creator === KeycloakService.GetSubject()) {
            SetAnnotationMotivation(annotation.motivation);
            ActivateAnnotateMode();
        }
    }

    /* ClassName for Annotation message */
    const classAnnotationMessage = classNames({
        'annotate_annotationMessageBlock': true,
        'me': KeycloakService.GetSubject() === annotation.creator,
        'edit': (annotation.motivation === motivation && annotation.creator === KeycloakService.GetSubject() && annotateMode)
    });

    return (
        <Row className="mb-3"
            ref={annotationRef}
            onClick={() => OnclickEvents()}
        >
            <Col md={{ span: 12 }}>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row>
                            <Col className="annotate_annotationMessageType col-md-auto fw-bold br-tl br-tr bg-primary-dark text-white">
                                {annotationMotivations[annotation.motivation].displayName}
                            </Col>
                            <Col>
                                <Row className="justify-content-end">
                                    <Col className="annotate_annotationMessageVersion col-md-auto border-l-1-primary-dark border-t-1-primary-dark
                                        border-r-1-primary-dark br-tl br-tr"
                                    >
                                        Version {annotation.version}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row>
                            <Col md={{ span: 12 }} className={`${classAnnotationMessage} border-1-primary-dark `}>
                                <Row>
                                    <Col className="annotate_annotationMessage">
                                        <Row className="mt-1">
                                            <Col md={{ span: 12 }}>
                                                {annotationValue}
                                            </Col>
                                        </Row>
                                        <Row className="mt-2 mb-2">
                                            <Col>
                                                <span className="fst-italic"> {annotation.id} </span>
                                            </Col>
                                        </Row>
                                        {('description' in motivationSpecs['additionalFields']) &&
                                            <Row className="mt-2 mb-2">
                                                <Col>
                                                    <span className="fw-bold fst-italic"> Remarks: </span> {annotation.body.description}
                                                </Col>
                                            </Row>
                                        }
                                        {('based_on' in motivationSpecs['additionalFields']) &&
                                            <Row className="mt-2 mb-2">
                                                <Col>
                                                    <span className="fw-bold fst-italic"> Based on: </span> {annotation.body.based_on}
                                                </Col>
                                            </Row>
                                        }
                                        {('reference' in motivationSpecs['additionalFields']) &&
                                            <Row className="mt-2 mb-2">
                                                <Col>
                                                    <span className="fw-bold fst-italic"> Reference: </span> {annotation.body.reference}
                                                </Col>
                                            </Row>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="annotate_annotationDate col-md-auto mt-1">
                                {`${date} · Username`}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default MessageTemplate;
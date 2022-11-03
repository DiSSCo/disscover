import { useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';


const MessageTemplate = (props) => {
    const modalAnnotation = props.modalAnnotation;
    const editType = props.editType;
    const propertyKey = props.propertyKey;
    const annotationType = props.annotationType;

    const displayValues = props.displayValues;
    const annotationMessageType = props.annotationMessageType;

    let ref = useRef(null);

    useEffect(() => {
        if (editType === annotationMessageType[0] && UserService.getSubject() === modalAnnotation['creator']) {
            props.ScrollToAnnotation(ref);
        } else if (annotationType['type'] === annotationMessageType[0]) {
            setTimeout(function () {
                props.ScrollToAnnotation(ref);
            }, 500)
        }
    }, [editType, annotationType]);

    const isoDate = new Date(Date.parse(modalAnnotation['created']));
    const date = `${(isoDate.getMonth() + 1)}-${isoDate.getDate()}-${isoDate.getFullYear()}`;

    let me;

    if (UserService.getSubject() === modalAnnotation['creator']) {
        me = 'me';
    }

    let edit;

    if (editType === annotationMessageType[0]) {
        edit = 'edit';
    }

    return (
        <Row key={propertyKey}
            className="mb-3"
            onClick={() => props.ToggleEditMode(annotationMessageType[0])}
            ref={ref}
        >
            <Col md={{ span: 12 }}>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row>
                            <Col className="annotate_annotationMessageType col-md-auto fw-bold br-tl br-tr bg-primary-dark text-white">
                                {annotationMessageType[1]}
                            </Col>
                            <Col>
                                <Row className="justify-content-end">
                                    <Col className="annotate_annotationMessageVersion col-md-auto border-l-1-primary-dark border-t-1-primary-dark
                                        border-r-1-primary-dark br-tl br-tr"
                                    >
                                        Version {modalAnnotation['version']}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row>
                            <Col md={{ span: 12 }} className={`annotate_annotationMessageBlock border-1-primary-dark ${me} ${edit}`}>
                                <Row>
                                    <Col className="annotate_annotationMessage">
                                        {displayValues['value'] &&
                                            <Row className="mt-1">
                                                <Col md={{ span: 12 }}>
                                                    {displayValues['value']}
                                                </Col>
                                            </Row>
                                        }
                                        {displayValues['id'] &&
                                            <Row className="mt-2 mb-2">
                                                <Col>
                                                    <span className="fst-italic"> {displayValues['id']} </span>
                                                </Col>
                                            </Row>
                                        }
                                        {displayValues['description'] &&
                                            <Row className="mt-2 mb-2">
                                                <Col>
                                                    <span className="fw-bold fst-italic"> Remarks: </span> {displayValues['description']}
                                                </Col>
                                            </Row>
                                        }
                                        {displayValues['basedOn'] &&
                                            <Row className="mt-2 mb-2">
                                                <Col>
                                                    <span className="fw-bold fst-italic"> Based on: </span> {displayValues['basedOn']}
                                                </Col>
                                            </Row>
                                        }
                                        {displayValues['reference'] &&
                                            <Row className="mt-2 mb-2">
                                                <Col>
                                                    <span className="fw-bold fst-italic"> Reference: </span> {displayValues['reference']}
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
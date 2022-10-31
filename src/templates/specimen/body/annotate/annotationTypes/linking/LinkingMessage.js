import { useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';


const LinkingMessage = (props) => {
    const modalAnnotation = props.modalAnnotation;
    const propertyKey = props.propertyKey;
    const editType = props.editType;
    const annotationType = props.annotationType;

    let ref = useRef();

    useEffect(() => {
        if (editType === 'linking' && UserService.getSubject() === modalAnnotation['creator']) {
            props.ScrollToAnnotation(ref);
        } else if (annotationType['type'] === 'linking') {
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

    if (editType === 'linking') {
        edit = 'edit';
    }

    return (
        <Row key={propertyKey}
            className="mb-3"
            onClick={() => props.ToggleEditMode('linking')}
            ref={ref}
        >
            <Col md={{ span: 12 }}>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row>
                            <Col className="annotate_annotationMessageType col-md-auto fw-bold br-tl br-tr bg-primary-dark text-white">
                                Relationship/Link
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
                                        <Row className="mt-1">
                                            <Col md={{ span: 12 }}>
                                                {modalAnnotation['body']['value']}
                                            </Col>
                                        </Row>
                                        <Row className="mt-2 mb-2">
                                            <Col>
                                                <span className="fst-italic"> {modalAnnotation['id']} </span>
                                            </Col>
                                        </Row>
                                        {modalAnnotation['body']['based_on'] &&
                                            <Row className="mt-2 mb-2">
                                                <Col>
                                                    <span className="fw-bold fst-italic"> Based on: </span> {modalAnnotation['body']['based_on']}
                                                </Col>
                                            </Row>
                                        }
                                        {modalAnnotation['body']['description'] &&
                                            <Row className="mt-2 mb-2">
                                                <Col>
                                                    <span className="fw-bold fst-italic"> Remarks: </span> {modalAnnotation['body']['description']}
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

export default LinkingMessage;
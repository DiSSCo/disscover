import { useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';


const LinkingMessage = (props) => {
    const modalAnnotation = props.modalAnnotation;
    const propertyKey = props.propertyKey;
    const editType = props.editType;

    let ref = useRef();

    useEffect(() => {     
        if (editType === 'linking' && UserService.getSubject() === modalAnnotation['creator']) {
            props.ScrollToAnnotation(ref);
        }
    }, [editType]);

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
                            <Col className="col-md-auto annotate_annotationMessageType">
                                Relationship/Link
                            </Col>
                            <Col>
                                <Row className="justify-content-end">
                                    <Col className="col-md-auto annotate_annotationMessageVersion">
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
                            <Col md={{ span: 12 }} className={`annotate_annotationMessageBlock ${me} ${edit}`}>
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
                            <Col className="col-md-auto annotate_annotationDate">
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
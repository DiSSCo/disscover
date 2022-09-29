import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSave, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';


const LinkingMessage = (props) => {
    const key = props.uniqueKey;
    const modalAnnotation = props.modalAnnotation;
    const propertyKey = props.propertyKey;
    const editMode = props.editMode;
    const modalProperty = props.modalProperty;
    const editHover = props.editHover;

    const isoDate = new Date(Date.parse(modalAnnotation['created']));
    const date = `${(isoDate.getMonth() + 1)}-${isoDate.getDate()}-${isoDate.getFullYear()}`;

    if (UserService.getSubject() === modalAnnotation['creator']) {
        return (
            <Row key={propertyKey} className="mb-3">
                <Col md={{ span: 12 }}>
                    <Row>
                        <Col md={{ offset: 2 }} className="col-md-auto annotate_annotationMessageType">
                            Relationship/Link
                        </Col>
                    </Row>

                    <Row onMouseEnter={() => props.IsHover(true, propertyKey)}
                        onMouseLeave={() => props.IsHover(false, propertyKey)}>
                        <Col md={{ span: 2 }}>
                            {editMode[modalProperty['property']] ?
                                (editMode[modalProperty['property']] === propertyKey) &&
                                <>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        onClick={() => props.ToggleEditMode(propertyKey)}
                                        className="annotate_editIcon xmark"
                                    />
                                    <FontAwesomeIcon
                                        icon={faSave}
                                        onClick={() => props.UpdateAnnotation(modalAnnotation, propertyKey)}
                                        className="annotate_editIcon save"
                                    />
                                    <br />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="annotate_editIcon delete"
                                        onClick={() => props.RemoveAnnotation(modalAnnotation, propertyKey)}
                                    />
                                </>
                                : editHover === propertyKey &&
                                <FontAwesomeIcon
                                    icon={faPencil}
                                    onClick={() => props.ToggleEditMode(propertyKey)}
                                    className="annotate_editIcon pencil"
                                />
                            }
                        </Col>
                        <Col md={{ span: 10 }}>
                            <Row>
                                <Col md={{ span: 10 }} className="annotate_annotationMessageBlock me">
                                    <Row>
                                        {editMode[modalProperty['property']] ?
                                            props.RenderEditMode(propertyKey, modalAnnotation)
                                            : <Col md={{ span: 12 }} className="annotate_annotationMessage">
                                                {modalAnnotation['body']['value']}
                                            </Col>
                                        }
                                    </Row>
                                </Col>

                                <Col md={{ span: 2 }}>
                                    <img
                                        src="https://crafatar.com/avatars/af781660900a493687708eee23874086?size=64&overlay"
                                        className="img-fluid"
                                        alt="User avatar"
                                    />
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
    } else {
        return (
            <Row key={key} className="mb-3">
                <Col md={{ span: 10 }}>
                    <Row>
                        <Col md={{ span: 2 }}>
                            <img
                                src="https://crafatar.com/avatars/af781660900a493687708eee23874086?size=64&overlay"
                                className="img-fluid"
                                alt="User avatar"
                            />
                        </Col>
                        <Col md={{ span: 10 }} className="annotate_annotationMessage">
                            {modalAnnotation['body']['value']}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-auto annotate_annotationDate">
                            {`${date} · Username`}
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default LinkingMessage;
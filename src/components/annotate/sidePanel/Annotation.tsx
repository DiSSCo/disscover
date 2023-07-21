/* Import Dependencies */
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Moment from 'moment';
import { isEmpty } from 'lodash';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getAnnotateTarget, setEditAnnotation,
    getHighlightAnnotationId, setHighlightAnnotationId
} from 'redux/annotate/AnnotateSlice';
import { getUser } from 'redux/user/UserSlice';

/* Import Types */
import { Annotation as AnnotationType } from 'global/Types';

/* Import Sources */
import AnnotationMotivations from 'sources/annotationMotivations.json';

/* Import Styles */
import styles from 'components/annotate/annotate.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown, faMessage } from '@fortawesome/free-regular-svg-icons';

/* Import API */
import DeleteAnnotation from 'api/annotate/DeleteAnnotation';
import GetUser from 'api/user/GetUser';


/* Props Typing */
interface Props {
    annotation: AnnotationType,
    UpdateAnnotationView: Function
};


const Annotation = (props: Props) => {
    const { annotation, UpdateAnnotationView } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const annotationRef = useRef<HTMLDivElement>(null);
    const user = useAppSelector(getUser);

    /* Base variables */
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const highlightAnnotationId = useAppSelector(getHighlightAnnotationId);
    const [userTag, setUserTag] = useState<string>('');
    const annotationMotivations = { ...AnnotationMotivations };
    let annotationValue: string = '';

    /* Check if Annotation value is multi value */
    if (Array.isArray(annotation.body.value)) {
        annotationValue = annotation.body.value.join(', ');
    } else if (annotation.body.value) {
        annotationValue = annotation.body.value;
    } else if (annotation.body.values) {
        annotationValue = String(annotation.body.values);
    }

    /* Set User Tag */
    useEffect(() => {
        if (annotation.creator === KeycloakService.GetSubject()) {
            setUserTag(`${user.firstName} ${user.lastName} (you)`);
        } else {
            GetUser(annotation.creator).then((user) => {
                if (!isEmpty(user)) {
                    setUserTag(`${user.firstName} ${user.lastName}`);
                } else {
                    setUserTag(annotation.creator);
                }
            }).catch(error => {
                console.warn(error);
            });
        }
    }, [])

    /* Function for highlighting an Annotation if created or modified */
    const HighlightAnnotation = () => {
        const annotationDiv: HTMLDivElement = annotationRef.current as HTMLDivElement;

        /* Reset hightlight annotation id */
        dispatch(setHighlightAnnotationId(''));

        /* Set interval and timeout to show highlight three times */
        const interval = setInterval(() => {
            if (annotationDiv.classList.contains(`${styles.highlight}`)) {
                annotationDiv.classList.remove(`${styles.highlight}`);
            } else {
                annotationDiv.classList.add(`${styles.highlight}`);
            }
        }, 500);

        setTimeout(() => clearInterval(interval), 3500);
    }

    useEffect(() => {
        if (highlightAnnotationId === annotation.id) {
            HighlightAnnotation();
        }
    }, [highlightAnnotationId]);

    /* ClassName for Creator text */
    const classCreator = classNames({
        'c-primary fw-lightBold': true,
        'c-accent': KeycloakService.GetSubject() === annotation.creator
    });

    return (
        <Row className="mb-3">
            <Col>
                <div className={`${styles.sidePanelAnnotation} px-3 py-2`} ref={annotationRef}>
                    {/* Creator and date */}
                    <Row>
                        <Col>
                            <p className={classCreator}>
                                {userTag}
                            </p>
                        </Col>
                        <Col className="col-md-auto">
                            <p className="c-primary"> {Moment(annotation.created).format('MMMM DD - YYYY')} </p>
                        </Col>
                    </Row>
                    {/* Annotation ID and version */}
                    <Row>
                        <Col>
                            <p className="c-grey"> {annotation.id} </p>
                        </Col>
                        <Col className="col-md-auto">
                            <p className="c-grey"> {`Version ${annotation.version}`} </p>
                        </Col>
                    </Row>
                    {/* Annotation content */}
                    {!annotateTarget.property &&
                        <Row className="mt-2">
                            <Col className="col-md-auto pe-0">
                                <div className={`${styles.sidePanelTopStripe} h-100`} />
                            </Col>
                            <Col>
                                <p className="fst-italic"> {annotation.target.indvProp} </p>
                            </Col>
                        </Row>
                    }
                    <Row className="mt-3">
                        <Col>
                            <p>
                                <span className="c-primary">
                                    {`${annotationMotivations[annotation.motivation.replace('https://hdl.handle.net/', '') as keyof typeof
                                        annotationMotivations].displayName}: `}
                                </span>
                                {annotationValue}
                            </p>
                        </Col>
                    </Row>
                    {/* Comments and actions */}
                    <Row className="mt-2">
                        <Col className="col-md-auto">
                            <p className="c-grey"> 0 comments </p>
                        </Col>
                        <Col className="col-md-auto ps-1">
                            <FontAwesomeIcon icon={faThumbsUp}
                                className="c-pointer c-primary"
                            />
                        </Col>
                        <Col className="align-items-center ps-0">
                            <FontAwesomeIcon icon={faThumbsDown}
                                className="c-pointer c-primary"
                            />
                        </Col>

                        {KeycloakService.GetSubject() === annotation.creator &&
                            <Col className="col-md-auto">
                                <Row>
                                    <Col className="pe-0">
                                        <FontAwesomeIcon icon={faPen}
                                            className="c-pointer c-primary"
                                            onClick={() => dispatch(setEditAnnotation(annotation))}
                                        />
                                    </Col>
                                    <Col className="pe-0">
                                        <FontAwesomeIcon icon={faTrashCan}
                                            className="c-pointer c-primary"
                                            onClick={() => {
                                                if (window.confirm(`Delete annotation with id: ${annotation.id}`)) {
                                                    DeleteAnnotation(annotation.id, KeycloakService.GetToken());
                                                    UpdateAnnotationView(annotation, true);
                                                }
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        }

                        <Col className="col-md-auto pe-0">
                            <FontAwesomeIcon icon={faMessage}
                                className="c-pointer c-primary"
                            />
                        </Col>
                        <Col className="col-md-auto">
                            <FontAwesomeIcon icon={faShareNodes}
                                className="c-pointer c-primary"
                            />
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default Annotation;
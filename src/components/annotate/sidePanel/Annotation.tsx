/* Import Dependencies */
import { ReactElement, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Moment from 'moment';
import KeycloakService from 'keycloak/Keycloak';
import { Capitalize } from 'app/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    setEditAnnotation, getHighlightAnnotationId, setHighlightAnnotationId
} from 'redux/annotate/AnnotateSlice';
import { getUser } from 'redux/user/UserSlice';

/* Import Types */
import { Dict } from 'app/Types';
import { Annotation as AnnotationType } from 'app/types/Annotation';

/* Import Styles */
import styles from 'components/annotate/annotate.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown, faMessage } from '@fortawesome/free-regular-svg-icons';

/* Import API */
import DeleteAnnotation from 'api/annotate/DeleteAnnotation';


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
    const highlightAnnotationId = useAppSelector(getHighlightAnnotationId);
    const [userTag, setUserTag] = useState<string>('');
    let annotationField: ReactElement | undefined;
    let annotationValue: string | Dict = '';

    /* Depict annotation field */
    if (annotation['oa:target']['oa:selector']?.['ods:field']) {
        annotationField = <span> <span className="fw-lightBold"> Field: </span> {(annotation['oa:target']['oa:selector']?.['ods:field'] as string).replace('$.', '')} </span>;
    } else if (annotation['oa:target']['oa:selector']?.['oa:class']) {
        annotationField = <span> <span className="fw-lightBold"> Class: </span> {(annotation['oa:target']['oa:selector']?.['oa:class'] as string).replace('$.', '')} </span>;
    }

    // console.log(annotation['oa:body']['oa:value'].join(', '));

    /* Transform array of values to displayable information */
    if (annotation['oa:body']['oa:value'].join(', ')[0] === '{') {
        const annotationValueObject = JSON.parse(annotation['oa:body']['oa:value'].join(', '));

        annotationValue = annotationValueObject[(annotation['oa:target']['oa:selector']?.['oa:class'] as string).replace('$.', '') as keyof typeof annotationValueObject];
    } else {
        annotationValue = annotation['oa:body']['oa:value'].join(', ');
    }

    /* Set User Tag */
    useEffect(() => {
        if (user.orcid && user.orcid === annotation['oa:creator']['ods:id']) {
            const firstName = user.firstName ?? user.id;
            const lastName = user.lastName ?? '';

            setUserTag(`${firstName} ${lastName} (you)`);
        } else {
            setUserTag(annotation['oa:creator']['foaf:name'] ?? annotation['oa:creator']['ods:id']);
        }
    }, []);

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
        if (highlightAnnotationId === annotation['ods:id']) {
            HighlightAnnotation();
        }
    }, [highlightAnnotationId]);

    /* ClassName for Creator text */
    const classCreator = classNames({
        'c-primary fw-lightBold': true,
        'c-accent': user.orcid === annotation['oa:creator']['ods:id']
    });

    return (
        <Row className="mb-3">
            <Col>
                <div className={`${styles.sidePanelAnnotation} bgc-white fs-4 rounded-c transition px-3 py-2`} ref={annotationRef}>
                    {/* Creator and date */}
                    <Row>
                        <Col>
                            <p className={classCreator}>
                                {userTag}
                            </p>
                        </Col>
                        <Col className="col-md-auto">
                            <p className="c-primary"> {Moment(annotation['dcterms:created']).format('MMMM DD - YYYY')} </p>
                        </Col>
                    </Row>
                    {/* Annotation ID and version */}
                    <Row>
                        <Col>
                            <p className="c-grey"> {annotation['ods:id']} </p>
                        </Col>
                        <Col className="col-md-auto">
                            <p className="c-grey"> {`Version ${annotation['ods:version']}`} </p>
                        </Col>
                    </Row>
                    {/* Annotation content */}
                    {(annotationField) &&
                        <Row className="mt-2">
                            <Col className="col-md-auto pe-0">
                                <div className={`${styles.sidePanelTopStripe} h-100`} />
                            </Col>
                            <Col>
                                <p className="fst-italic"> {annotationField} </p>
                            </Col>
                        </Row>
                    }
                    <Row className="mt-3">
                        <Col>
                            <span className="c-primary">
                                {`${Capitalize(annotation['oa:motivation'].replace('oa:', '').replace('ods:', ''))}: `}
                            </span>
                            {(typeof (annotationValue) === 'object') ?
                                <div>
                                    {Object.entries(annotationValue).map((keyValuePair) => {
                                        if (typeof (keyValuePair[1]) !== 'object') {
                                            return (
                                                <p key={keyValuePair[0]}> <span className="fw-lightBold"> {keyValuePair[0]}: </span> {keyValuePair[1]} </p>
                                            );
                                        }
                                    })}
                                </div> : <div>
                                    <p> {annotationValue} </p>
                                </div>
                            }
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

                        {user.orcid === annotation['oa:creator']['ods:id'] &&
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
                                                if (window.confirm(`Delete annotation with id: ${annotation['ods:id']}`)) {
                                                    DeleteAnnotation(annotation['ods:id'], KeycloakService.GetToken());
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
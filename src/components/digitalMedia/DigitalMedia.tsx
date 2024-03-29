/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import KeycloakService from 'keycloak/Keycloak';
import classNames from 'classnames';
import { RandomString } from 'app/Utilities';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getDigitalMedia, setDigitalMedia, getDigitalMediaVersions, setDigitalMediaVersions,
    getDigitalMediaAnnotations, setDigitalMediaAnnotations, getAllowVisualAnnotations
} from 'redux/digitalMedia/DigitalMediaSlice';
import {
    setMASTarget, getAnnotateTarget, setAnnotateTarget,
    setEditAnnotation, getSidePanelToggle, setSidePanelToggle
} from 'redux/annotate/AnnotateSlice';
import { pushToPromptMessages, getAnnotoriousMode, setAnnotoriousMode } from 'redux/general/GeneralSlice';

/* Import Types */
import { DigitalMediaAnnotations } from 'app/Types';
import { Annotation } from 'app/types/Annotation';

/* Import Styles */
import styles from './digitalMedia.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVectorSquare } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import Header from 'components/general/header/Header';
import TitleBar from './components/TitleBar';
import IDCard from './components/IDCard/IDCard';
import VersionSelect from 'components/general/versionSelect/VersionSelect';
import DigitalMediaFrame from './components/digitalMedia/DigitalMediaFrame';
import DigitalMediaList from './components/digitalMedia/DigitalMediaList';
import ActionsDropdown from 'components/general/actionsDropdown/ActionsDropdown';
import AnnotationTools from 'components/annotate/AnnotationTools';
import Footer from 'components/general/footer/Footer';

/* Import API */
import GetDigitalMedia from 'api/digitalMedia/GetDigitalMedia';
import GetDigitalMediaAnnotations from 'api/digitalMedia/GetDigitalMediaAnnotations';
import GetDigitalMediaVersions from 'api/digitalMedia/GetDigitalMediaVersions';
import GetDigitalMediaMachineJobRecords from 'api/digitalMedia/GetDigitalMediaMachineJobRecords';


const DigitalMedia = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();

    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);
    const digitalMediaVersions = useAppSelector(getDigitalMediaVersions);
    const digitalMediaAnnotations = useAppSelector(getDigitalMediaAnnotations);
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const annotoriousMode = useAppSelector(getAnnotoriousMode);
    const sidePanelToggle = useAppSelector(getSidePanelToggle);
    const allowVisualAnnotations = useAppSelector(getAllowVisualAnnotations);
    const [automatedAnnotationsToggle, setAutomatedAnnotationsToggle] = useState<boolean>(false);

    const digitalMediaActions = [
        { value: 'json', label: 'View JSON' },
        { value: 'sidePanel', label: 'View all Annotations' },
        { value: 'automatedAnnotations', label: 'Trigger Automated Annotations', isDisabled: !KeycloakService.IsLoggedIn() }
    ];

    /* OnLoad: Check for Digital Media, otherwise grab from database */
    useEffect(() => {
        const digitalMediaId = `${params.prefix}/${params.suffix}`;

        /* Fetch Digital Media if not present or not equal to params ID; if version has changed, refetch Digital Media with version */
        if (isEmpty(digitalMedia) || digitalMedia.digitalEntity['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '') !== digitalMediaId) {
            /* Check for version in url */
            let version: string = '';

            if (params.version) {
                version = `/${params.version}`;
            }

            GetDigitalMedia(`${params.prefix}/${params.suffix}${version}`).then((digitalMedia) => {
                dispatch(setDigitalMedia(digitalMedia));

                /* Get Digital Media annotations */
                GetDigitalMediaAnnotations(digitalMedia.digitalEntity['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '')).then((annotations) => {
                    dispatch(setDigitalMediaAnnotations(annotations));
                }).catch(error => {
                    console.warn(error);
                });

                /* Get Digital Media versions */
                GetDigitalMediaVersions(digitalMedia.digitalEntity['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '')).then((versions) => {
                    dispatch(setDigitalMediaVersions(versions));
                }).catch(error => {
                    console.warn(error);
                });
            }).catch(error => {
                console.warn(error);
            });
        } else if (params.version && digitalMedia.digitalEntity['ods:version'].toString() !== params.version) {
            /* Get Specimen with version */
            const originalVersion = digitalMedia.digitalEntity.version;

            GetDigitalMedia(`${params['prefix']}/${params['suffix']}`, params.version).then((digitalMedia) => {
                /* Set Digital Media */
                dispatch(setDigitalMedia(digitalMedia));
            }).catch(error => {
                console.warn(error);

                /* If version fetch failed, reset to original version */
                navigate(`/dm/${params.prefix}/${params.suffix}/${originalVersion}`)

                /* Show Error Message */
                dispatch(pushToPromptMessages({
                    key: RandomString(),
                    message: `The selected version: ${params.version}, of Digital Media could not be retrieved.`,
                    template: 'error'
                }));
            });
        }
    }, [digitalMedia, params]);

    /* Function for executing Digital Media Actions */
    const DigitalMediaActions = (action: string) => {
        switch (action) {
            case 'json':
                window.open(`${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}` +
                `/api/v1/digitalmedia/${digitalMedia.digitalEntity['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '')}`);

                return;
            case 'sidePanel':
                ShowWithAnnotations();

                return;
            case 'automatedAnnotations':
                /* Set MAS Target */
                dispatch(setMASTarget(digitalMedia.digitalEntity));

                /* Open MAS Modal */
                setAutomatedAnnotationsToggle(true);

                return;
            default:
                return;
        }
    }

    /* Function for updating the Digital Media Annotations source */
    const UpdateAnnotationsSource = (annotation: Annotation, remove: boolean = false) => {
        const copyDigitalMediaAnnotations = { ...digitalMediaAnnotations };
        let propertyPath: string;

        /* Define property path from field or class */
        if (annotation['oa:target']['oa:selector']?.['ods:field']) {
            propertyPath = (annotation['oa:target']['oa:selector']?.['ods:field'] as string).replace('$.', '');
        } else if (annotation['oa:target']['oa:selector']?.['ac:hasRoi']) {
            propertyPath = 'visual';
        } else {
            propertyPath = (annotation['oa:target']['oa:selector']?.['oa:class'] as string).replace('$.', '');
        }

        if (propertyPath in copyDigitalMediaAnnotations) {
            /* Push or patch to existing array */
            const copyDigitalMediaTargetAnnotations = [...digitalMediaAnnotations[propertyPath]];

            const index = copyDigitalMediaTargetAnnotations.findIndex(
                (annotationRecord) => annotationRecord['ods:id'] === annotation['ods:id']
            );

            if (index >= 0) {
                if (remove) {
                    copyDigitalMediaTargetAnnotations.splice(index, 1);
                } else {
                    copyDigitalMediaTargetAnnotations[index] = annotation;
                }
            } else {
                copyDigitalMediaTargetAnnotations.push(annotation);
            }

            copyDigitalMediaAnnotations[propertyPath] = copyDigitalMediaTargetAnnotations;
        } else {
            /* Create into new array */
            copyDigitalMediaAnnotations[propertyPath] = [annotation];
        }

        dispatch(setDigitalMediaAnnotations(copyDigitalMediaAnnotations));
    }

    /* Function to open Side Panel with Annotations of Digital Media, default is all Annotations */
    const ShowWithAnnotations = (annotations?: DigitalMediaAnnotations, propertyName?: string, propertyType?: string, index?: number) => {
        /* Add up all property annotations into one annotations array */
        let allAnnotations: Annotation[] = [];

        /* Append to the all annotations array, if property is the same, or all annotations are wanted */
        Object.entries(annotations ?? digitalMediaAnnotations).forEach((annotationEntry) => {
            if (!propertyName || propertyName === annotationEntry[0]) {
                allAnnotations = allAnnotations.concat(annotationEntry[1]);
            }
        });

        /* Empty Edit Annotation if other target is chosen */
        if (propertyName && propertyName !== annotateTarget.targetProperty.name) {
            dispatch(setEditAnnotation({} as Annotation));
        }

        dispatch(setAnnotateTarget({
            targetProperty: {
                name: propertyName ?? '',
                type: propertyType ?? 'field',
                ...(index && { index: index })
            },
            target: digitalMedia.digitalEntity,
            targetType: 'DigitalMedia',
            annotations: allAnnotations
        }));

        dispatch(setSidePanelToggle(true));
    }

    /* Function for refreshing Annotations */
    const RefreshAnnotations = (propertyName?: string) => {
        /* Refetch Digital Media Annotations */
        GetDigitalMediaAnnotations(digitalMedia.digitalEntity['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '')).then((annotations) => {
            /* Show with refreshed Annotations */
            ShowWithAnnotations(annotations, propertyName);

            /* Update Annotations source */
            dispatch(setDigitalMediaAnnotations(annotations));
        }).catch(error => {
            console.warn(error);
        });
    }

    /* Class Names */
    const classDigitalMediaContent = classNames({
        'col-md-10 offset-md-1': !sidePanelToggle,
        'col-md-12 px-5': sidePanelToggle
    });

    const classHeadCol = classNames({
        'transition h-100': true,
        'col-md-12': !sidePanelToggle,
        'col-md-8': sidePanelToggle
    });

    const classImageAnnotateButton = classNames({
        'primaryButton px-3 py-2 d-flex align-items-center': true,
        'active': annotoriousMode === 'draw'
    });

    return (
        <div className="h-100 overflow-hidden">
            <Row className="h-100">
                <Col className={classHeadCol}>
                    <div className="h-100 d-flex flex-column">
                        <Header />

                        {Object.keys(digitalMedia).length > 0 &&
                            <Container fluid className="flex-grow-1 overflow-hidden pt-5">
                                <Row className="h-100">
                                    <Col className={`${classDigitalMediaContent} h-100 transition`}>
                                        <div className="h-100 d-flex flex-column">
                                            <Row className={styles.titleBar}>
                                                <Col>
                                                    <TitleBar />
                                                </Col>
                                            </Row>
                                            <Row className="py-4 flex-grow-1 overflow-scroll overflow-lg-hidden">
                                                <Col lg={{ span: 3 }} className="h-100">
                                                    <IDCard ShowWithAnnotations={
                                                        (annotations?: DigitalMediaAnnotations, targetName?: string, targetType?: string) =>
                                                            ShowWithAnnotations(annotations, targetName, targetType)
                                                    } />
                                                </Col>
                                                <Col lg={{ span: 9 }} className="ps-4 h-100 mt-4 m-lg-0">
                                                    <div className="h-100 d-flex flex-column">
                                                        <Row>
                                                            <Col className="col-md-auto">
                                                                <VersionSelect target={digitalMedia.digitalEntity}
                                                                    versions={digitalMediaVersions}
                                                                />
                                                            </Col>
                                                            <Col />
                                                            {(digitalMedia.digitalEntity['dcterms:type'] === 'StillImage' && KeycloakService.IsLoggedIn() && allowVisualAnnotations) &&
                                                                <Col className="col-md-auto pe-0">
                                                                    <button type="button"
                                                                        className={classImageAnnotateButton}
                                                                        onClick={() => {
                                                                            if (annotoriousMode === 'move') {
                                                                                dispatch(setAnnotoriousMode('draw'));
                                                                            } else {
                                                                                dispatch(setAnnotoriousMode('move'));
                                                                            }
                                                                        }
                                                                        }
                                                                    >
                                                                        <FontAwesomeIcon icon={faVectorSquare}
                                                                            className="fs-3"
                                                                        />
                                                                        <span className="fs-4 ms-2"> Make annotation </span>
                                                                    </button>
                                                                </Col>
                                                            }
                                                            <Col className="col-md-auto">
                                                                <ActionsDropdown actions={digitalMediaActions}
                                                                    Actions={(action: string) => DigitalMediaActions(action)}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row className="flex-grow-1 overflow-hidden mt-3">
                                                            <Col className="h-100 pb-2">
                                                                <DigitalMediaFrame
                                                                    UpdateAnnotationsSource={(annotation: Annotation, remove: boolean) => UpdateAnnotationsSource(annotation, remove)}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row className={styles.digitalMediaListBlock}>
                                                            <Col className="h-100">
                                                                <DigitalMediaList />
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Container >
                        }

                        <Footer />
                    </div>
                </Col>

                {/* Annotation Tools */}
                <AnnotationTools targetId={!isEmpty(digitalMedia.digitalEntity) ? digitalMedia.digitalEntity['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '') : ''}
                    sidePanelToggle={sidePanelToggle}
                    automatedAnnotationsToggle={automatedAnnotationsToggle}
                    SetAutomatedAnnotationToggle={(toggle: boolean) => setAutomatedAnnotationsToggle(toggle)}
                    ShowWithAnnotations={() => ShowWithAnnotations()}
                    UpdateAnnotationsSource={(annotation: Annotation, remove?: boolean) => UpdateAnnotationsSource(annotation, remove)}
                    RefreshAnnotations={(targetProperty: string) => RefreshAnnotations(targetProperty)}
                    GetMachineJobRecords={GetDigitalMediaMachineJobRecords}
                />
            </Row>
        </div>
    );
}

export default DigitalMedia;
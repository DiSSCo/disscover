/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import KeycloakService from 'keycloak/Keycloak';
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getDigitalMedia, setDigitalMedia,
    getDigitalMediaVersions, setDigitalMediaVersions,
    getDigitalMediaAnnotations, setDigitalMediaAnnotations
} from 'redux/digitalMedia/DigitalMediaSlice';
import {
    setMASTarget, setAnnotateTarget,
    getSidePanelToggle, setSidePanelToggle
} from 'redux/annotate/AnnotateSlice';
import { setErrorMessage } from 'redux/general/GeneralSlice';

/* Import Types */
import { Annotation } from 'global/Types';

/* Import Styles */
import styles from './digitalMedia.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import TitleBar from './components/TitleBar';
import IDCard from './components/IDCard/IDCard';
import VersionSelect from 'components/general/versionSelect/VersionSelect';
import DigitalMediaFrame from './components/digitalMedia/DigitalMediaFrame';
import DigitalMediaList from './components/digitalMedia/DigitalMediaList';
import ActionsDropdown from 'components/general/actionsDropdown/ActionsDropdown';
import SidePanel from 'components/annotate/sidePanel/SidePanel';
import AutomatedAnnotationsModal from '../general/automatedAnnotations/automatedAnnotations/AutomatedAnnotationsModal';
import Footer from 'components/general/footer/Footer';

/* Import API */
import GetDigitalMedia from 'api/digitalMedia/GetDigitalMedia';
import GetDigitalMediaAnnotations from 'api/digitalMedia/GetDigitalMediaAnnotations';
import GetDigitalMediaVersions from 'api/digitalMedia/GetDigitalMediaVersions';


const DigitalMedia = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();

    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);
    const digitalMediaVersions = useAppSelector(getDigitalMediaVersions);
    const digitalMediaAnnotations = useAppSelector(getDigitalMediaAnnotations);
    const sidePanelToggle = useAppSelector(getSidePanelToggle);
    const [automatedAnnotationsToggle, setAutomatedAnnotationToggle] = useState(false);

    const digitalMediaActions = [
        { value: 'json', label: 'View JSON' },
        { value: 'sidePanel', label: 'View all Annotations' },
        { value: 'automatedAnnotations', label: 'Trigger Automated Annotations', isDisabled: !KeycloakService.IsLoggedIn() }
    ];

    /* OnLoad: Check for Digital Media, otherwise grab from database */
    useEffect(() => {
        const digitalMediaId = `${params.prefix}/${params.suffix}`;

        /* Fetch Digital Media if not present or not equal to params ID; if version has changed, refetch Digital Media with version */
        if (isEmpty(digitalMedia) || digitalMedia.id.replace('https://hdl.handle.net/', '') !== digitalMediaId) {
            /* Check for version in url */
            let version: string = '';

            if (params.version) {
                version = `/${params.version}`;
            }

            GetDigitalMedia(`${params.prefix}/${params.suffix}${version}`).then((digitalMedia) => {
                dispatch(setDigitalMedia(digitalMedia));

                /* Get Digital Media annotations */
                GetDigitalMediaAnnotations(digitalMedia.id.replace('https://hdl.handle.net/', '')).then((annotations) => {
                    console.log(annotations);

                    dispatch(setDigitalMediaAnnotations(annotations));
                }).catch(error => {
                    console.warn(error);
                });

                /* Get Digital Media versions */
                GetDigitalMediaVersions(digitalMedia.id.replace('https://hdl.handle.net/', '')).then((versions) => {
                    dispatch(setDigitalMediaVersions(versions));
                }).catch(error => {
                    console.warn(error);
                });
            }).catch(error => {
                console.warn(error);
            });
        } else if (params.version && digitalMedia.version.toString() !== params.version) {
            /* Get Specimen with version */
            const originalVersion = digitalMedia.version;

            GetDigitalMedia(`${params['prefix']}/${params['suffix']}`, params.version).then((digitalMedia) => {
                /* Set Digital Media */
                dispatch(setDigitalMedia(digitalMedia));
            }).catch(error => {
                console.warn(error);

                /* If version fetch failed, reset to original version */
                navigate(`/dm/${params.prefix}/${params.suffix}/${originalVersion}`)

                /* Show Error Message */
                dispatch(setErrorMessage(`The selected version: ${params.version}, of Digital Media could not be retrieved.`));
            });
        }
    }, [digitalMedia, params]);

    /* Function for executing Digital Media Actions */
    const DigitalMediaActions = (action: string) => {
        switch (action) {
            case 'json':
                window.open(`https://sandbox.dissco.tech/api/v1/digitalmedia/${digitalMedia.id.replace('https://hdl.handle.net/', '')}`);

                return;
            case 'sidePanel':
                ShowWithAllAnnotations();

                return;
            case 'automatedAnnotations':
                /* Set MAS Target */
                dispatch(setMASTarget(digitalMedia));

                /* Open MAS Modal */
                setAutomatedAnnotationToggle(true);

                return;
            default:
                return;
        }
    }

    /* Function for updating the Digital Media Annotations source */
    const UpdateAnnotationsSource = (annotation: Annotation, remove: boolean = false) => {
        const copyDigitalMediaAnnotations = { ...digitalMediaAnnotations };

        /* Check if array for target property exists */
        if (annotation.target.indvProp in digitalMediaAnnotations) {
            /* Push or patch to existing array */
            const copyDigitalMediaTargetAnnotations = [...digitalMediaAnnotations[annotation.target.indvProp]];
            const index = copyDigitalMediaTargetAnnotations.findIndex(
                (annotationRecord) => annotationRecord.id === annotation.id
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

            copyDigitalMediaAnnotations[annotation.target.indvProp] = copyDigitalMediaTargetAnnotations;
        } else {
            /* Create into new array */
            copyDigitalMediaAnnotations[annotation.target.indvProp] = [annotation];
        }

        dispatch(setDigitalMediaAnnotations(copyDigitalMediaAnnotations));
    }

    /* Function to open Side Panel with all Annotations of Digital Media */
    const ShowWithAllAnnotations = () => {
        /* Add up all property annotations into one annotations array */
        let allAnnotations: Annotation[] = [];

        Object.values(digitalMediaAnnotations).forEach((annotationsArray) => {
            allAnnotations = allAnnotations.concat(annotationsArray);
        });

        dispatch(setAnnotateTarget({
            property: '',
            target: digitalMedia,
            targetType: 'digital_media',
            annotations: allAnnotations
        }));

        dispatch(setSidePanelToggle(true));
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

    const classSidePanel = classNames({
        'p-0': true,
        'w-0': !sidePanelToggle,
        'col-md-4': sidePanelToggle
    });

    return (
        <div className="d-flex flex-column min-vh-100 overflow-hidden">
            <Row>
                <Col className={classHeadCol}>
                    <Header />

                    {Object.keys(digitalMedia).length > 0 &&
                        <Container fluid className={`${styles.content} pt-5`}>
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
                                                <IDCard />
                                            </Col>
                                            <Col lg={{ span: 9 }} className="ps-4 h-100 mt-4 m-lg-0">
                                                <div className="h-100 d-flex flex-column">
                                                    <Row>
                                                        <Col className="col-md-auto">
                                                            <VersionSelect target={digitalMedia}
                                                                versions={digitalMediaVersions}
                                                            />
                                                        </Col>
                                                        <Col />
                                                        <Col className="col-md-auto">
                                                            <ActionsDropdown actions={digitalMediaActions}
                                                                Actions={(action: string) => DigitalMediaActions(action)}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className="flex-grow-1 overflow-hidden mt-3">
                                                        <Col className="h-100 pb-2">
                                                            <DigitalMediaFrame />
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

                            {/* Automated Annotations Modal for Digital Media */}
                            <AutomatedAnnotationsModal automatedAnnotationsToggle={automatedAnnotationsToggle}
                                HideAutomatedAnnotationsModal={() => setAutomatedAnnotationToggle(false)}
                            />
                        </Container >
                    }

                    <Footer />
                </Col>

                {/* Annotations Side Panel for Digital Media */}
                <div className={`${classSidePanel} transition`}>
                    <SidePanel ShowWithAllAnnotations={() => ShowWithAllAnnotations()}
                        UpdateAnnotationsSource={(annotation: Annotation, remove?: boolean) => UpdateAnnotationsSource(annotation, remove)}
                    />
                </div>
            </Row>
        </div>
    );
}

export default DigitalMedia;
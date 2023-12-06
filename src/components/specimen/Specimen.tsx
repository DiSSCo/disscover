/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { RandomString } from 'app/Utilities';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getSpecimen, setSpecimen, setSpecimenVersions,
    setSpecimenDigitalMedia, getSpecimenAnnotations, setSpecimenAnnotations
} from 'redux/specimen/SpecimenSlice';
import {
    getSidePanelToggle, setSidePanelToggle, setAnnotateTarget
} from 'redux/annotate/AnnotateSlice';
import { getScreenSize, pushToPromptMessages } from 'redux/general/GeneralSlice';

/* Import Types */
import { SpecimenAnnotations } from 'app/Types';
import { Annotation } from 'app/types/Annotation';

/* Import Components */
import Header from 'components/general/header/Header';
import TitleBar from './components/TitleBar';
import IDCard from './components/IDCard/IDCard';
import ContentBlock from './components/ContentBlock';
import AnnotationTools from 'components/annotate/AnnotationTools';
import Footer from 'components/general/footer/Footer';

/* Import Introduction Steps */
import SpecimenSteps from './steps/SpecimenSteps';
import AnnotateSteps from './steps/AnnotateSteps';
import MASSteps from './steps/MASSteps';

/* Import API */
import GetSpecimen from 'api/specimen/GetSpecimen';
import GetSpecimenFull from 'api/specimen/GetSpecimenFull';
import GetSpecimenVersions from 'api/specimen/GetSpecimenVersions';
import GetSpecimenAnnotations from 'api/specimen/GetSpecimenAnnotations';


const Specimen = () => {
    /* Configure Store */
    const dispatch = useAppDispatch();

    /* Hooks */
    const params = useParams();
    const navigate = useNavigate();

    /* Base variables */
    const screenSize = useAppSelector(getScreenSize);
    const specimen = useAppSelector(getSpecimen);
    const specimenAnnotations = useAppSelector(getSpecimenAnnotations);
    const sidePanelToggle = useAppSelector(getSidePanelToggle);
    const [selectedTab, setSelectedTab] = useState(0);
    const [automatedAnnotationsToggle, setAutomatedAnnotationToggle] = useState(false);

    /* Onload or Version change: Check for Specimen, otherwise grab full (specific version) from database */
    useEffect(() => {
        const specimenId = `${params.prefix}/${params.suffix}`;

        /* Fetch Full Specimen if not present or not equal to params ID; if version has changed, refetch Specimen with version */
        if (isEmpty(specimen.digitalSpecimen) || specimen.digitalSpecimen['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '') !== specimenId) {
            /* Check for version in url */
            let version: string = '';

            if (params.version) {
                version = `/${params.version}`;
            }

            /* Get full Specimen */
            GetSpecimenFull(`${params.prefix}/${params.suffix}${version}`).then((fullSpecimen) => {
                if (fullSpecimen) {
                    /* Set Specimen */
                    dispatch(setSpecimen(fullSpecimen.specimen));

                    /* Set Specimen Digital Media */
                    dispatch(setSpecimenDigitalMedia(fullSpecimen.digitalMedia));

                    /* Set Specimen Annotations */
                    dispatch(setSpecimenAnnotations(fullSpecimen.annotations));

                    /* Get Specimen Versions */
                    GetSpecimenVersions(fullSpecimen.specimen.digitalSpecimen['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '')).then((versions) => {
                        dispatch(setSpecimenVersions(versions));
                    }).catch(error => {
                        console.warn(error);
                    });
                }
            }).catch(error => {
                console.warn(error);
            });
        } else if (params.version && specimen.digitalSpecimen['ods:version'].toString() !== params.version) {
            /* Get Specimen with version */
            const originalVersion = specimen.digitalSpecimen.version;

            GetSpecimen(`${params['prefix']}/${params['suffix']}`, params.version).then((specimen) => {
                if (!isEmpty(specimen)) {
                    /* Set Specimen */
                    dispatch(setSpecimen(specimen));
                } else {
                    /* If version fetch failed, reset to original version */
                    navigate(`/ds/${params.prefix}/${params.suffix}/${originalVersion}`)

                    /* Show Error Message */
                    dispatch(pushToPromptMessages({
                        key: RandomString(),
                        message: `The selected version: ${params.version}, of Specimen could not be retrieved.`,
                        template: 'error'
                    }));
                }
            }).catch(error => {
                console.warn(error);
            });
        }
    }, [specimen, params]);

    /* Function for updating the Specimen Annotations source */
    const UpdateAnnotationsSource = (annotation: Annotation, remove: boolean = false) => {
        const copySpecimenAnnotations = { ...specimenAnnotations };
        let propertyPath: string;

        /* Define property path from field or class */
        if (annotation['oa:target']['oa:selector']?.['ods:field']) {
            propertyPath = (annotation['oa:target']['oa:selector']?.['ods:field'] as string).replace('$.', '');
        } else {
            propertyPath = (annotation['oa:target']['oa:selector']?.['oa:class'] as string).replace('$.', '');
        }

        /* Check if array for target property exists */
        if (propertyPath in specimenAnnotations) {
            /* Push or patch to existing array */
            const copySpecimenTargetAnnotations = [...specimenAnnotations[propertyPath]];

            const index = copySpecimenTargetAnnotations.findIndex(
                (annotationRecord) => annotationRecord['ods:id'] === annotation['ods:id']
            );

            if (index >= 0) {
                if (remove) {
                    copySpecimenTargetAnnotations.splice(index, 1);
                } else {
                    copySpecimenTargetAnnotations[index] = annotation;
                }
            } else {
                copySpecimenTargetAnnotations.push(annotation);
            }

            copySpecimenAnnotations[propertyPath] = copySpecimenTargetAnnotations;
        } else {
            /* Create into new array */
            copySpecimenAnnotations[propertyPath] = [annotation];
        }

        dispatch(setSpecimenAnnotations(copySpecimenAnnotations));
    }

    /* Function to open Side Panel with Annotations of Specimen, default is all Annotations */
    const ShowWithAnnotations = (annotations?: SpecimenAnnotations, targetProperty?: string, index?: number) => {
        /* Add up all property annotations into one annotations array */
        let allAnnotations: Annotation[] = [];

        /* Append to the all annotations array, if property is the same, or all annotations are wanted */
        Object.entries(annotations ?? specimenAnnotations).forEach((annotationEntry) => {
            if (!targetProperty || targetProperty === annotationEntry[0]) {
                allAnnotations = allAnnotations.concat(annotationEntry[1]);
            }
        });

        dispatch(setAnnotateTarget({
            targetProperty: {
                name: targetProperty ?? '',
                type: 'field',
                ...(index && { index: index })
            },
            target: specimen.digitalSpecimen,
            targetType: 'DigitalSpecimen',
            annotations: allAnnotations
        }));

        dispatch(setSidePanelToggle(true));
    }

    /* Function for refreshing Annotations */
    const RefreshAnnotations = (targetProperty?: string) => {
        /* Refetch Specimen Annotations */
        GetSpecimenAnnotations(specimen.digitalSpecimen['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '')).then((annotations) => {
            /* Show with refreshed Annotations */
            ShowWithAnnotations(annotations, targetProperty);

            /* Update Annotations source */
            dispatch(setSpecimenAnnotations(annotations));
        }).catch(error => {
            console.warn(error);
        });
    }

    /* Class Name for Specimen Content */
    const classSpecimenContent = classNames({
        'col-md-10 offset-md-1': !sidePanelToggle,
        'col-md-12 px-5': sidePanelToggle
    });

    const classHeadCol = classNames({
        'transition h-100': true,
        'col-md-12': !sidePanelToggle,
        'col-md-8': sidePanelToggle
    });

    const classIdCard = classNames({
        'h-100': screenSize === 'lg'
    });

    return (
        <div className="h-100 overflow-hidden">
            <Row className="h-100">
                <Col className={classHeadCol}>
                    <div className="h-100 d-flex flex-column">
                        <Header introTopics={[
                            { intro: 'specimen', title: 'About This Page' },
                            { intro: 'annotate', title: 'Using Annotations' },
                            { intro: 'MAS', title: 'Machine Annotation Services' }
                        ]} />

                        <SpecimenSteps SetSelectedTab={(tabIndex: number) => setSelectedTab(tabIndex)} />
                        <AnnotateSteps ShowWithAnnotations={(annotations?: SpecimenAnnotations, property?: string) => ShowWithAnnotations(annotations, property)} />
                        <MASSteps automatedAnnotationsToggle={automatedAnnotationsToggle}
                            SetAutomatedAnnotationsToggle={(toggle: boolean) => setAutomatedAnnotationToggle(toggle)}
                            ShowWithAnnotations={() => ShowWithAnnotations()}
                        />

                        <div className="flex-grow-1 overflow-hidden">
                            {(specimen.digitalSpecimen['ods:id'] && specimen.digitalSpecimen['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '') === `${params['prefix']}/${params['suffix']}`) &&
                                <Container fluid className="h-100 pt-5">
                                    <Row className="h-100">
                                        <Col className={`${classSpecimenContent} h-100 transition`}>
                                            <div className="h-100 d-flex flex-column">
                                                <Row className="titleBar">
                                                    <Col>
                                                        <TitleBar ShowWithAllAnnotations={() => ShowWithAnnotations()}
                                                            ToggleAutomatedAnnotations={() => setAutomatedAnnotationToggle(!automatedAnnotationsToggle)}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="py-4 flex-grow-1 overflow-scroll overflow-lg-hidden">
                                                    <Col lg={{ span: 3 }} className={`${classIdCard} IDCard`}>
                                                        <IDCard />
                                                    </Col>
                                                    <Col lg={{ span: 9 }} className="contentBlock ps-4 h-100 mt-4 m-lg-0">
                                                        <ContentBlock selectedTab={selectedTab}
                                                            SetSelectedTab={(tabIndex: number) => setSelectedTab(tabIndex)}
                                                            ShowWithAnnotations={
                                                                (annotations?: SpecimenAnnotations, property?: string, index?: number) =>
                                                                    ShowWithAnnotations(annotations, property, index)
                                                            }
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            }
                        </div>

                        <Footer />
                    </div>
                </Col>

                {/* Annotation Tools */}
                <AnnotationTools sidePanelToggle={sidePanelToggle}
                    automatedAnnotationsToggle={automatedAnnotationsToggle}
                    SetAutomatedAnnotationToggle={(toggle: boolean) => setAutomatedAnnotationToggle(toggle)}
                    ShowWithAnnotations={() => ShowWithAnnotations()}
                    UpdateAnnotationsSource={(annotation: Annotation, remove?: boolean) => UpdateAnnotationsSource(annotation, remove)}
                    RefreshAnnotations={(targetProperty: string) => RefreshAnnotations(targetProperty)}
                />
            </Row>
        </div>
    );
}

export default Specimen;
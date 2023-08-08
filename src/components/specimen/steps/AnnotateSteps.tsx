/* Import Dependencies */
import { useState } from 'react';
import KeycloakService from 'keycloak/Keycloak';
import { Steps } from 'intro.js-react';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getIntroTopic, setIntroTopic } from 'redux/general/GeneralSlice';
import { getSpecimen, getSpecimenAnnotations } from 'redux/specimen/SpecimenSlice';
import {
    getSidePanelToggle, setSidePanelToggle, setAnnotationFormToggle,
    setEditAnnotation, getAnnotateTarget, setAnnotateTarget
} from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Annotation } from 'global/Types';

/* Import Sources */
import SpecimenIntro from 'sources/introText/specimen.json';


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function
};


const AnnotateSteps = (props: Props) => {
    const { ShowWithAnnotations } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const introTopic = useAppSelector(getIntroTopic);
    const sidePanelToggle = useAppSelector(getSidePanelToggle);
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const specimen = useAppSelector(getSpecimen);
    const specimenAnnotations = useAppSelector(getSpecimenAnnotations);
    const [targetInterval, setTargetInterval] = useState<NodeJS.Timer>();
    const annotateIntro = SpecimenIntro.annotate;

    /* Dummy Annotation for Showcase */
    const dummyAnnotation: Annotation = {
        id: '20.5000.1025/dummy',
        version: 1,
        type: 'Annotation',
        motivation: 'commenting',
        target: { ...specimen, indvProp: 'ods:specimenName' },
        body: {
            type: 'ods:specimenName',
            value: 'Spinosaurus Aegyptiacus'
        },
        created: Date.now(),
        creator: KeycloakService.GetSubject() as string
    }

    /* Function for property interval */
    const PropertyInterval = () => {
        const properties = ['ods:physicalSpecimenId', 'dcterms:license', 'ods:specimenName'];
        let i = 0;

        setTargetInterval(setInterval(() => {
            const property = properties[i];

            ShowWithAnnotations(specimenAnnotations, property);

            if (i === 2) {
                i = 0;

                return;
            }

            i++
        }, 1500));
    }

    /* Function for updating the Annotation view after posting, patching or deleting */
    const UpdateAnnotationView = (annotation: Annotation, remove: boolean = false) => {
        /* Update Annotations array of target */
        const copyAnnotateTarget = { ...annotateTarget };
        const copyAnnotations = [...copyAnnotateTarget.annotations];
        const annotationIndex = copyAnnotations.findIndex((annotationRecord) => annotationRecord.id === annotation.id);

        /* If annotation was deleted, remove from array; patched, update array instance; else push to array */
        if (remove) {
            copyAnnotations.splice(annotationIndex, 1);
        } else if (annotationIndex !== -1) {
            copyAnnotations[annotationIndex] = annotation;
        } else {
            copyAnnotations.push(annotation);
        }

        copyAnnotateTarget.annotations = copyAnnotations;

        dispatch(setAnnotateTarget(copyAnnotateTarget));

        /* Disable edit annotation */
        dispatch(setEditAnnotation({} as Annotation));

        /* Return to Annotations overview */
        dispatch(setAnnotationFormToggle(false));
    }

    /* Construct Intro.js steps for Specimen page */
    const steps = [
        {
            intro: annotateIntro[0]
        },
        {
            intro: annotateIntro[1]
        },
        {
            element: ".specimenActions",
            intro: annotateIntro[2]
        },
        {
            element: ".sidePanel",
            intro: annotateIntro[3]
        },
        {
            element: ".sidePanelFilters",
            intro: annotateIntro[4]
        },
        {
            element: ".sidePanelCloseIcon",
            intro: annotateIntro[5]
        },
        {
            intro: annotateIntro[6]
        },
        {
            element: ".scientificName",
            intro: annotateIntro[7]
        },
        {
            element: ".sidePanel",
            intro: annotateIntro[8]
        },
        {
            element: ".sidePanelTop",
            intro: annotateIntro[9]
        },
        {
            element: ".sidePanelCloseIcon",
            intro: annotateIntro[10]
        }
    ];

    /* If logged in, push steps for managing annotations to array */
    if (KeycloakService.IsLoggedIn()) {
        steps.push(...[
            {
                element: ".addAnnotationButton",
                intro: annotateIntro[11]
            },
            {
                element: ".sidePanelBody",
                intro: annotateIntro[12]
            },
            {
                element: ".sidePanelBody",
                intro: annotateIntro[13]
            },
            {
                element: ".sidePanelBody",
                intro: annotateIntro[14]
            },
            {
                element: ".sidePanelBody",
                intro: annotateIntro[15]
            },
            {
                element: ".sidePanelBody",
                intro: annotateIntro[16]
            },
            {
                element: ".sidePanelBody",
                intro: annotateIntro[17]
            }
        ]);
    } else {
        steps.push({
            intro: "To add new annotations, you need to be logged into your DiSSCo account."
        });
    }

    return (
        <>
            <Steps enabled={introTopic === 'annotate'}
                steps={steps ?? []}
                initialStep={0}
                onBeforeChange={(nextIndex) => {
                    const Proceed = (resolve: Function) => {
                        if (nextIndex === 6) {
                            /* On step 7: Hide the Side Panel */
                            dispatch(setSidePanelToggle(false));
                            dispatch(setAnnotationFormToggle(false));

                            resolve();
                        } else if (nextIndex === 8) {
                            /* On step 9: Set annotate target for specimen name */
                            ShowWithAnnotations(specimenAnnotations, 'ods:specimenName');
                            dispatch(setAnnotationFormToggle(false));

                            resolve();
                        } else if (nextIndex === 9) {
                            /* On step 10: Loop over specimen name, physical id and license properties */
                            PropertyInterval();

                            dispatch(setAnnotationFormToggle(false));

                            resolve();
                        } else if (nextIndex === 10) {
                            /* On step 11: Return to Annotations overview */
                            ShowWithAnnotations(specimenAnnotations);
                            dispatch(setAnnotationFormToggle(false));

                            resolve();
                        } else if (nextIndex === 12 || nextIndex === 13) {
                            /* On step 13: Trigger the Annotations form */
                            dispatch(setAnnotationFormToggle(true));

                            resolve();
                        } else if (nextIndex === 14) {
                            /* On step 15: Set edit annotation with motivation type */
                            dispatch(setEditAnnotation(dummyAnnotation));
                            dispatch(setAnnotationFormToggle(true));

                            resolve();
                        } else if (nextIndex === 15) {
                            /* On step 16: Update Annotations Overview wth dummy annotation */
                            UpdateAnnotationView(dummyAnnotation);

                            resolve();
                        } else {
                            dispatch(setAnnotationFormToggle(false));
                            resolve();
                        }

                        clearInterval(targetInterval);
                    }

                    return new Promise((resolve) => {
                        if ([3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].includes(nextIndex) && !sidePanelToggle) {
                            dispatch(setSidePanelToggle(true));
                            ShowWithAnnotations(specimenAnnotations);

                            setTimeout(() => {
                                Proceed(resolve);
                            }, 500);
                        } else {
                            Proceed(resolve);
                        }
                    });
                }}
                onExit={() => {
                    /* Reset intro topic */
                    dispatch(setIntroTopic(''));
                    clearInterval(targetInterval);
                    UpdateAnnotationView(dummyAnnotation, true);
                }}
            />
        </>
    );
}

export default AnnotateSteps;
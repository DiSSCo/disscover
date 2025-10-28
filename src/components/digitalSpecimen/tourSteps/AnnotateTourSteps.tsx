/* Import Dependencies */
import { Steps } from 'intro.js-react';
import KeycloakService from 'app/Keycloak';
import { useRef, useState } from 'react';

/* Import Config */
import StepsConfig from 'app/config/StepsConfig';

/* Import Hooks */
import { useAppSelector, useAppDispatch, useTrigger } from 'app/Hooks';

/* Import Store */
import { setAnnotationMode, setAnnotationTarget } from 'redux-store/AnnotateSlice';
import {
    setAnnotationWizardDummyAnnotation, setAnnotationWizardSelectedIndex,
    setAnnotationWizardToggle, setAnnotationWizardFormValues
} from 'redux-store/TourSlice';
import { getTourTopic, setTourTopic } from 'redux-store/GlobalSlice';

/* Import Types */
import { Annotation } from 'app/types/Annotation';
import { Dict } from 'app/Types';

/* Import Sources */
import DigitalSpecimenTourStepsText from 'sources/tourText/digitalSpecimen.json';

/**
 * Component that renders the tour steps for the annotation tour on the digital specimen page
 * @returns JSX Component
 */
const AnnotateTourSteps = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const trigger = useTrigger();
    const stepsRef = useRef<any>(null);

    /* Base variables */
    const tourTopic = useAppSelector(getTourTopic);
    const annotateSteps = DigitalSpecimenTourStepsText.annotate;
    const { options } = StepsConfig();
    const [steps, setSteps] = useState<{
        intro: string,
        element?: string
    }[]>([]);
    const stepsConfig: Dict = {
        annotationModeOff: [1, 2, 3],
        wizardOn: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        annotationTarget: [10, 11, 12, 13, 14, 15, 16, 17, 18],
        formSteps: {
            0: [9, 10, 11],
            1: [12, 13, 14],
            2: [15, 16, 17, 18],
            3: [19]
        },
        selectedIndex: {
            0: [7, 8, 9],
            1: [10, 11, 12],
            2: [13, 14, 15, 16],
            3: [17, 18]
        },
        dummyAnnotation: [19]
    };
    const dummyAnnotation: Annotation = {
        '@id': 'dummyAnnotation',
        '@type': 'ods:Annotation',
        "dcterms:identifier": 'dummyAnnotation',
        'ods:fdoType': 'https://doi.org/21.T11148/cf458ca9ee1d44a5608f',
        'ods:status': 'Active',
        'ods:version': 1,
        'oa:motivation': 'ods:adding',
        'oa:motivatedBy': '',
        'oa:hasTarget': {
            '@id': 'dummyAnnotationTarget',
            '@type': 'ods:DigitalSpecimen',
            'dcterms:identifier': 'dummyAnnotationTarget',
            'ods:fdoType': 'https://doi.org/21.T11148/894b1e6cad57e921764e',
            'oa:hasSelector': {
                '@type': 'ods:ClassSelector',
                'ods:class': "$['ods:hasEntityRelationships']"
            }
        },
        'oa:hasBody': {
            '@type': 'oa:TextualBody',
            'oa:value': [
                '{"dwc:relationshipOfResource":"GeoCASe","ods:relatedResourceURI":"https://geocase.eu/specimen/GIT338-118"}'
            ]
        },
        'dcterms:creator': {
            '@id': 'dummyAnnotationCreator',
            '@type': 'prov:SoftwareAgent',
            'schema:identifier': 'dummyAnnotationCreator',
            'schema:name': 'Tour Manager'
        },
        'dcterms:created': '2024-11-15T08:56:50.758Z',
        'dcterms:modified': '2024-11-15T08:56:50.758Z',
        'dcterms:issued': '2024-11-15T08:56:50.758Z',
        'as:generator': {
            '@id': 'dummyAnnotationGenerator',
            '@type': 'prov:SoftwareAgent',
            'schema:identifier': 'dummyAnnotationGenerator'
        }
    };

    /* Construct Intro.js steps for annotation functionality on digital specimen page */
    trigger.SetTrigger(() => {
        const steps: {
            intro: string,
            element?: string
        }[] = [];

        annotateSteps.forEach((step, index) => {
            if ([0, 1, 2, 3, 4, 5, 20].includes(index) || (KeycloakService.IsLoggedIn() && KeycloakService.GetParsedToken()?.orcid)) {
                steps.push({
                    intro: step,
                    element: `.tourAnnotate${index + 1}`
                });
            }
        });

        setSteps(steps);
    }, []);

    /**
     * Function to construct the form values, based upon the current step index
     * @param nextStep The index of the next step in the tour
     * @returns Form values object
     */
    const ConstructFormValues = (nextStep: number): Dict => ({
        class: {
            label: 'Entity Relationships',
            value: "$['ods:hasEntityRelationships']"
        },
        annotationValues: nextStep > 14 ? {
            "$'ods:hasEntityRelationships'_999": {
                "dwc:relationshipOfResource": 'GeoCASe',
                "ods:relatedResourceURI": 'https://geocase.eu/specimen/GIT338-118'
            }
        } : {},
        motivation: nextStep > 11 ? 'ods:adding' : '',
        jsonPath: nextStep > 11 ? "$['ods:hasEntityRelationships'][999]" : ''
    });

    /**
     * Function that checks what to do on a step change
     * @param nextIndex The next (selected) index in the step chain
     * @param resolve Function to resolve the step promise 
     */
    const OnStepChange = async (nextIndex: number, resolve: Function) => {
        /* Handler for setting annotation mode on or off */
        dispatch(setAnnotationMode(!stepsConfig.annotationModeOff.includes(nextIndex)));

        /* Handler for setting the annotation wizard toggle on or off */
        dispatch(setAnnotationWizardToggle(stepsConfig.wizardOn.includes(nextIndex)));

        /* Handler for setting the annotation target */
        dispatch(setAnnotationTarget(
            stepsConfig.annotationTarget.includes(nextIndex) ? {
                jsonPath: "$['ods:hasEntityRelationships']",
                type: 'class'
            } : undefined
        ));

        /* Handler for form steps */
        if ([...stepsConfig.formSteps[0], ...stepsConfig.formSteps[1], ...stepsConfig.formSteps[2]].includes(nextIndex)) {
            dispatch(setAnnotationWizardFormValues(ConstructFormValues(nextIndex)));
        } else if (stepsConfig.formSteps[3].includes(nextIndex)) {
            dispatch(setAnnotationWizardDummyAnnotation(dummyAnnotation));
        } else {
            dispatch(setAnnotationWizardFormValues({
                class: undefined,
                annotationValues: {},
                motivation: '',
                jsonPath: ''
            }));
        }

        /* Handler for annotation wizard selected index of tabs */
        dispatch(setAnnotationWizardSelectedIndex(Object.values(stepsConfig.selectedIndex).findIndex((stepArray: unknown) =>
            (stepArray as number[]).includes(nextIndex)
        )));

        /* Handler for annotation dummy */
        dispatch(setAnnotationWizardDummyAnnotation(stepsConfig.dummyAnnotation.includes(nextIndex) ? dummyAnnotation : undefined));

        setTimeout(() => {
            stepsRef.current.updateStepElement(nextIndex - 1);

            resolve(true);
        }, 500);
    };

    return (
        <Steps enabled={tourTopic === 'annotate'}
            steps={steps}
            initialStep={0}
            onBeforeChange={(nextIndex) => {
                return new Promise((resolve) => {

                    OnStepChange(nextIndex + 1, resolve);
                });
            }}
            onStart={() => {
                dispatch(setAnnotationWizardToggle(false));
            }}
            onExit={() => {
                dispatch(setTourTopic(undefined));
                dispatch(setAnnotationWizardFormValues(undefined));
                dispatch(setAnnotationWizardSelectedIndex(undefined));
                dispatch(setAnnotationTarget(undefined));
                dispatch(setAnnotationWizardToggle(false));
                dispatch(setAnnotationWizardDummyAnnotation(undefined));
            }}
            options={options}
            ref={stepsRef}
        />
    );
};

export default AnnotateTourSteps;
/* Import Dependencies */
import { Steps } from 'intro.js-react';
import KeycloakService from 'app/Keycloak';
import { useRef, useState } from 'react';

/* Import Hooks */
import { useTrigger } from 'app/Hooks';

/* Import Config */
import StepsConfig from 'app/config/StepsConfig';

/* Import Hooks */
import { useAppSelector, useAppDispatch } from 'app/Hooks';

/* Import Store */
import { setAnnotationTarget } from 'redux-store/AnnotateSlice';
import {
    setAnnotationWizardDummyAnnotation, setAnnotationWizardSelectedIndex,
    getAnnotationWizardToggle, setAnnotationWizardToggle, setAnnotationWizardFormValues
} from 'redux-store/TourSlice';
import { getTourTopic, setTourTopic } from 'redux-store/GlobalSlice';

/* Import Sources */
import DigitalSpecimenTourStepsText from 'sources/tourText/digitalSpecimen.json';


/* Props Type */
type Props = {
    annotationMode: boolean,
    SetAnnotationMode: Function
};


/**
 * Component that renders the tour steps for the annotation tour on the digital specimen page
 * @param annotationMode Boolean that indicates if the annotation mode is on or not
 * @param SetAnnotationMode Function to set the annotation mode
 * @returns JSX Component
 */
const AnnotateTourSteps = (props: Props) => {
    const { annotationMode, SetAnnotationMode } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const trigger = useTrigger();
    const stepsRef = useRef<any>(null);

    /* Base variables */
    const tourTopic = useAppSelector(getTourTopic);
    const annotationWizardToggle = useAppSelector(getAnnotationWizardToggle);
    const annotateSteps = DigitalSpecimenTourStepsText.annotate;
    const { options } = StepsConfig();
    const [steps, setSteps] = useState<{
        intro: string,
        element?: string
    }[]>([]);

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
     * Function that checks what to do on a step change
     * @param nextIndex The next (selected) index in the step chain
     * @param resolve Function to resolve the step promise 
     */
    const OnStepChange = async (nextIndex: number, resolve: Function) => {
        /* Handlers for step 1, 2 and 3 */
        if ([1, 2, 3].includes(nextIndex) && annotationMode) {
            SetAnnotationMode(false);
        } else if (![1, 2, 3].includes(nextIndex) && !annotationMode) {
            SetAnnotationMode(true);
        }

        /* Handlers for step 5 and 6 */
        if ([5, 6].includes(nextIndex) && annotationWizardToggle) {
            dispatch(setAnnotationWizardToggle(false));
        }

        if ([7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].includes(nextIndex)) {
            dispatch(setAnnotationWizardToggle(true));
        } else {
            dispatch(setAnnotationWizardToggle(false));
        }

        if (nextIndex > 9 && nextIndex < 19) {
            dispatch(setAnnotationTarget({
                jsonPath: "$['ods:hasEntityRelationships']",
                type: 'class'
            }));
        } else {
            dispatch(setAnnotationTarget(undefined));
        }

        if (nextIndex === 9) {
            dispatch(setAnnotationWizardFormValues({
                class: {
                    label: 'Entity Relationships',
                    value: "$['ods:hasEntityRelationships']"
                },
                annotationValues: {},
                motivation: '',
                jsonPath: ''
            }));
        } else if ([10, 11].includes(nextIndex)) {
            dispatch(setAnnotationWizardFormValues({
                class: {
                    label: 'Entity Relationships',
                    value: "$['ods:hasEntityRelationships']"
                },
                annotationValues: {},
                motivation: '',
                jsonPath: ''
            }));
        } else if ([12, 13, 14].includes(nextIndex)) {
            dispatch(setAnnotationWizardFormValues({
                class: {
                    label: 'Entity Relationships',
                    value: "$['ods:hasEntityRelationships']"
                },
                annotationValues: {},
                motivation: 'ods:adding',
                jsonPath: "$['ods:hasEntityRelationships'][999]"
            }));
        } else if ([15, 16, 17, 18].includes(nextIndex)) {
            dispatch(setAnnotationWizardFormValues({
                class: {
                    label: 'Entity Relationships',
                    value: "$['ods:hasEntityRelationships']"
                },
                annotationValues: {
                    "$'ods:hasEntityRelationships'_999": {
                        "dwc:relationshipOfResource": 'GeoCASe',
                        "ods:relatedResourceURI": 'https://geocase.eu/specimen/GIT338-118'
                    }
                },
                motivation: 'ods:adding',
                jsonPath: "$['ods:hasEntityRelationships'][999]"
            }));
        } else if (nextIndex === 19) {
            dispatch(setAnnotationWizardDummyAnnotation({
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
            }));
        }

        if (nextIndex < 9 && nextIndex > 18) {
            dispatch(setAnnotationWizardFormValues({
                class: undefined,
                annotationValues: {},
                motivation: '',
                jsonPath: ''
            }));
        }

        if ([7, 8, 9].includes(nextIndex)) {
            dispatch(setAnnotationWizardSelectedIndex(0));
            dispatch(setAnnotationTarget(undefined));
        } else if ([10, 11, 12].includes(nextIndex)) {
            dispatch(setAnnotationWizardSelectedIndex(1));
        } else if ([13, 14, 15, 16].includes(nextIndex)) {
            dispatch(setAnnotationWizardSelectedIndex(2));
        } else if ([17, 18].includes(nextIndex)) {
            dispatch(setAnnotationWizardSelectedIndex(3));
        }

        if (nextIndex !== 19) {
            dispatch(setAnnotationWizardDummyAnnotation(undefined));
        }

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
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
import { setAnnotationWizardToggle, setMasMenuToggle, setMasScheduleMenuToggle, setMasDummy, setMasMachineJobRecordDummy } from 'redux-store/TourSlice';
import { getTourTopic, setTourTopic } from 'redux-store/GlobalSlice';

/* Import Sources */
import DigitalSpecimenTourStepsText from 'sources/tourText/digitalSpecimen.json';


/* Props Type */
type Props = {
    annotationMode: boolean,
    SetAnnotationMode: Function
};


/**
 * Component that renders the tour steps for the machine annotation services on the digital specimen page
 * @param annotationMode Boolean that indicates if the annotation mode is on or not
 * @param SetAnnotationMode Function to set the annotation mode
 * @returns JSX Component
 */
const MasTourSteps = (props: Props) => {
    const { annotationMode, SetAnnotationMode } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const trigger = useTrigger();
    const stepsRef = useRef<any>(null);

    /* Base variables */
    const tourTopic = useAppSelector(getTourTopic);
    const masSteps = DigitalSpecimenTourStepsText.mas;
    const { options } = StepsConfig();
    const [steps, setSteps] = useState<{
        intro: string,
        element?: string
    }[]>([]);

    /* Construct Intro.js steps for MAS functionality on the digital specimen page */
    trigger.SetTrigger(() => {
        const steps: {
            intro: string,
            element?: string
        }[] = [];

        masSteps.forEach((step, index) => {
            if ([0, 1, 2, 3, 4, 5, 6].includes(index) || (KeycloakService.IsLoggedIn() && KeycloakService.GetParsedToken()?.orcid)) {
                steps.push({
                    intro: step,
                    element: `.tourMas${index + 1}`
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

        if ([5, 6, 7, 8, 9, 10, 11, 12, 13].includes(nextIndex)) {
            dispatch(setMasMenuToggle(true));
        } else {
            dispatch(setMasMenuToggle(false));
        }

        if ([8, 9, 10].includes(nextIndex)) {
            dispatch(setMasScheduleMenuToggle(true));
        } else {
            dispatch(setMasScheduleMenuToggle(false));
        }

        if ([9, 10].includes(nextIndex)) {
            dispatch(setMasDummy({
                '@id': 'MachineAnnotationServiceDummy',
                '@type': 'ods:MachineAnnotationService',
                'schema:identifier': 'MachineAnnotationServiceDummy',
                'ods:fdoType': 'https://doi.org/10.15468/1a2b3c',
                'schema:name': 'Dummy Machine Annotation Service',
                'schema:description': 'A machine annotation service for showing off functionality',
                'schema:dateCreated': '2024-11-15T08:56:50.758Z',
                'schema:creator': {
                    '@id': 'MachineAnnotationServiceDummyAgent',
                    '@type': 'prov:SoftwareAgent'
                },
                'schema:dateModified': '2024-11-15T08:56:50.758Z',
                'ods:containerImage': 'dummyContainerImage',
                'ods:containerTag': 'dummyContainerTag',
                'ods:batchingPermitted': false,
                'ods:timeToLive': 1000
            }));
        } else {
            dispatch(setMasDummy(undefined));
        }

        if ([11, 12, 13].includes(nextIndex)) {
            let state: 'SCHEDULED' | 'RUNNING' | 'FAILED' | 'COMPLETED' = 'SCHEDULED';

            if (nextIndex === 12) {
                state = 'COMPLETED';
            } else if (nextIndex === 13) {
                state = 'FAILED';
            }
            
            dispatch(setMasMachineJobRecordDummy({
                annotations: [],
                batchingRequested: false,
                jobHandle: 'MachineJobRecordDummy',
                masId: 'MachineAnnotationServiceDummy',
                orcid: 'Tour Manager',
                state,
                targetId: 'DigitalSpecimenDummy',
                targetType: 'ods:DigitalSpecimen',
                timeCompleted: '2024-11-15T08:56:50.758Z',
                timeStarted: '2024-11-15T08:56:50.758Z',
                timeToLive: 1000
            }));
        } else {
            dispatch(setMasMachineJobRecordDummy(undefined));
        }

        setTimeout(() => {
            stepsRef.current.updateStepElement(nextIndex - 1);

            resolve(true);
        }, 500);
    };

    return (
        <Steps enabled={tourTopic === 'mas'}
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
                dispatch(setMasDummy(undefined));
                dispatch(setMasMachineJobRecordDummy(undefined));
                dispatch(setMasMenuToggle(false));
                dispatch(setMasScheduleMenuToggle(false));
            }}
            options={options}
            ref={stepsRef}
        />
    );
};

export default MasTourSteps;
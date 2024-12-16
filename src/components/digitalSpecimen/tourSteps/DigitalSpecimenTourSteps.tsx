/* Import Dependencies */
import { Steps } from 'intro.js-react';

/* Import Config */
import StepsConfig from 'app/config/StepsConfig';

/* Import Hooks */
import { useAppSelector, useAppDispatch } from 'app/Hooks';

/* Import Store */
import { getTourTopic, setTourTopic } from 'redux-store/GlobalSlice';

/* Import Sources */
import DigitalSpecimenTourStepsText from 'sources/tourText/digitalSpecimen.json';


/* Props Type */
type Props = {
    hasMedia: boolean,
    SetSelectedTabIndex: Function
};


/**
 * Component that renders the tour steps for the digital specimen page
 * @param hasMedia Boolean indicating if the digital specimen has any associated digital media
 * @param SetSelectedTabIndex Function to set the selected tab index
 * @returns JSX Component
 */
const DigitalSpecimenTourSteps = (props: Props) => {
    const { hasMedia, SetSelectedTabIndex } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const tourTopic = useAppSelector(getTourTopic);
    const digitalSpecimenSteps = DigitalSpecimenTourStepsText.digitalSpecimen;
    const { options } = StepsConfig();
    let steps: {
        intro: string,
        element?: string
    }[] = [];

    /* Construct Intro.js steps for digital specimen page */
    digitalSpecimenSteps.forEach((step, index) => {
        steps.push({
            intro: step,
            element: `.tourDigitalSpecimen${index + 1}`
        });
    });

    /**
     * Function that checks what to do on a step change
     * @param nextIndex The next (selected) index in the step chain
     * @param resolve Function to resolve the step promise 
     */
    const OnStepChange = (nextIndex: number, resolve: Function) => {
        const nextIndexToTabIndexMap = {
            6: 0,
            7: hasMedia ? 1 : 0,
            8: hasMedia ? 2 : 1,
            9: hasMedia ? 3 : 2,
            10: hasMedia ? 4 : 3,
            11: hasMedia ? 5 : 4
        };

        if (Object.keys(nextIndexToTabIndexMap).includes(`${nextIndex}`)) {
            /* On step 7: set tab to digital specimen */
            SetSelectedTabIndex(nextIndexToTabIndexMap[nextIndex as keyof typeof nextIndexToTabIndexMap]);

            resolve();
        } else {
            resolve();
        }
    };

    return (
        <Steps enabled={tourTopic === 'digitalSpecimen'}
            steps={steps}
            initialStep={0}
            onBeforeChange={(nextIndex) => {
                return new Promise((resolve) => {
                    OnStepChange(nextIndex, resolve);
                });
            }}
            onStart={() => SetSelectedTabIndex(0)}
            onExit={() => {
                SetSelectedTabIndex(0);
                dispatch(setTourTopic(undefined));
            }}
            options={options}
        />
    );
};

export default DigitalSpecimenTourSteps;
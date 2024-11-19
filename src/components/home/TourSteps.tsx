/* Import Dependencies */
import { Steps } from 'intro.js-react';

/* Import Config */
import StepsConfig from 'app/config/StepsConfig';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getTourTopic, setTourTopic } from 'redux-store/GlobalSlice';

/* Import Sources */
import HomeTourStepsText from 'sources/tourText/home.json';


/* Props Type */
type Props = {
    SetAdvancedSearchToggle: Function
};


/**
 * Component that renders the tour steps for the homepage
 * @param SetAdvancedSearchToggle Function to set the advanced search toggle
 * @returns JSX Component
 */
const TourSteps = (props: Props) => {
    const { SetAdvancedSearchToggle } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const tourTopic = useAppSelector(getTourTopic);
    const homeSteps = HomeTourStepsText.home;
    const { options } = StepsConfig();
    let steps: {
        intro: string,
        element?: string
    }[] = [];

    /* Construct Intro.js steps for Homepage */
    homeSteps.forEach((step, index) => {
        steps.push({
            intro: step,
            element: `#tourHome${index + 1}`
        });
    });

    /**
     * Function that checks what to do on a step change
     * @param nextIndex The next (selected) index in the step chain
     * @param resolve Function to resolve the step promise 
     */
    const OnStepChange = (nextIndex: number, resolve: Function) => {
        if (nextIndex >= 4) {
            SetAdvancedSearchToggle(true);

            setTimeout(() => {
                resolve();
            }, 500);
        } else {
            SetAdvancedSearchToggle(false);

            resolve();
        }
    };

    return (
        <Steps enabled={tourTopic === 'home'}
            steps={steps}
            initialStep={0}
            onBeforeChange={(nextIndex) => {
                return new Promise((resolve) => {
                    OnStepChange(nextIndex, resolve);
                });
            }}
            onExit={() => {
                SetAdvancedSearchToggle(false);

                dispatch(setTourTopic(undefined));
            }}
            options={options}
        />
    );
};

export default TourSteps;
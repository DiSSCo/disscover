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
    SetSelectedTabIndex: Function
};


/**
 * Component that renders the tour steps for the digital specimen page
 * @param SetSelectedTabIndex Function to set the selected tab index
 * @returns JSX Component
 */
const DigitalSpecimenTourSteps = (props: Props) => {
    const { SetSelectedTabIndex } = props;

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

    return (
        <Steps enabled={tourTopic === 'digitalSpecimen'}
            steps={steps}
            initialStep={0}
            onBeforeChange={(nextIndex) => {
                return new Promise((resolve) => {
                    if (nextIndex === 6) {
                        /* On step 7: set tab to digital specimen */
                        SetSelectedTabIndex(0);

                        resolve();
                    } else if (nextIndex === 7) {
                        /* On step 8: set tab to digital media */
                        SetSelectedTabIndex(1);

                        resolve();
                    } else if (nextIndex === 8) {
                        /* On step 9: set tab to events */
                        SetSelectedTabIndex(2);

                        resolve();
                    } else if (nextIndex === 9) {
                        /* On step 10: set tab to identifications */
                        SetSelectedTabIndex(3);

                        resolve();
                    } else if (nextIndex === 10) {
                        /* On step 11: set tab to entity relationships */
                        SetSelectedTabIndex(4);

                        resolve();
                    } else if (nextIndex === 11) {
                        /* On step 12: set tab to assertions */
                        SetSelectedTabIndex(5);

                        resolve();
                    } else {
                        resolve();
                    }
                });
            }}
            onStart={() => SetSelectedTabIndex(0)}
            onExit={() => {
                dispatch(setTourTopic(undefined));
            }}
            options={options}
        />
    );
};

export default DigitalSpecimenTourSteps;
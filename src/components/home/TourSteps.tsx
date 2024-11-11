/* Import Dependencies */
import { Steps } from 'intro.js-react';

/* Import Config */
import StepsConfig from 'app/config/StepsConfig';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getTourTopic, setTourTopic } from 'redux-store/GlobalSlice';

/* Import Sources */
import HomeIntro from 'sources/tourText/home.json';

/* Import Styles */
import styles from '../home.module.scss';


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
    const homeSteps = HomeIntro.home;
    const { options } = StepsConfig();
    let steps: {
        [tourSection: string]: {
            intro: string,
            element?: string
        }[]
    } = {
        home: []
    };

    /* Construct Intro.js steps for Homepage */
    homeSteps.forEach((step, index) => {
        steps.home.push({
            intro: step,
            element: `#tourHome${index + 1}`
        });
    });

    // const steps = {
    //     home: [
    //         {
    //             intro: homeSteps[0]
    //         },
    //         {
    //             intro: homeSteps[1]
    //         },
    //         {
    //             element: `.specimenTypeFilters`,
    //             intro: homeSteps[2]
    //         },
    //         {
    //             element: ".globalSearchBar",
    //             intro: homeSteps[3]
    //         },
    //         {
    //             element: ".advancedSearch",
    //             intro: homeSteps[4]
    //         }
    //     ]
    // };

    return (
        <Steps enabled={tourTopic === 'home'}
            steps={steps.home}
            initialStep={0}
            onBeforeChange={(nextIndex) => {
                return new Promise((resolve) => {
                    if (nextIndex >= 4) {
                        SetAdvancedSearchToggle(true);

                        setTimeout(() => {
                            resolve();
                        }, 500);
                    } else {
                        SetAdvancedSearchToggle(false);

                        resolve();
                    }
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
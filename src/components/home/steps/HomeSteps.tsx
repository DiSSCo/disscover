/* Import Dependencies */
import { Steps } from 'intro.js-react';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getIntroTopic, setIntroTopic } from 'redux/general/GeneralSlice';

/* Import Sources */
import HomeIntro from 'sources/introText/home.json';

/* Import Styles */
import styles from '../home.module.scss';


/* Props Typing */
interface Props {
    SetAdvancedSearch: Function
};


const HomeSteps = (props: Props) => {
    const { SetAdvancedSearch } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const introTopic = useAppSelector(getIntroTopic);
    const homeSteps = HomeIntro.home;

    /* Construct Intro.js steps for Homepage */
    const steps = {
        home: [
            {
                intro: homeSteps[0]
            },
            {
                element: `.${styles.advancedToggled}`,
                intro: homeSteps[1]
            },
            {
                element: `.specimenTypeFilters`,
                intro: homeSteps[2]
            },
            {
                element: ".globalSearchBar",
                intro: homeSteps[3]
            },
            {
                element: ".advancedSearch",
                intro: homeSteps[4]
            }
        ]
    }

    return (
        <Steps enabled={introTopic === 'home'}
            steps={steps.home ?? []}
            initialStep={0}
            onBeforeChange={(nextIndex) => {
                return new Promise((resolve) => {
                    if (nextIndex >= 4) {
                        SetAdvancedSearch(true);

                        setTimeout(() => {
                            resolve();
                        }, 500);
                    } else {
                        SetAdvancedSearch(false);

                        resolve();
                    }
                });
            }}
            onExit={() => {
                dispatch(setIntroTopic(''));
                SetAdvancedSearch(false);
            }}
        />
    );
}

export default HomeSteps;
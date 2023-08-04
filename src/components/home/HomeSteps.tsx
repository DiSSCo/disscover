/* Import Dependencies */
import { Steps } from 'intro.js-react';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getIntroTopic, setIntroTopic } from 'redux/general/GeneralSlice';

/* Import Sources */
import HomeIntro from 'sources/introText/home.json';

/* Import Styles */
import styles from './home.module.scss';


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

    /* Construct Intro.js steps for Homepage */
    const steps = {
        home: [
            {
                intro: HomeIntro['step_1']
            },
            {
                element: `.${styles.advancedToggled}`,
                intro: HomeIntro['step_2']
            },
            {
                element: `.specimenTypeFilters`,
                intro: HomeIntro['step_3']
            },
            {
                element: ".globalSearchBar",
                intro: HomeIntro['step_4']
            },
            {
                element: `.${styles.advancedToggled}`,
                intro: HomeIntro['step_5']
            }
        ]
    }

    return (
        <Steps enabled={introTopic === 'home'}
            steps={steps.home ?? []}
            initialStep={0}
            onBeforeChange={(nextIndex) => {
                if (nextIndex >= 4) {
                    SetAdvancedSearch(true);
                } else {
                    SetAdvancedSearch(false);
                }
            }}
            onExit={() => {
                dispatch(setIntroTopic(''));
                SetAdvancedSearch(false);
            }}
        />
    );
}

export default HomeSteps;
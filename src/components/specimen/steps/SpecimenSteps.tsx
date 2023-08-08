/* Import Dependencies */
import { Steps } from 'intro.js-react';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getIntroTopic, setIntroTopic } from 'redux/general/GeneralSlice';

/* Import Sources */
import SpecimenIntro from 'sources/introText/specimen.json';


/* Props Typing */
interface Props {
    SetSelectedTab: Function
};


const SpecimenSteps = (props: Props) => {
    const { SetSelectedTab } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const introTopic = useAppSelector(getIntroTopic);
    const specimenIntro = SpecimenIntro.specimen;

    /* Construct Intro.js steps for Specimen page */
    const steps = [
        {
            intro: specimenIntro[0]
        },
        {
            element: ".titleBar",
            intro: specimenIntro[1]
        },
        {
            element: `.versionSelect`,
            intro: specimenIntro[2]
        },
        {
            element: ".specimenActions",
            intro: specimenIntro[3]
        },
        {
            element: ".IDCard",
            intro: specimenIntro[4]
        },
        {
            element: ".contentBlock",
            intro: specimenIntro[5]
        },
        {
            element: ".contentBlock",
            intro: specimenIntro[6]
        },
        {
            element: ".contentBlock",
            intro: specimenIntro[7]
        },
        {
            element: ".contentBlock",
            intro: specimenIntro[8]
        },
        {
            element: ".contentBlock",
            intro: specimenIntro[9]
        },
    ];

    return (
        <>
            <Steps enabled={introTopic === 'specimen'}
                steps={steps ?? []}
                initialStep={0}
                onBeforeChange={(nextIndex) => {
                    return new Promise((resolve) => {
                        if (nextIndex === 6) {
                            /* On step 7: set tab to digital specimen */
                            SetSelectedTab(0);

                            resolve();
                        } else if (nextIndex === 7) {
                            /* On step 8: set tab to original data */
                            SetSelectedTab(1);

                            resolve();
                        } else if (nextIndex === 8) {
                            /* On step 9: set tab to digital media */
                            SetSelectedTab(2);
                            
                            resolve();
                        } else if (nextIndex === 9) {
                            /* On step 10: set tab to provenance */
                            SetSelectedTab(3);

                            resolve();
                        } else {
                            resolve();
                        }
                    });
                }}
                onExit={() => {
                    /* Reset intro topic */
                    SetSelectedTab(0);
                    dispatch(setIntroTopic(''));
                }}
            />
        </>
    );
}

export default SpecimenSteps;
/* Import Dependencies */
import { Steps } from 'intro.js-react';

/* Import Config */
import StepsConfig from 'app/config/StepsConfig';

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
    const { options } = StepsConfig();

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
        {
            element: ".contentBlock",
            intro: specimenIntro[10]
        },
        {
            element: ".contentBlock",
            intro: specimenIntro[11]
        },
        {
            element: ".contentBlock",
            intro: specimenIntro[12]
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
                            /* On step 8: set tab to digital media */
                            SetSelectedTab(1);

                            resolve();
                        } else if (nextIndex === 8) {
                            /* On step 9: set tab to occurrences */
                            SetSelectedTab(2);

                            resolve();
                        }  else if (nextIndex === 9) {
                            /* On step 10: set tab to identifications */
                            SetSelectedTab(3);

                            resolve();
                        }  else if (nextIndex === 10) {
                            /* On step 11: set tab to entity relationships */
                            SetSelectedTab(4);

                            resolve();
                        }  else if (nextIndex === 11) {
                            /* On step 12: set tab to assertions */
                            SetSelectedTab(5);

                            resolve();
                        } else if (nextIndex === 12) {
                            /* On step 13: set tab to original data */
                            SetSelectedTab(6);

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
                options={options}
            />
        </>
    );
}

export default SpecimenSteps;
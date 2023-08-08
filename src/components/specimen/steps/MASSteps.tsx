/* Import Dependencies */
import KeycloakService from 'keycloak/Keycloak';
import { Steps } from 'intro.js-react';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getIntroTopic, setIntroTopic } from 'redux/general/GeneralSlice';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';
import { setMASTarget } from 'redux/annotate/AnnotateSlice';

/* Import Sources */
import SpecimenIntro from 'sources/introText/specimen.json';

/* Import Styles */
import styles from '../specimen.module.scss';


/* Props Typing */
interface Props {
    automatedAnnotationsToggle: boolean,
    SetAutomatedAnnotationsToggle: Function,
    ShowWithAnnotations: Function
};


const MASSteps = (props: Props) => {
    const { SetAutomatedAnnotationsToggle, ShowWithAnnotations } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const introTopic = useAppSelector(getIntroTopic);
    const specimen = useAppSelector(getSpecimen);
    const MASIntro = SpecimenIntro.MAS;

    /* Construct Intro.js steps for Specimen page */
    const steps: { intro: string, element?: string }[] = [
        {
            intro: MASIntro[0]
        },
        {
            intro: MASIntro[1]
        }
    ];

    if (KeycloakService.IsLoggedIn()) {
        steps.push(...[
            {
                element: ".specimenActions",
                intro: MASIntro[2]
            },
            {
                intro: MASIntro[3]
            },
            {
                intro: MASIntro[4]
            },
            {
                intro: MASIntro[5]
            },
            {
                element: ".specimenActions",
                intro: MASIntro[6]
            },
            {
                element: ".sidePanel",
                intro: MASIntro[7]
            },
            {
                element: ".refreshAnnotationsButton",
                intro: MASIntro[8]
            }
        ]);
    } else {
        steps.push({
            intro: "First, make sure you are logged into your DiSSCo account."
        });
    }

    return (
        <>
            <Steps enabled={introTopic === 'MAS'}
                steps={steps ?? []}
                initialStep={0}
                onBeforeChange={(nextIndex) => {
                    return new Promise((resolve) => {
                        if ([3, 4, 5].includes(nextIndex)) {
                            /* On Step 4: Show Automated Annotations Modal and set MAS target */
                            SetAutomatedAnnotationsToggle(true);
                            dispatch(setMASTarget(specimen));

                            setTimeout(() => {
                                resolve();
                            }, 500);
                        } else if ([7, 8].includes(nextIndex)) {
                            /* On step 8: Show the Annotations Side Panel */
                            ShowWithAnnotations();

                            setTimeout(() => {
                                resolve();
                            }, 500);
                        } else {
                            SetAutomatedAnnotationsToggle(false);

                            resolve();
                        }
                    });
                }}
                onExit={() => {
                    /* Reset intro topic */
                    dispatch(setIntroTopic(''));
                }}
            />
        </>
    );
}

export default MASSteps;
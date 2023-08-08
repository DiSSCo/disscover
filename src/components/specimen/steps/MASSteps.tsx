/* Import Dependencies */
import { Steps } from 'intro.js-react';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getIntroTopic, setIntroTopic } from 'redux/general/GeneralSlice';

/* Import Sources */
import SpecimenIntro from 'sources/introText/specimen.json';


const MASSteps = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const introTopic = useAppSelector(getIntroTopic);
    const annotateIntro = SpecimenIntro.annotate;

    /* Construct Intro.js steps for Specimen page */
    const steps = [
        {
            intro: annotateIntro['step_1']
        },
    ];

    return (
        <>
            <Steps enabled={introTopic === 'MAS'}
                steps={steps ?? []}
                initialStep={0}
                onBeforeChange={(nextIndex) => {
                    return new Promise((resolve) => {
                        resolve();
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
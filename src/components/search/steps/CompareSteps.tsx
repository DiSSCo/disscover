/* Import Dependencies */
import { useSearchParams } from 'react-router-dom';
import { Steps } from 'intro.js-react';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getIntroTopic, setIntroTopic } from 'redux/general/GeneralSlice';
import { setCompareMode, getCompareSpecimens, setCompareSpecimens } from 'redux/search/SearchSlice';

/* Import Sources */
import SearchIntro from 'sources/introText/search.json';

/* Import Styles */
import styles from '../search.module.scss';

/* Import API */
import GetSpecimen from 'api/specimen/GetSpecimen';


const CompareSteps = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const [_searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const introTopic = useAppSelector(getIntroTopic);
    const compareSpecimens = useAppSelector(getCompareSpecimens);
    const compareIntro = SearchIntro.compare;

    /* Function for setting a Search Param */
    const SetSearchParam = (param: string, query?: string) => {
        setSearchParams(searchParams => {
            if (query) {
                searchParams.set(param, query);
            } else {
                searchParams.delete(param);
            }

            return searchParams;
        });
    }

    /* Function for setting compare Specimens */
    const SetCompareSpecimens = (resolve: Function) => {
        if (compareSpecimens.length < 1) {
            GetSpecimen('20.5000.1025/QZF-FFF-51T').then((specimen) => {
                dispatch(setCompareSpecimens([specimen]));
            }).catch(error => {
                console.warn(error);
            });
        }

        if (compareSpecimens.length < 2) {
            GetSpecimen('20.5000.1025/6W8-1KK-KJY').then((specimen) => {
                const copyCompareSpecimens = [...compareSpecimens];

                copyCompareSpecimens.push(specimen);

                dispatch(setCompareSpecimens(copyCompareSpecimens));

                resolve();
            }).catch(error => {
                console.warn(error);
            });
        } else {
            resolve();
        }
    }

    /* Construct Intro.js steps for Compare functionality */
    const steps = [
        {
            intro: compareIntro[1]
        },
        {
            element: `.${styles.compareButton}`,
            intro: compareIntro[2]
        },
        {
            element: `.searchResults`,
            intro: compareIntro[3]
        },
        {
            element: `.${styles.compareBoxBlock}`,
            intro: compareIntro[4]
        },
        {
            element: `.${styles.compareBoxBlock}`,
            intro: compareIntro[5]
        }
    ];

    return (
        <>
            <Steps enabled={introTopic === 'compare'}
                steps={steps ?? []}
                initialStep={0}
                onBeforeChange={(nextIndex) => {
                    return new Promise((resolve) => {
                        if (nextIndex === 2) {
                            /* On step 3: enable comparison mode and set search query to 'Iguanodon' */
                            SetSearchParam('q', 'Iguanodon');
                            dispatch(setCompareMode(true));

                            resolve();
                        } else if (nextIndex === 3) {
                            /* On step 4: simulate selecting specimen for comparison */
                            dispatch(setCompareMode(true));

                            if (compareSpecimens.length < 1) {
                                GetSpecimen('20.5000.1025/QZF-FFF-51T').then((specimen) => {
                                    dispatch(setCompareSpecimens([specimen]));

                                    resolve();
                                }).catch(error => {
                                    console.warn(error);
                                });
                            } else {
                                resolve();
                            }
                        } else if (nextIndex === 4) {
                            /* On step 5: simulate selecting of second specimen for comparison */
                            dispatch(setCompareMode(true));

                            SetCompareSpecimens(resolve);
                        } else {
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

export default CompareSteps;
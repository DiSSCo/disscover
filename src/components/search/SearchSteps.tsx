/* Import Dependencies */
import { useSearchParams } from 'react-router-dom';
import { Steps } from 'intro.js-react';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getIntroTopic, setIntroTopic } from 'redux/general/GeneralSlice';
import { getSearchResults, setSearchSpecimen } from 'redux/search/SearchSlice';

/* Import Types */
import { Specimen } from 'global/Types';

/* Import Sources */
import SearchIntro from 'sources/introText/search.json';


/* Props Typing */
interface Props {
    SetFilterToggle: Function
};


const SearchSteps = (props: Props) => {
    const { SetFilterToggle } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const [_searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const introTopic = useAppSelector(getIntroTopic);
    const searchResults = useAppSelector(getSearchResults);

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

    /* Construct Intro.js steps for Homepage */
    const steps = {
        search: [
            {
                intro: SearchIntro['step_1']
            },
            {
                element: ".searchBar",
                intro: SearchIntro['step_2']
            },
            {
                element: `.searchResults`,
                intro: SearchIntro['step_3']
            },
            {
                element: ".IDCard",
                intro: SearchIntro['step_4']
            },
            {
                element: ".searchMenu",
                intro: SearchIntro['step_5']
            },
            {
                element: ".searchMenu",
                intro: SearchIntro['step_6']
            },
            {
                element: ".activeFilters",
                intro: SearchIntro['step_7']
            }
        ]
    }

    return (
        <>
            <Steps enabled={introTopic === 'search'}
                steps={steps.search ?? []}
                initialStep={0}
                onBeforeChange={(nextIndex) => {
                    return new Promise((resolve) => {
                        if (nextIndex === 2) {
                            /* On step 2: Set search query to: 'Iguanodon' */
                            SetSearchParam('q', 'Iguanodon');

                            dispatch(setSearchSpecimen({} as Specimen));

                            resolve();
                        } else if (nextIndex === 3) {
                            /* On step 3: Set search result to first index of search results of 'Iguanodon' query */
                            dispatch(setSearchSpecimen(searchResults[0]));

                            setTimeout(() => {
                                resolve();
                            }, 500);
                        } else if (nextIndex === 4) {
                            /* On step 4: Remove search result and reopen filters */
                            dispatch(setSearchSpecimen({} as Specimen));
                            SetFilterToggle(true);

                            SetSearchParam('topicDiscipline');

                            resolve();
                        } else if (nextIndex === 5) {
                            /* On step 5: Set Topic Discipline filter to 'Palaeontology' */
                            SetFilterToggle(true);
                            SetSearchParam('topicDiscipline', 'Palaeontology');

                            resolve();
                        } else if (nextIndex === 6) {
                            /* On step 6: Close filters to show activated filters on top of table */
                            SetFilterToggle(false);

                            resolve();
                        } else {
                            resolve();
                        }
                    });
                }}
                onExit={() => {
                    /* Rest intro topic */
                    dispatch(setIntroTopic(''));
                }}
            />
        </>
    );
}

export default SearchSteps;
/* Import Dependencies */
import { useSearchParams } from 'react-router-dom';
import { Steps } from 'intro.js-react';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getIntroTopic, setIntroTopic } from 'redux/general/GeneralSlice';
import { getSearchResults, setSearchSpecimen } from 'redux/search/SearchSlice';

/* Import Types */
import { DigitalSpecimen } from 'app/Types';

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
    const searchIntro = SearchIntro.search;

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

    /* Construct Intro.js steps for Search page */
    const steps = [
        {
            intro: searchIntro[0]
        },
        {
            element: ".searchBar",
            intro: searchIntro[1]
        },
        {
            element: `.searchResults`,
            intro: searchIntro[2]
        },
        {
            element: ".IDCard",
            intro: searchIntro[3]
        },
        {
            element: ".searchMenu",
            intro: searchIntro[4]
        },
        {
            element: ".searchMenu",
            intro: searchIntro[5]
        },
        {
            element: ".activeFilters",
            intro: searchIntro[6]
        }
    ];

    return (
        <>
            <Steps enabled={introTopic === 'search'}
                steps={steps ?? []}
                initialStep={0}
                onBeforeChange={(nextIndex) => {
                    return new Promise((resolve) => {
                        if (nextIndex === 2) {
                            /* On step 2: Set search query to: 'bellis perennis' */
                            SetSearchParam('q', 'bellis perennis');

                            dispatch(setSearchSpecimen({} as DigitalSpecimen));

                            resolve();
                        } else if (nextIndex === 3) {
                            /* On step 3: Set search result to second index of search results of 'bellis perennis' query */
                            dispatch(setSearchSpecimen(searchResults[1]));

                            setTimeout(() => {
                                resolve();
                            }, 500);
                        } else if (nextIndex === 4) {
                            /* On step 4: Remove search result and reopen filters */
                            dispatch(setSearchSpecimen({} as DigitalSpecimen));
                            SetFilterToggle(true);

                            SetSearchParam('topicDiscipline');

                            resolve();
                        } else if (nextIndex === 5) {
                            /* On step 5: Set Topic Discipline filter to 'Botany' */
                            SetFilterToggle(true);
                            SetSearchParam('topicDiscipline', 'Botany');

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
                    /* Reset intro topic */
                    dispatch(setIntroTopic(''));
                }}
            />
        </>
    );
}

export default SearchSteps;
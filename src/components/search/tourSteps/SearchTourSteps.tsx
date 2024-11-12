/* Import Dependencies */
import { Steps } from 'intro.js-react';

/* Import Config */
import StepsConfig from 'app/config/StepsConfig';

/* Import Hooks */
import { useAppSelector, useAppDispatch, useSearchFilters } from 'app/Hooks';

/* Import Store */
import { getTourTopic, setTourTopic } from 'redux-store/GlobalSlice';
import { setSearchDigitalSpecimen } from 'redux-store/SearchSlice';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { PaginationObject } from 'app/Types';

/* Import Sources */
import SearchTourStepsText from 'sources/tourText/search.json';


/* Props Type */
type Props = {
    pagination: PaginationObject
};


/**
 * Component that renders the tour steps for the homepage
 * @param pagination The pagination object used to index the digital specimen results
 * @returns JSX Component
 */
const SearchTourSteps = (props: Props) => {
    const { pagination } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const searchFilters = useSearchFilters();

    /* Base variables */
    const tourTopic = useAppSelector(getTourTopic);
    const searchSteps = SearchTourStepsText.search;
    const { options } = StepsConfig();
    let steps: {
        intro: string,
        element?: string
    }[] = [];

    /* Construct Intro.js steps for Homepage */
    searchSteps.forEach((step, index) => {
        steps.push({
            intro: step,
            element: `.tourSearch${index + 1}`
        });
    });

    return (
        <Steps enabled={tourTopic === 'search'}
            steps={steps}
            initialStep={0}
            onBeforeChange={(nextIndex) => {
                return new Promise((resolve) => {
                    if (nextIndex === 2) {
                        /* On step 2: Set search query to: 'bellis perennis' */
                        searchFilters.SetSearchFilters({
                            q: 'bellis perennis'
                        });

                        dispatch(setSearchDigitalSpecimen(undefined));

                        resolve();
                    } else if (nextIndex === 3) {
                        /* On step 3: Set search result to second index of search results of 'bellis perennis' query */
                        dispatch(setSearchDigitalSpecimen(pagination.records[1] as DigitalSpecimen));

                        setTimeout(() => {
                            resolve();
                        }, 500);
                    } else if (nextIndex === 4) {
                        /* On step 4: Remove search result and reopen filters */
                        dispatch(setSearchDigitalSpecimen(undefined));

                        searchFilters.SetSearchFilters({
                            topicDiscipline: ''
                        });

                        resolve();
                    } else if (nextIndex === 5) {
                        /* On step 5: Set Topic Discipline filter to 'Botany' */
                        searchFilters.SetSearchFilters({
                            topicDiscipline: 'Botany'
                        });

                        resolve();
                    } else {
                        resolve();
                    }
                });
            }}
            onExit={() => {
                dispatch(setTourTopic(undefined));
            }}
            options={options}
        />
    );
};

export default SearchTourSteps;
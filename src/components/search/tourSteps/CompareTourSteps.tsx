/* Import Dependencies */
import { Steps } from 'intro.js-react';

/* Import Config */
import StepsConfig from 'app/config/StepsConfig';

/* Import Hooks */
import { useAppSelector, useAppDispatch, useSearchFilters } from 'app/Hooks';

/* Import Store */
import { getTourTopic, setTourTopic } from 'redux-store/GlobalSlice';
import { getCompareDigitalSpecimen, setCompareDigitalSpecimen } from 'redux-store/SearchSlice';

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
 * Component that renders the tour steps for the compare functionality on the search page
 * @param pagination The pagination object used to index the digital specimen results
 * @returns JSX Component
 */
const CompareTourSteps = (props: Props) => {
    const { pagination } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const searchFilters = useSearchFilters();

    /* Base variables */
    const tourTopic = useAppSelector(getTourTopic);
    const compareDigitalSpecimen = useAppSelector(getCompareDigitalSpecimen);
    const compareSteps = SearchTourStepsText.compare;
    const { options } = StepsConfig();
    let steps: {
        intro: string,
        element?: string
    }[] = [];

    /* Construct Intro.js steps for compare functionality on search page */
    compareSteps.forEach((step, index) => {
        steps.push({
            intro: step,
            element: `.tourCompare${index + 1}`
        });
    });

    /**
     * Function that checks what to do on a step change
     * @param nextIndex The next (selected) index in the step chain
     * @param resolve Function to resolve the step promise 
     */
    const OnStepChange = (nextIndex: number, resolve: Function) => {
        if ([0, 1].includes(nextIndex)) {
            dispatch(setCompareDigitalSpecimen(undefined));

            resolve();
        } else if (nextIndex === 2) {
            /* On step 3: set search query to 'bellis perennis' and enable comparison mode */
            searchFilters.SetSearchFilters({
                q: 'bellis perennis'
            });

            dispatch(setCompareDigitalSpecimen([]));

            resolve();
        } else if (nextIndex === 3) {
            /* On step 4: simulate selecting specimen for comparison */
            if (!compareDigitalSpecimen?.length) {
                dispatch(setCompareDigitalSpecimen([pagination?.records[0] as DigitalSpecimen]));

                resolve();
            } else if (compareDigitalSpecimen.length) {
                const localCompareDigitalSpecimen = [...compareDigitalSpecimen];
                localCompareDigitalSpecimen.pop();

                dispatch(setCompareDigitalSpecimen([...localCompareDigitalSpecimen]));

                resolve();
            } else {
                resolve();
            }
        } else if ([4, 5].includes(nextIndex)) {
            /* On step 5: simulate selecting of second specimen for comparison */
            const compareDigitalSpecimen: DigitalSpecimen[] = [];

            compareDigitalSpecimen.push(pagination?.records[0] as DigitalSpecimen);
            compareDigitalSpecimen.push(pagination?.records[1] as DigitalSpecimen);

            dispatch(setCompareDigitalSpecimen(compareDigitalSpecimen));

            resolve();
        } else {
            resolve();
        }
    };

    return (
        <Steps enabled={tourTopic === 'compare'}
            steps={steps}
            initialStep={0}
            onBeforeChange={(nextIndex) => {
                return new Promise((resolve) => {
                    OnStepChange(nextIndex, resolve)
                });
            }}
            onStart={() => {
                searchFilters.ResetSearchFilters();
                dispatch(setCompareDigitalSpecimen(undefined));
            }}
            onExit={() => {
                dispatch(setTourTopic(undefined));
            }}
            options={options}
        />
    );
};

export default CompareTourSteps;
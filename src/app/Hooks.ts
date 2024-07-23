/* Import Dependencies */
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

/* Import Store */
import { pushToNotifications } from 'redux-store/GlobalSlice';

/* Import Types */
import type { RootState, AppDispatch } from './Store';
import { Notification, Dict } from './Types';


/**
 * App Selector hook for selecting data from the Redux store
 */
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * App Dispatch hook for dispatching new data to the Redux store 
 * @returns Instance of hook
 */
const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Dynamic Search hook for handling dynamic searches and their wait times
 * @param Method The API method to call on when dynamic searching
 * @param Handler The handler to be called when a search request finishes successfully
 * @param Resetter A resetter function that is called when the search query is blank and all fetch requests have finished
 * @returns 
 */
const useDynamicSearch = ({ Method, Handler, Resetter }: { Method: Function, Handler: Function, Resetter: Function }) => {
    const [searchRequests, setSearchRequests] = useState<Promise<null>[]>([]);

    const DynamicSearch = (query: string, params: Dict) => {
        if (query) {
            /* Execute provided dynamic search method */
            const promise: Promise<null> = Method(params);

            /* Save search request */
            setSearchRequests([...searchRequests, promise]);

            /* Call on hanlder with result */
            promise.then((searchResult) => {
                Handler(searchResult);
            });
        } else {
            /* Wait for search requests to finish and call resetter */
            Promise.all(searchRequests).then(() => {
                Resetter();
            }).catch(() => {
                Resetter();
            }).finally(() => {
                /* Reset search requests array */
                setSearchRequests([]);
            });
        };
    };

    return {
        DynamicSearch
    };
};

/**
 * Fetch hook for handling fetch requests
 * @returns Instance of hook
 */
const useFetch = () => {
    /* Base variables */
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Function to fetch a single method from the API
     * @param Method The method to be requested
     * @param params Possible parameters to pass onto the request method
     * @param triggers Possible triggers that retrigger the request method upon change
     * @param Handler A handler that can be called to receive the result of the fetch on success
     * @param ErrorHandler An error handler that can be called to resolve the function when an error occurs
     */
    const Fetch = ({ Method, params, triggers, Handler, ErrorHandler }:
        { Method: Function, params?: Dict, allowSearchParams?: boolean, triggers?: any[], Handler?: Function, ErrorHandler?: Function }
    ) => {
        useEffect(() => {
            setLoading(true);

            Method(params).then((result: Dict) => {
                Handler?.(result);
            }).catch((error: Error) => {
                console.error(error);

                ErrorHandler?.(error);
            }).finally(() => {
                setLoading(false);
            });
        }, triggers ?? []);
    };

    /**
     * Function to fetch multiple endpoints at the same time
     * @param callMethods An array of fetch method objects that define what to fetch
     * @param triggers An optional array containing triggers to retrigger the fetch process
     * @param Handler A function that is called when all calls succesfully complete, returns results
     * @param ErrorHandler A function that is called when an error occurs in one of the fetch requests
     * @returns Results object, its keys are based upon the provided aliases to idenfitify individual fetch requests
     */
    const FetchMultiple = ({ callMethods, triggers, Handler, ErrorHandler }:
        { callMethods: { alias: string, params?: Dict, Method: Function }[], triggers?: any[], Handler?: Function, ErrorHandler?: Function }
    ) => {
        /**
         * Function to process the promises received by all requests
         * @param promises The request promises to resolve
         */
        const ProcessResults = (results: Dict[]) => {
            const aliasedResults: { [alias: string]: Dict } = {};

            results.forEach((result, index) => {
                aliasedResults[callMethods[index].alias] = result;
            });

            return aliasedResults;
        };

        useEffect(() => {
            setLoading(true);

            const promises: Promise<Dict>[] = [];

            callMethods.forEach(callMethod => {
                promises.push(callMethod.Method(callMethod.params));
            });

            Promise.all(promises).then((results) => {
                Handler?.(ProcessResults(results));
            }).catch(error => {
                ErrorHandler?.(error);
            }).finally(() => {
                setLoading(false);
            });
        }, triggers ?? []);
    };

    return {
        loading,
        Fetch,
        FetchMultiple
    };
};

/**
 * Focus hook for handling the focus of a specific HTML element
 * @param ref A React reference to the focussed element
 * @returns Instance of hook
 */
const useFocus = ({ ref, OnFocusLose }: { ref: React.RefObject<HTMLElement>, OnFocusLose?: Function }) => {
    /* Base variables */
    const [focusToggle, setFocusToggle] = useState<boolean>(false);

    useEffect(() => {
        const focusElement = ref.current as HTMLDivElement;

        /**
         * Function to handle a click outside of the element
         * @param event The click event initiated by the user
         */
        const HandleClickOutside = (event: Dict) => {
            if (!focusElement.contains(event.target)) {
                setFocusToggle(false);

                /* Call OnFocusLose function if defined */
                OnFocusLose?.();
            }
        };

        /* Set listener for mouse down (click) events */
        document.addEventListener("mousedown", HandleClickOutside);

        /* Clean up function */
        return () => {
            document.removeEventListener("mousedown", HandleClickOutside);
        };
    }, [ref]);

    return {
        focusToggle
    };
}

/**
 * Loading hook that handles the loading state of a component or function
 * @returns Instance of hook
 */
const useLoading = (immediate: boolean = false) => {
    /* Base variables */
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Function to initiate a loading process
     */
    const Start = () => setLoading(true);

    /**
     * Function to end a loading process
     */
    const End = () => setLoading(false);

    /* Immediately start the loading process if defined so */
    if (immediate) {
        Start();
    }

    return {
        loading,
        Start,
        End
    };
};

/**
 * Notification hook for handling toast notifications
 * @returns Instance of hook
 */
const useNotification = () => {
    /* Base variables */
    const dispatch = useAppDispatch();

    /**
     * Function to push a new notification to the global state
     * @param notification The notification to push
     */
    const Push = (notification: Notification) => {
        dispatch(pushToNotifications(notification));
    }

    return {
        Push
    };
};

/**
 * Paginator Hook for handling pagination with fetch requests and page numbers
 * @returns Instance of hook
 */
const usePagination = ({ pageSize, resultKey, allowSearchParams = false, Method, Handler }:
    { pageSize: number, resultKey?: string, allowSearchParams?: boolean, Method: Function, Handler?: Function }
) => {
    /* Hooks */
    const [searchParams] = useSearchParams();
    const searchFilters = useSearchFilters();

    /* Base variables */
    const [returnData, setReturnData] = useState<{
        records: Dict[],
        links: Dict,
        metadata: Dict
    }>({
        records: [],
        links: {},
        metadata: {}
    });
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchFiltersSave, setSearchFiltersSave] = useState<Dict>(
        searchFilters.GetSearchFilters()
    );

    /**
     * Function to set the page number to the given parameter
     * @param pageNumber A valid page number
     */
    const GoToPage = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber < 399) {
            setPageNumber(pageNumber);
        } else {
            throw (new Error('Page is out of range'));
        };
    };

    /**
     * Function to check for a next page and if so initate a fetch for those records
     * @returns True, if there is a next page or not
     */
    const Next = () => {
        if ('next' in returnData.links) {
            setPageNumber(pageNumber + 1);

            return true;
        } else {
            throw (new Error('No next page'));
        }
    };

    /**
     * Function to check for a previous page and if so initate a fetch for those records
     * @returns True, if there is a next page or not
     */
    const Previous = () => {
        if ('prev' in returnData.links) {
            setPageNumber(pageNumber - 1);

            return true;
        } else {
            throw (new Error('No previous page'));
        }
    };

    /**
     * Function to fetch the records of the last page in reach
     */
    const Last = () => {
        setPageNumber(lastPage);
    };

    /* UseEffect to watch the page number, if changed, trigger the given method */
    useEffect(() => {
        if (pageNumber) {
            /* Set Loading to true */
            setLoading(true);

            /* Fetch data */
            (async () => {
                try {
                    const result = await Method({ pageNumber: pageNumber, pageSize, ...(allowSearchParams && { searchFilters: searchFilters.GetSearchFilters() }) });

                    /* Set return data */
                    const records = resultKey ? result[resultKey] : result[Object.keys(result)[0]];

                    setReturnData({
                        records,
                        links: result?.links,
                        metadata: result?.metadata
                    });

                    /* Calculate last page*/
                    if (!isEmpty(result.metadata)) {
                        let lastPage = result.metadata.totalRecords && Math.ceil(result.metadata.totalRecords / 25);

                        /* If last page is greater than 400, set to 400 to prevent indexing errors */
                        if (lastPage > 399) {
                            lastPage = 399;
                        };

                        setLastPage(lastPage);
                    };

                    /* Return records to handler */
                    Handler?.(records);
                } catch (error) {
                    /* Set return data */
                    setReturnData({
                        records: [],
                        links: {},
                        metadata: {
                            totalRecords: 0
                        }
                    });

                    console.error(error);
                } finally {
                    setLoading(false);
                };
            })();
        } else {
            setPageNumber(1);
        };
    }, [pageNumber]);

    /* UseEffect to watch the search parameters if allowed, if so and on change, reset the page number to 1 */
    useEffect(() => {
        if (JSON.stringify(searchFilters.GetSearchFilters()) !== JSON.stringify(searchFiltersSave)) {
            setSearchFiltersSave(searchFilters.GetSearchFilters());

            setPageNumber(0);
        }
    }, [(allowSearchParams ? searchParams : false)]);

    return {
        records: returnData.records ?? [],
        totalRecords: returnData.metadata?.totalRecords ?? undefined,
        currentPage: pageNumber,
        lastPage,
        loading,
        GoToPage,
        ...(('next' in returnData.links && pageNumber !== 399) && { Next }),
        ...('prev' in returnData.links && { Previous }),
        ...((lastPage !== pageNumber && lastPage <= 399) && { Last })
    };
};

/**
 * Search Filters hook that handles setting the search params in the url
 * @returns Instance of hook
 */
const useSearchFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    /**
     * Function that retrieves and formats the search filters from the search params
     * @returns Search filters object
     */
    const GetSearchFilters = () => {
        const searchFilters = [...searchParams.entries()].reduce((filtersObject, [key, value]) => {
            return {
                ...filtersObject,
                [key]: key in filtersObject ? [...filtersObject[key as keyof typeof filtersObject] ?? [], value] : [value]
            }
        }, {});

        return searchFilters;
    };

    /**
     * Function to set the search filters based upon a search filters object
     * @param searchFilters An object containing search filter names as keys and values
     */
    const SetSearchFilters = (searchFilters: { [name: string]: string | string[] | boolean }) => {
        Object.entries(searchFilters).forEach(([name, searchFilter]) => {
            /* Remove all params from this name */
            searchParams.delete(name);

            /* Add all search filter values for this name, empty arrays will not do anything */
            if (Array.isArray(searchFilter) && !isEmpty(searchFilter)) {
                searchFilter.forEach(value => searchParams.append(name, value));
            } else if (!isEmpty(searchFilter)) {
                searchParams.set(name, searchFilter.toString());
            }
        });

        setSearchParams(searchParams);
    };

    /**
     * Function to check if a certain value of a search filter is active
     * @param name The name of the search filter
     * @param value The value assigned to the search filter
     * @returns True if present, False if not
     */
    const CheckSearchFilter = (name: string, value: string) => {
        return searchParams.getAll(name).includes(value);
    };

    return {
        GetSearchFilters,
        SetSearchFilters,
        CheckSearchFilter
    };
};

/**
 * Trigger hook that handles a trigger set for certain variables, executing a function upon change
 * @param callFunction The function to call when a given trigger triggers
 * @param triggers An array of variables to track as triggers
 * 
 */
const useTrigger = () => {
    const SetTrigger = (CallFunction: Function, triggers: any[]) => {
        useEffect(() => {
            CallFunction();
        }, [...triggers]);
    };

    return {
        SetTrigger
    };
};

export {
    useAppSelector,
    useAppDispatch,
    useDynamicSearch,
    useFetch,
    useFocus,
    useLoading,
    useNotification,
    usePagination,
    useSearchFilters,
    useTrigger
};
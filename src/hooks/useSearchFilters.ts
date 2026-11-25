/* Import dependencies */
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/* Import types */
import { SearchFilters } from "app/Types";

/* The allowed search filter keys for security */
const ALLOWED_FILTER_KEYS = ['q'] as const;
export type FilterKey = (typeof ALLOWED_FILTER_KEYS)[number];

export const useSearchFilters = () => {
    /* Initiate the react-router-dom hook that contains the searchParams */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Clean search filters object with the allowed search filter keys, with useMemo to cache */
    const searchFilters: SearchFilters = useMemo(() => {
        const filters: SearchFilters = {};

        ALLOWED_FILTER_KEYS.forEach((key) => {
            /* Values of duplicated keys are added to one array, trimmed for empty spaces and checked on value, if empty ignored */
            const values = searchParams
                .getAll(key)
                .map((value) => value.trim())
                .filter(Boolean);

            if (values.length > 0) filters[key] = [...values];
        });

        return filters;
    }, [searchParams]);

    /* Set or replace a single filter value */
    const setSingleFilter = (
        key: FilterKey,
        value: string,
        exclusiveKeys: FilterKey[] = []
    ) => {
        /* Create a mutable copy of params, because searchParams should not be mutated directly */
        const nextParams = new URLSearchParams(searchParams);
        const trimmed = value.trim();

        /* Delete mutually exclusive keys before setting new one */
        exclusiveKeys.forEach((exclusiveKey) => nextParams.delete(exclusiveKey));

        /* Check on value, if none, delete key entirely */
        if (trimmed) {
            nextParams.set(key, trimmed);
        } else {
            nextParams.delete(key);
        }

        setSearchParams(nextParams);
    };


    return {
        searchFilters,
        setSingleFilter,
    };
};

/* Import types */
import { SearchFilters } from "app/Types";

/* Import services */
import apiClient from "services/apiClient";

/**
 * Service that retrieves all aggregations of digital specimen
 * Either all aggregations, or aggregations based on a specific active filter, or aggregations for all non-active filters
 * @param activeFilter String that contains the selected (or active) filter on the search page
 * @param searchFilters Object containing all search filters we should take into account
 * @returns Aggregations object with aggregations based on the query for all digital specimen
 */
export const getDigitalSpecimenAggregations = async ({ activeFilter, searchFilters }: { activeFilter?: string, searchFilters?: SearchFilters }) => {
    /* Base variables */
    let endpoint: string;
    let filters: string = '';

    /* If filters are supplied, go through each filter and add them as queryParams */
    if (searchFilters) {
        /* For each filter */
        Object.entries(searchFilters).forEach(([key, values], index) => {
            /* Apply each value */
            values.forEach((value, valueIndex) => {
                filters = filters.concat(`${(index > 0 || valueIndex > 0) ? '&' : '?'}${key}=${encodeURIComponent(value)}`);
            });
        });
    };

    /* If a filter is active, add active filter to endpoint */
    if (activeFilter) {
        endpoint = `/digital-specimen/v1/aggregation/${activeFilter}${filters}`;
    } else {
        endpoint = `/digital-specimen/v1/aggregation${filters}`;
    }

    try {
        /* Call service and wait for response */
        const response = await apiClient.get(endpoint);

        /* Throw error if response is not as expected */
        if(!response.data?.data) {
            throw new Error('Incorrect response format');
        }

        /* Return response data */
        return response.data;
    } catch (error) {
        /* If error, throw error with generic error message */
        console.error('Error fetching the digital specimen:', error);

        /* Rethrow error for useQuery */
        throw error;
    }

}
/* Import types */
import { SearchFilters } from "app/Types";

/* Import services */
import apiClient from "services/apiClient";

/**
 * Service that retrieves all digital specimens or based on searchfilters through the apiClient
 * Takes pageSize, pageNumber and searchFilters as a parameter object
 * @returns An array with digital specimen objects
 */
export const getDigitalSpecimens = async ({ pageSize, pageNumber, searchFilters }:
    { searchFilters?: SearchFilters, pageSize: number, pageNumber?: number }
) => {
    let filters: string = '';

    /* Loop through the filters to fit the URLSearchParam format without changing encoding characters, i.e. / to %2F */
    if (searchFilters) {
        Object.entries(searchFilters).forEach(([key, values]) => {
            values.forEach((value) => {
                filters += `${filters ? "&" : "?"}${key}=${value}`;
            });
        });
    }

    try {
        /* Call service and wait for response */
        const response = await apiClient.get(`digital-specimen/v1/search${filters}`, {
            params: {
                pageSize,
                pageNumber
            }
        });

        /* Throw error if response is not as expected */
        if(!response.data?.data) {
            throw new Error('Incorrect response format');
        }

        /* Return response data */
        return response.data;
    } catch (error) {
        /* If error, throw error with generic error message */
        console.error('Error fetching digital specimens:', error);

        /* Rethrow error for useQuery */
        throw error;
    }
}
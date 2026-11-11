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
    const endPoint = `digital-specimen/v1/search${filters}`;

    if (searchFilters) {
        /* For each filter */
        Object.entries(searchFilters).forEach(([key, values], index) => {
            /* Apply each value */
            values.forEach((value, valueIndex) => {
                filters = filters.concat(`${(index > 0 || valueIndex > 0) ? '&' : '?'}${key}=${encodeURIComponent(value)}`);
            });
        });
    };

    try {
        /* Call service and wait for response */
        const response = await apiClient.get(endPoint, {
            params: {
                pageSize,
                pageNumber
            }
        });

        /* Throw error if response is not as expected */
        if(!response.data?.data) {
            throw new Error('Incorrect response format');
        }

        console.log('response in service', response.data);
        /* Return response data */
        return response.data;
    } catch (error) {
        /* If error, throw error with generic error message */
        console.error('Error fetching digital specimens:', error);

        /* Rethrow error for useQuery */
        throw error;
    }
}
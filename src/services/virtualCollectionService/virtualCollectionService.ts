import apiClient from '../apiClient';

/**
 * WIP: Needs to be consistent with all other services, simplified and needs global error handling
 * Service that retrieves all virtual collections through the apiClient
 * @returns An array with all virtual collections
 */
export const getAllVirtualCollections = async () => {
    try {
        /* Call service and wait for response */
        const response = await apiClient.get('/virtual-collection/v1');

        /* Throw error if response is not as expected */
        if(!response.data?.data) {
            throw new Error('Incorrect response format');
        }

        /* Return response data */
        return response.data.data;
    } catch (error) {
        /* If error, throw error with generic error message */
        console.error('Error fetching virtual collections:', error);

        /* Rethrow error for useQuery */
        throw error;
    }
}

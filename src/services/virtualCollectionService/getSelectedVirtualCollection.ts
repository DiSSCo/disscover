import apiClient from '../apiClient';

/**
 * Service that retrieves very specific virtual collection details
 * @param identifier Identifier for the specific virtual collection
 * @returns An object with al virtual collection details
 */
export const getSelectedVirtualCollection = async ({ identifier }: { identifier: string }) => {
    try {
        /* Call service and wait for response */
        const response = await apiClient.get(`virtual-collection/v1/${identifier}`);

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
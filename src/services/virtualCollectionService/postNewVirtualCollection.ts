import apiClient from 'services/apiClient';

/* Import types */
import { NewVirtualCollectionRequest } from 'types/ServiceTypes';

/**
 * Service that creates a new Virtual Collection by POST through the apiClient
 * @returns The result of the create, either successful or error
 */
export const postNewVirtualCollection = async (requestBody: NewVirtualCollectionRequest) => {
    try {
        /* Call service and wait for response */
        const response = await apiClient.post(
            '/virtual-collection/v1',
            requestBody,
        );

        /* Throw error if response is not as expected */
        if(!response.data?.data) {
            throw new Error('Incorrect response format');
        }

        /* Return response data with status of POST */
        return response.data.data;
    } catch (error) {
        /* If error, throw error with generic error message */
        console.error('Error fetching virtual collections:', error);

        /* Rethrow error for useQuery */
        throw error;
    }
}

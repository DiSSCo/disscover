import apiClient from '../apiClient';

/**
 * Service that retrieves the virtual collection details through the apiClient
 * Takes pageSize, pageNumber and virtualCollectionID as a parameter object
 * @returns An array with all digital specimen in a specific virtual collection
 */
export const getVirtualCollectionDetails = async ({ pageSize, pageNumber, virtualCollectionID }:
    { pageSize: number, pageNumber?: number, virtualCollectionID: string }) => {
    try {
        /* Call service and wait for response */
        const response = await apiClient.get(`digital-specimen/v1/search?virtualCollectionID=https://hdl.handle.net/${virtualCollectionID}`, {
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
        console.error('Error fetching virtual collections:', error);

        /* Rethrow error for useQuery */
        throw error;
    }
}
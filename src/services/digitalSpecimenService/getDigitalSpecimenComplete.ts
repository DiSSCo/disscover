import apiClient from '../apiClient';

/**
 * Service that retrieves the virtual collection details through the apiClient
 * Takes pageSize, pageNumber and virtualCollectionID as a parameter object
 * @returns An array with all digital specimen in the virtual collection
 */
export const getDigitalSpecimenComplete = async ({ handle, version }:
    { handle: string, version?: number }) => {
    let endPoint: string;

    if (version) {
        endPoint = `digital-specimen/v1/${handle}/${version}/full`;
    } else {
        endPoint = `digital-specimen/v1/${handle}/full`;
    }
    try {
        /* Call service and wait for response */
        const response = await apiClient.get(endPoint, {
            params: {
                handle,
                version
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
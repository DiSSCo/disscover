import apiClient from '../apiClient';

/**
 * Service that retrieves the complete digital specimen details through the apiClient
 * Takes handle and version as a parameter object
 * @returns An array with complete digital specimen data on specimen, media and annotations
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
        console.error('Error fetching the digital specimen:', error);

        /* Rethrow error for useQuery */
        throw error;
    }
}
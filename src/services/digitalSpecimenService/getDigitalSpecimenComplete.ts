import apiClient from '../apiClient';

/**
 * Service that retrieves the complete digital specimen details through the apiClient
 * Takes doi and version as a parameter object
 * @returns An array with complete digital specimen data on specimen, media and annotations
 */
export const getDigitalSpecimenComplete = async ({ doi, version }:
    { doi: string, version?: number }) => {
    let endPoint: string;

    if (version) {
        endPoint = `digital-specimen/v1/${doi}/${version}/full`;
    } else {
        endPoint = `digital-specimen/v1/${doi}/full`;
    }
    try {
        /* Call service and wait for response */
        const response = await apiClient.get(endPoint, {
            params: {
                doi,
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
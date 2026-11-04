import apiClient from '../apiClient';

/**
 * Service that retrieves a digital media annotations
 * @param handle The identifier of the digital media item
 * @returns Object of Digital Media Annotations
 */
export const getDigitalMediaAnnotations = async ({ handle }: { handle: string }) => {
    const endPoint: string = `digital-media/v1/${handle}/annotations`;

    try {
        /* Call service and wait for response */
        const response = await apiClient.get(endPoint);

        /* Throw error if response is not as expected */
        if(!response.data?.data) {
            throw new Error('Incorrect response format');
        }

        /* Return response data */
        return response.data;
    } catch (error) {
        /* If error, throw error with generic error message */
        console.error('Error fetching the digital media annotations:', error);

        /* Rethrow error for useQuery */
        throw error;
    }
}
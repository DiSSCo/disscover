import apiClient from '../apiClient';

/**
 * Service that retrieves a digital media item
 * @param handle The identifier of the digital media item
 * @param version The version of the digital media item
 * @returns Object of Digital Media
 */
export const getDigitalMedia = async ({ handle, version }:
    { handle: string, version?: number }) => {
    let endPoint: string;

    if (version) {
        endPoint = `digital-media/v1/${handle}${version}`;
    } else {
        endPoint = `digital-media/v1/${handle}`;
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
        console.error('Error fetching the digital media:', error);

        /* Rethrow error for useQuery */
        throw error;
    }
}
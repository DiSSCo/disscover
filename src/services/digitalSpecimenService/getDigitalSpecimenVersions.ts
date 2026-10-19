import apiClient from '../apiClient';

/**
 * Service that retrieves the versions of a specific digital specimen details through the apiClient
 * Takes doi as a parameter object
 * @returns An array of numbers corresponding to the amount of versions a digital specimen has
 */
export const getDigitalSpecimenVersions = async ({ handle }: { handle: string }) => {
    const endPoint: string = `digital-specimen/v1/${handle}/versions`;
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
        console.error('Error fetching the digital specimen:', error);

        /* Rethrow error for useQuery */
        throw error;
    }
}
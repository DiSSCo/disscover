/* Import Dependencies */
import axios from 'axios';


/**
 * Function to fetch the version numbers of a digital media item
 * @param handle The identifier of the digital media item
 * @returns Array of numbers, representing the available digital media versions
 */
const GetDigitalMediaVersions = async ({ handle }: { handle: string }) => {
    let digitalMediaVersions = [] as number[];

    const endPoint: string = `digital-media/v1/${handle}/versions`;

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        });

        /* Set digital media versions */
        const data = result.data;

        digitalMediaVersions = data.data.attributes.versions.sort((a: number, b: number) => (a - b));
    } catch (error) {
        console.warn(error);
    };

    return digitalMediaVersions;
};

export default GetDigitalMediaVersions;
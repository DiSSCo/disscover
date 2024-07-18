/* Import Dependencies */
import axios from 'axios';


/**
 * Function to fetch the version numbers of a digital specimen
 * @param handle The identifier of the digital specimen
 * @returns Array of numbers, representing the available digital specimen versions
 */
const GetDigitalSpecimenVersions = async ({ handle }: { handle: string }) => {
    let digitalSpecimenVersions = [] as number[];

    const endPoint: string = `digital-specimen/${handle}/versions`;

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        });

        /* Set Specimen Versions */
        const data = result.data;

        digitalSpecimenVersions = data.data.attributes.versions.sort((a: number, b: number) => (a - b));
    } catch (error) {
        console.warn(error);
    }

    return digitalSpecimenVersions;
};

export default GetDigitalSpecimenVersions;
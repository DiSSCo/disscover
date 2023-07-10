/* Import Dependencies */
import axios from 'axios';


const GetDigitalMediaVersions = async (handle: string) => {
    let digitalMediaVersions = [] as number[];

    const endPoint: string = `digitalmedia/${handle}/versions`;

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        });

        /* Set Specimen Versions */
        const data = result.data;

        digitalMediaVersions = data.data.attributes.versions.sort((a: number, b: number) => (a - b));
    } catch (error) {
        console.warn(error);
    }

    return digitalMediaVersions;
}

export default GetDigitalMediaVersions;
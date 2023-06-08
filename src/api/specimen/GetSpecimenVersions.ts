/* Import Dependencies */
import axios from 'axios';


const GetSpecimenVersions = async (handle: string) => {
    let specimenVersions = [] as number[];

    const endPoint: string = `specimens/${handle}/versions`;

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        });

        /* Set Specimen Versions */
        const data = result.data;

        specimenVersions = data.data.attributes.versions.sort((a: number, b: number) => (a - b));
    } catch (error) {
        console.warn(error);
    }

    return specimenVersions;
}

export default GetSpecimenVersions;
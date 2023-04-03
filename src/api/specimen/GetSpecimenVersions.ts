/* Import Dependencies */
import axios from 'axios';


const GetSpecimenVersions = async (handle: string) => {
    if (handle) {
        let specimenVersions = <number[]>[];

        const endPoint: string = `specimens/${handle}/versions`;

        await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        }).then((result) => {
            /* Set Specimen Versions */
            const data = result.data;

            specimenVersions = data.data.attributes.versions;
        }).catch((error) => {
            console.warn(error);
        });

        return specimenVersions;
    }
}

export default GetSpecimenVersions;
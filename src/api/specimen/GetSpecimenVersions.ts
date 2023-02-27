/* Import Dependencies */
import axios from 'axios';


const GetSpecimenVersions = async (handle: string) => {
    if (handle) {
        let specimenVersions = <number[]>[];

        const endPoint: string = `specimens/${handle}/versions`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json'
            });

            specimenVersions = result.data;
        } catch (error) {
            console.warn(error);
        }

        return specimenVersions;
    }
}

export default GetSpecimenVersions;
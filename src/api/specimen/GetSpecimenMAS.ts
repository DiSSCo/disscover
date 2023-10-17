/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResultArray, Dict } from 'app/Types';


const GetSpecimenMAS = async (handle: string) => {
    let specimenMAS: Dict[] = [];

    if (handle) {
        const endPoint: string = `/specimens/${handle}/mas`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json'
            });

            /* Set Specimen MAS */
            const data: JSONResultArray = result.data;

            specimenMAS = data.data;
        } catch (error) {
            console.warn(error);
        }
    }

    return specimenMAS;
}

export default GetSpecimenMAS;
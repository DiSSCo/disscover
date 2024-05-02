/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { Dict, JSONResult } from 'app/Types';


const GetMAS = async (handle: string) => {
    let machineAnnotationService = {} as Dict;

    if (handle) {
        let endPoint: string = `/mas/${handle}`;

        try {
            const result = await axios({
                method: "get",
                baseURL: 'https://orchestration.dissco.tech/api/v1',
                url: endPoint,
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: JSONResult = result.data;

            /* Set Digital Specimen */
            machineAnnotationService = data.data.attributes;
        } catch (error) {
            console.warn(error);
        }
    }

    return machineAnnotationService;
}

export default GetMAS;
/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, Dict } from 'app/Types';


const GetSpecimenDisciplines = async () => {
    let disciplines = {} as Dict;
    let metadata = {} as Dict;
    let endPoint: string = '/specimens/discipline';

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        });

        /* Set Aggregations */
        const data: JSONResult = result.data;

        disciplines = data.data.attributes;

        if (data.meta) {
            metadata = data.meta;
        }
    } catch (error) {
        console.warn(error);
    }

    return {
        disciplines: disciplines,
        metadata: metadata
    };
}

export default GetSpecimenDisciplines;
/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, Dict } from 'global/Types';


const GetSpecimenDisciplines = async () => {
    let disciplines = {} as Dict;
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
    } catch (error) {
        console.warn(error);
    }

    return disciplines;
}

export default GetSpecimenDisciplines;
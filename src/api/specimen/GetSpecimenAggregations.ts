/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, Dict } from 'global/Types';


const GetSpecimenAggregations = async () => {
    let aggregations = <Dict>{};

    const endPoint: string = '/specimens/aggregation';

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        });

        /* Set Aggregations */
        const data: JSONResult = result.data;

        aggregations = data.data.attributes;
    } catch (error) {
        console.warn(error);
    }

    return aggregations;
}

export default GetSpecimenAggregations;
/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, Dict } from 'app/Types';


const GetSpecimenTaxonomyAggregations = async (taxonomyLevel: string, taxonomicValue: string) => {
    let taxonomyAggregations = {} as Dict;
    let endPoint: string = '/specimens/taxonomy/aggregation';

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            params: {
                [taxonomyLevel]: taxonomicValue
            },
            responseType: 'json'
        });

        /* Set Aggregations */
        const data: JSONResult = result.data;

        taxonomyAggregations = data.data.attributes;
    } catch (error) {
        console.warn(error);
    }

    return taxonomyAggregations;
}

export default GetSpecimenTaxonomyAggregations;
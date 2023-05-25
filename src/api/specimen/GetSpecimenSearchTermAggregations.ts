/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, Dict } from 'global/Types';


const GetSpecimenSearchTermAggregations = async (term: string, value: string) => {
    let searchTermAggregations = {} as Dict;

    if (term && value) {
        const endPoint: string = `/specimens/searchTermValue?term=${term}&value=${value}`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json'
            });

            /* Set Specimen with Model */
            const data: JSONResult = result.data;

            searchTermAggregations = data.data.attributes;
        } catch (error) {
            console.warn(error);
        }
    }

    return searchTermAggregations;
}

export default GetSpecimenSearchTermAggregations;
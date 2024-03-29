/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, Dict } from 'app/Types';


const SearchSpecimenSearchTermValue = async (term: string, query: string) => {
    let results: Dict = {};

    if (term && query) {
        let endPoint: string = 'specimens/searchTermValue';

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                params: {
                    term: term,
                    value: query,
                    sort: true
                },
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: JSONResult = result.data;

            /* Set Search Term Results */
            results = data.data.attributes[term] as Dict;
        } catch (error) {
            console.warn(error);
        }
    }

    return results;
}

export default SearchSpecimenSearchTermValue;
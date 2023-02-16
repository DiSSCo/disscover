/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { Specimen } from 'global/Types';


const SearchSpecimens = async (query: string) => {
    let searchResults = <Specimen[]>[];

    if (query) {
        const endPoint = "specimens/search";
        const params = {
            query: query,
            pageSize: 25
        }

        await axios({
            method: "get",
            url: endPoint,
            params: params,
            responseType: 'json'
        }).then((result) => {
            searchResults = result.data;
        }).catch((error) => {
            console.warn(error);
        });
    }

    return searchResults;
}

export default SearchSpecimens;
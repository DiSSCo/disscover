import axios from 'axios';


function SpecimenSearch(query, callback) {
    if (query) {
        const endPoint = "specimens/search";
        const params = {
            query: query,
            pageSize: 25
        }

        axios({
            method: "get",
            url: endPoint,
            params: params,
            responseType: 'json'
        }).then(function(result) {
            callback(result['data']);
        }).catch(error => {
            /* To be replaced by logger */
            console.warn(error);
        });
    }
}

export default SpecimenSearch;
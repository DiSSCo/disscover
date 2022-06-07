import axios from 'axios';

function SpecimenSearch(query, callback) {
    if (query) {
        const endPoint = "api/v1/specimen/search";
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
            /* To be raplced by logger */
            console.warn(error);
        });
    }
}

export default SpecimenSearch
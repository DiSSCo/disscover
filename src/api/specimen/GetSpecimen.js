import axios from 'axios';


/* Search function needs to be replaced with regular get (prefix/postfix) when id is fixed */


function GetSpecimen(query, callback) {
    if (query) {
        const endPoint = "specimen/search";
        const params = {
            query: query,
            pageSize: 1
        }

        axios({
            method: "get",
            url: endPoint,
            params: params,
            responseType: 'json'
        }).then(function(result) {
            callback(result['data'][0]);
        }).catch(error => {
            /* To be replaced by logger */
            console.warn(error);
        });
    }
}

export default GetSpecimen;
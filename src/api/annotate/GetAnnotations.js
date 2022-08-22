import axios from 'axios';


function GetAnnotations(prefix, suffix, callback) {
    if (prefix && suffix) {
        const endPoint = 'specimen/' + prefix + '/' + suffix + '/annotations';

        axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        }).then(function(result) {
            callback(result['data']);
        }).catch(error => {
            /* To be replaced by logger */
            console.warn(error);
        });
    }
}

export default GetAnnotations;
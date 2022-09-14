import axios from 'axios';


function GetSpecimen(handle, callback) {
    if (handle) {
        const endPoint = `specimens/${handle}`;

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

export default GetSpecimen;
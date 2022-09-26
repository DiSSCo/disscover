import axios from 'axios';


function GetSpecimen(handle, callback, version = null) {
    if (handle) {
        let endPoint;

        if (version) {
            endPoint = `specimens/${handle}/${version}`;
        } else {
            endPoint = `specimens/${handle}`;
        }

        axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        }).then(function (result) {
            callback(result['data']);
        }).catch(error => {
            /* To be replaced by logger */
            console.warn(error);
        });
    }
}

export default GetSpecimen;
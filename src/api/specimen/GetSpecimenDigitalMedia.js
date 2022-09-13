import axios from 'axios';


function GetSpecimenDigitalMedia(handle, callback) {
    if (handle) {
        const endPoint = `specimens/${handle}/digitalmedia`;

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

export default GetSpecimenDigitalMedia;
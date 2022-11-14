import axios from 'axios';


function GetDigitalMedia(handle, callback) {
    const endPoint = `digitalmedia/${handle}`;

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

export default GetDigitalMedia;
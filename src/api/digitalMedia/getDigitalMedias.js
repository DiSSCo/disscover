import axios from 'axios';


function GetDigitalMedias(callback) {
    const endPoint = `digitalmedia`;

    axios({
        method: "get",
        url: endPoint,
        params: {
            pageSize: 16
        },
        responseType: 'json'
    }).then(function (result) {
        callback(result['data']);
    }).catch(error => {
        /* To be replaced by logger */
        console.warn(error);
    });
}

export default GetDigitalMedias;
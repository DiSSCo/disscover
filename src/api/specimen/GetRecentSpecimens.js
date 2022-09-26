import axios from "axios";


function GetRecentSpecimens(callback) {
    const endPoint = "/specimens"

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

export default GetRecentSpecimens;
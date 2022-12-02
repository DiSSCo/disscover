import axios from "axios";


function GetOrganizations(callback) {
    const endPoint = "/organisation/tuples"

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

export default GetOrganizations;
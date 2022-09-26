import axios from 'axios';


function GetCreatorAnnotations(token, callback) {
    const endPoint = 'annotations/creator';

    axios({
        method: "get",
        url: endPoint,
        responseType: 'json',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }).then(function (result) {
        callback(result['data']);
    }).catch(error => {
        /* To be replaced by logger */
        console.warn(error);
    });
}

export default GetCreatorAnnotations;
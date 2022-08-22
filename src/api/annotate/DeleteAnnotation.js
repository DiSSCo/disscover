import axios from 'axios';


function DeleteAnnotation(prefix, suffix, token, callback) {
    if (prefix && suffix) {
        const endPoint = 'annotations/' + prefix + '/' + suffix;

        axios({
            method: "delete",
            url: endPoint,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(function(result) {
            if (callback) {
                callback(result['data']);
            }
        }).catch(error => {
            /* To be replaced by logger */
            console.warn(error);
        });
    }
}

export default DeleteAnnotation;
import axios from 'axios';


function InsertAnnotation(annotation, token, callback) {
    if (annotation) {
        const endPoint = '/annotations';

        axios({
            method: "post",
            url: endPoint,
            data: annotation,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(function (result) {
            callback(result['data']);
        }).catch(error => {
            /* To be replaced by logger */
            console.warn(error);

            callback(false);
        });
    }
}

export default InsertAnnotation;
import axios from 'axios';


function PatchAnnotation(annotation, token, callback) {
    if (annotation) {
        const fixes = annotation['id'].split('/');
        const endPoint = '/annotations/' + fixes[0] + '/' + fixes[1];

        axios({
            method: "patch",
            url: endPoint,
            data: annotation,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(function(result) {
            callback(result['data']);
        }).catch(error => {
            /* To be replaced by logger */
            console.warn(error);

            callback(false);
        });
    }
}

export default PatchAnnotation;
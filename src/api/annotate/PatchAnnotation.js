import axios from 'axios';


function PatchAnnotation(annotation, token, callback) {
    if (annotation) {
        const endPoint = `/annotations/${annotation['id']}`;

        const patchAnnotation = {
            type: 'Annotation',
            motivation: 'https://hdl.handle.net/pid-motivation-correcting',
            body: {
                type: 'TextualBody',
                value: annotation['body']['value'],
                reference: 'https://bionomia.net/Q3822242'
            },
            target: {
                type: 'https://hdl.handle.net/digitalSpecimen-type',
                id: annotation['target']['id'],
                indvProp: annotation['target']['indvProp']
            }
        }

        axios({
            method: "patch",
            url: endPoint,
            data: patchAnnotation,
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

export default PatchAnnotation;
import axios from 'axios';


function DeleteAnnotation(handle, token, callback) {
    if (handle) {
        const endPoint = `annotations/${handle}`;

        axios({
            method: "delete",
            url: endPoint,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }).then(function() {
            if (callback) {
                callback(true);
            }
        }).catch(error => {
            /* To be replaced by logger */
            console.warn(error);
        });
    }
}

export default DeleteAnnotation;
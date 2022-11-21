import axios from 'axios';


function PatchUser(token, id, attributes, callback) {
    if (token) {
        const user = {
            data: {
                id: id,
                type: "users",
                attributes: attributes
            },
            links: {
                self: `https://sandbox.dissco.tech/api/v1/users/${id}`
            }
        }

        const endPoint = `users/${id}`

        axios({
            method: "patch",
            url: endPoint,
            data: user,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(function (result) {
            callback(result['data']);
        }).catch(error => {
            /* To be replaced by logger */
            console.warn(error);
        });
    }
}

export default PatchUser;
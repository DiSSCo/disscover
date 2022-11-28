import axios from 'axios';


function InsertUser(token, id, keycloakParsed, callback) {
    if (token) {
        const user = {
            data: {
                id: id,
                type: "users",
                attributes: {
                    firstName: keycloakParsed.given_name,
                    lastName: keycloakParsed.family_name,
                    email: keycloakParsed.email
                }
            },
            links: {
                self: `https://sandbox.dissco.tech/api/v1/users/${id}`
            }
        }

        axios({
            method: "post",
            url: 'users',
            data: user,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(function (result) {
            callback(result['data']['id']);
        }).catch(error => {
            /* To be replaced by logger */
            console.warn(error);
        });
    }
}

export default InsertUser;
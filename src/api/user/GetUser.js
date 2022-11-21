import axios from 'axios';


function GetUser(token, id, callback) {
    if (id) {
        const endPoint = `users/${id}`;

        axios({
            method: "get",
            url: endPoint,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(function (result) {
            callback(result['data']);
        }).catch(error => {
            /* To be replaced by logger */
            callback(null);
        });
    }
}

export default GetUser;
/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, User } from 'global/Types';


const GetUser = async (userId?: string, token?: string) => {
    if (userId && token) {
        const user = <User>{};

        const endPoint = `users/${userId}`;

        await axios({
            method: "get",
            url: endPoint,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((result) => {
            /* Set User */
            const data: JSONResult = result['data'];

            user.id = data.data.id;
            user.firstName = data.data.attributes.firstName;
            user.lastName = data.data.attributes.lastName;
            user.email = data.data.attributes.email;
            user.organization = data.data.attributes.organization;
            user.orcid = data.data.attributes.orcid;
        }).catch((error) => {
            console.warn(error);
        });

        return user;
    }
}

export default GetUser;
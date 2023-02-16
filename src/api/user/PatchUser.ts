/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { User, Dict, JSONResult } from 'global/Types';


const PatchUser = async (userId: string, attributes: Dict, token?: string) => {
    if (userId && token) {
        const user = <User>{};

        const userRecord: JSONResult = {
            data: {
                id: userId,
                type: "users",
                attributes: attributes
            },
            links: {
                self: `https://sandbox.dissco.tech/api/v1/users/${userId}`
            }
        }

        const endPoint = `users/${userId}`

        await axios({
            method: "patch",
            url: endPoint,
            data: userRecord,
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

export default PatchUser;
/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, User, Dict } from 'global/Types';


const InsertUser = async (userId?: string, token?: string, keycloakParsed?: Dict) => {
    if (userId && token) {
        const user = <User>{};

        const userRecord: JSONResult = {
            data: {
                id: userId,
                type: "users",
                attributes: <User>{
                    firstName: keycloakParsed?.given_name,
                    lastName: keycloakParsed?.family_name,
                    email: keycloakParsed?.email
                }
            },
            links: {
                self: `https://sandbox.dissco.tech/api/v1/users/${userId}`
            }
        }

        await axios({
            method: "post",
            url: 'users',
            data: userRecord,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((result) => {
            /* Set User */
            const data: JSONResult = result['data'];

            user.firstName = data['data']['attributes']['firstName'];
            user.lastName = data['data']['attributes']['lastName'];
            user.email = data['data']['attributes']['email'];
            user.organization = data['data']['attributes']['organization'];
            user.orcid = data['data']['attributes']['orcid'];
        }).catch((error) => {
            console.warn(error);
        });

        return user;
    }
}

export default InsertUser;
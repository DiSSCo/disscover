/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import UserModel from 'api/model/UserModel';

/* Import Types */
import { User, Dict, JSONResult } from 'app/Types';


const InsertUser = async (userId?: string, token?: string, keycloakParsed?: Dict) => {
    if (userId && token) {
        let user = {} as User;

        const userRecord: JSONResult = {
            data: {
                id: userId,
                type: "users",
                attributes: {
                    firstName: keycloakParsed?.given_name,
                    lastName: keycloakParsed?.family_name,
                    email: keycloakParsed?.email
                } as User
            },
            links: {
                self: `https://sandbox.dissco.tech/api/v1/users/${userId}`
            }
        }

        try {
            const result = await axios({
                method: "post",
                url: 'users',
                data: userRecord,
                responseType: 'json',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            /* Set User with Model */
            const data: JSONResult = result.data;

            user = UserModel(data.data);
        } catch (error) {
            console.warn(error);
        }

        return user;
    }
}

export default InsertUser;
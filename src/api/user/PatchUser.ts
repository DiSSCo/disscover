/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import UserModel from 'api/model/UserModel';

/* Import Types */
import { User, Dict, JSONResult } from 'global/Types';


const PatchUser = async (userId: string, attributes: Dict, token?: string) => {
    if (userId && token) {
        let user = <User>{};

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

        try {
            const result = await axios({
                method: "patch",
                url: endPoint,
                data: userRecord,
                responseType: 'json',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            /* Set User */
            const data: JSONResult = result.data;

            user = UserModel(data);
        } catch (error) {
            console.warn(error);
        }

        return user;
    }
}

export default PatchUser;
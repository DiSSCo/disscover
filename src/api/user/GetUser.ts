/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import UserModel from 'api/model/UserModel';

/* Import Types */
import { JSONResult, User } from 'app/Types';


const GetUser = async (userId?: string, token?: string) => {
    let user = {} as User;

    if (userId && token) {
        const endPoint = `users/${userId}`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            /* Set User with Model */
            const data: JSONResult = result.data;

            user = UserModel(data.data);
        } catch (error) {
            console.warn(error);
        }
    }

    return user;
}

export default GetUser;
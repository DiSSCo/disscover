/* Import Types */
import { User as UserType, JSONResult } from "global/Types"


/* User Model for API calls */
const UserModel = (result: JSONResult) => {
    const data = result.data;

    const user: UserType = {
        id: data.id,
        firstName: data.attributes.firstName,
        lastName: data.attributes.lastName,
        email: data.attributes.email,
        organisation: data.attributes.organisation,
        orcid: data.attributes.orcid
    }

    return user;
}

export default UserModel;
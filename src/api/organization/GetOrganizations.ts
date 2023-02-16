/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { Organization } from "global/Types";


const GetOrganizations = async () => {
    let organizations = <Organization[]>[];

    const endPoint = "/organisation/tuples"

    await axios({
        method: "get",
        url: endPoint,
        responseType: 'json'
    }).then((result) => {
        organizations = result.data;
    }).catch((error) => {
        console.warn(error);
    });

    return organizations;
}

export default GetOrganizations;
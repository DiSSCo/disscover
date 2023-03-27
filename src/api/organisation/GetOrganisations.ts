/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { Organisation } from "global/Types";


const GetOrganisations = async () => {
    let organisations = <Organisation[]>[];

    const endPoint = "/organisation/tuples"

    await axios({
        method: "get",
        url: endPoint,
        responseType: 'json'
    }).then((result) => {
        organisations = result.data;
    }).catch((error) => {
        console.warn(error);
    });

    return organisations;
}

export default GetOrganisations;
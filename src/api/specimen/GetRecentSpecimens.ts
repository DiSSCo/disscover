/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { Specimen } from "global/Types";


const GetRecentSpecimens = async () => {
    let recentSpecimens = <Specimen[]>[];

    const endPoint = "/specimens"

    axios({
        method: "get",
        url: endPoint,
        responseType: 'json'
    }).then((result) => {
        recentSpecimens = result.data;
    }).catch((error) => {
        console.warn(error);
    });

    return recentSpecimens;
}

export default GetRecentSpecimens;
/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { Annotation } from "global/Types";


const GetRecentAnnotations = async () => {
    let annotations = <Annotation[]>[];

    const endPoint = "/annotations/latest"

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        });

        annotations = result.data;
    } catch (error) {
        console.warn(error);
    }

    return annotations;
}

export default GetRecentAnnotations;
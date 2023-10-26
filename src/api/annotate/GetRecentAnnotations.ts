/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResultArray } from 'app/Types';
import { Annotation } from 'app/types/Annotation';


const GetRecentAnnotations = async (pageSize: number, pageNumber?: number) => {
    let annotations = [] as Annotation[];

    const endPoint = "/annotations/latest"

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        });

        /* Set Recent Annotations with model */
        const data: JSONResultArray = result.data;

        data.data.forEach((dataRow) => {
            const annotation = dataRow.attributes as Annotation;

            annotations.push(annotation);
        });
    } catch (error) {
        console.warn(error);
    }

    return annotations;
}

export default GetRecentAnnotations;
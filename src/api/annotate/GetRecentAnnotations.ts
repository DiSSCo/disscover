/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import AnnotationModel from 'api/model/AnnotationModel';

/* Import Types */
import { Annotation, JSONResultArray } from 'app/Types';


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
            const annotation = AnnotationModel(dataRow);

            annotations.push(annotation);
        });
    } catch (error) {
        console.warn(error);
    }

    return annotations;
}

export default GetRecentAnnotations;
/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import AnnotationModel from "api/model/AnnotationModel";

/* Import Types */
import { Annotation, JSONResultArray, Dict } from 'global/Types';


const GetUserAnnotations = async (token: string | undefined, pageSize: number, pageNumber?: number) => {
    let userAnnotations = [] as Annotation[];
    let links: Dict = {};

    if (token) {
        const endPoint = 'annotations/creator';

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json',
                params: {
                    pageSize: pageSize,
                    pageNumber: pageNumber ? pageNumber : 1
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            /* Set User Annotations with model */
            const data: JSONResultArray = result.data;
            links = data.links;

            data.data.forEach((dataRow) => {
                const annotation = AnnotationModel(dataRow);

                userAnnotations.push(annotation);
            });
        } catch (error) {
            console.warn(error);
        }
    }

    return {
        userAnnotations: userAnnotations,
        links: links
    };
}

export default GetUserAnnotations;
/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResultArray, Dict } from 'app/Types';
import { Annotation } from 'app/types/Annotation';


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
                userAnnotations.push(dataRow.attributes as Annotation);
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
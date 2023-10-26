/* Import Dependencies */
import axios from 'axios';
import { isEmpty } from 'lodash';

/* Import Types */
import { AnnotationTemplate, JSONResult } from 'app/Types';
import { Annotation } from 'app/types/Annotation';


const InsertAnnotation = async (annotationRecord: AnnotationTemplate, token?: string) => {
    let annotation = {} as Annotation;

    if (!isEmpty(annotationRecord) && token) {
        const postAnnotation = {
            data: {
                type: 'annotation',
                attributes: annotationRecord
            }
        }; 

        const endPoint = '/annotations';

        try {
            const result = await axios({
                method: "post",
                url: endPoint,
                data: postAnnotation,
                responseType: 'json',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            /* Set Annotation with Model */
            const data: JSONResult = result.data;

            annotation = data.data.attributes as Annotation;
        } catch (error) {
            console.warn(error);
        }
    }

    return annotation;
}

export default InsertAnnotation;
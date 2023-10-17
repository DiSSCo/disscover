/* Import Dependencies */
import axios from 'axios';
import { isEmpty } from 'lodash';

/* Import Model */
import AnnotationModel from 'api/model/AnnotationModel';

/* Import Types */
import { Annotation, AnnotationTemplate, ImageAnnotationTemplate, JSONResult } from 'app/Types';


const InsertAnnotation = async (annotationRecord: AnnotationTemplate | ImageAnnotationTemplate, token?: string) => {
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

            annotation = AnnotationModel(data.data);
        } catch (error) {
            console.warn(error);
        }
    }

    return annotation;
}

export default InsertAnnotation;
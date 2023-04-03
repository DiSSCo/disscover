/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import AnnotationModel from 'api/model/AnnotationModel';

/* Import Types */
import { Annotation, AnnotationTemplate, JSONResult } from 'global/Types';


const InsertAnnotation = async (annotationRecord: AnnotationTemplate, token?: string) => {
    if (annotationRecord && token) {
        let annotation = <Annotation>{};

        const endPoint = '/annotations';

        try {
            const result = await axios({
                method: "post",
                url: endPoint,
                data: annotationRecord,
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

        return annotation;
    }
}

export default InsertAnnotation;
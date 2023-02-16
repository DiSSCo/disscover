/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { Annotation, AnnotationTemplate } from 'global/Types';


const InsertAnnotation = async (annotationRecord: AnnotationTemplate, token?: string) => {
    if (annotationRecord && token) {
        let annotation = <Annotation>{};

        const endPoint = '/annotations';

        await axios({
            method: "post",
            url: endPoint,
            data: annotationRecord,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((result) => {
            annotation = result.data;
        }).catch((error) => {
            console.warn(error);
        });

        return annotation;
    }
}

export default InsertAnnotation;
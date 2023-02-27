/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { Annotation, AnnotationTemplate } from 'global/Types';


const PatchAnnotation = async (annotationRecord: AnnotationTemplate, annotationId: string, token?: string) => {
    if (annotationRecord && token) {
        let annotation = <Annotation>{};

        const endPoint = `/annotations/${annotationId}`;

        try {
            const result = await axios({
                method: "patch",
                url: endPoint,
                data: annotationRecord,
                responseType: 'json',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            annotation = result.data;
        } catch (error) {
            console.warn(error);
        }

        return annotation;
    }
}

export default PatchAnnotation;
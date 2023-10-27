/* Import Dependencies */
import axios from 'axios';
import { isEmpty } from 'lodash';

/* Import Types */
import { AnnotationTemplate, JSONResult } from 'app/Types';
import { Annotation } from 'app/types/Annotation';


const PatchAnnotation = async (annotationRecord: AnnotationTemplate, annotationId: string, token?: string) => {
    let annotation = {} as Annotation;

    if (!isEmpty(annotationRecord) && token) {
        const patchAnnotation = {
            data: {
                type: 'annotation',
                attributes: annotationRecord
            }
        };

        const endPoint = `/annotations/${annotationId}`;

        try {
            const result = await axios({
                method: "patch",
                url: endPoint,
                data: patchAnnotation,
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

export default PatchAnnotation;
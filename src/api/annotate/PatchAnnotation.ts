/* Import Dependencies */
import axios from 'axios';
import { isEmpty } from 'lodash';

/* Import Model */
import AnnotationModel from 'api/model/AnnotationModel';

/* Import Types */
import { Annotation, AnnotationTemplate, ImageAnnotationTemplate, JSONResult } from 'global/Types';


const PatchAnnotation = async (annotationRecord: AnnotationTemplate | ImageAnnotationTemplate, annotationId: string, token?: string) => {
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

            annotation = AnnotationModel(data.data);
        } catch (error) {
            console.warn(error);
        }
    }

    return annotation;
}

export default PatchAnnotation;
/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import AnnotationModel from 'api/model/AnnotationModel';

/* Import Types */
import { Annotation, AnnotationTemplate, JSONResult } from 'global/Types';


const PatchAnnotation = async (annotationRecord: AnnotationTemplate, annotationId: string, token?: string) => {
    if (annotationRecord && token) {
        let annotation = <Annotation>{};

        const endPoint = `/annotations/${annotationId}`;

        await axios({
            method: "patch",
            url: endPoint,
            data: annotationRecord,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((result) => {
            /* Set Annotation with Model */
            const data: JSONResult = result.data;

            annotation = AnnotationModel(data.data);
        }).catch((error) => {
            console.warn(error);
        });

        return annotation;
    }
}

export default PatchAnnotation;
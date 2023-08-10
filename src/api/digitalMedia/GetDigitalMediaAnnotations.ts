/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import AnnotationModel from 'api/model/AnnotationModel';

/* Import Types */
import { DigitalMediaAnnotations, Annotation, JSONResultArray } from 'global/Types';


const GetDigitalMediaAnnotations = async (handle: string) => {
    let digitalMediaAnnotations = { observation: [] } as DigitalMediaAnnotations;

    if (handle) {
        const endPoint = `specimens/${handle}/annotations`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json',
            });

            /* Set Digital Media Annotations with Model */
            const data: JSONResultArray = result.data;
            const annotations: Annotation[] = [];

            data.data.forEach((dataRow) => {
                const annotation = AnnotationModel(dataRow);

                annotations.push(annotation);
            });

            /* Refactor Annotations object */
            annotations.forEach((annotation) => {
                if (digitalMediaAnnotations[annotation.target.indvProp]) {
                    digitalMediaAnnotations[annotation.target.indvProp].push(annotation);
                } else {
                    digitalMediaAnnotations[annotation.target.indvProp] = [annotation];
                }

                if (annotation.body.values) {
                    annotation.body.values.forEach((observationAnnotation: object) => {
                        digitalMediaAnnotations.observation.push({ ...observationAnnotation, creator: annotation.creator });
                    });
                }
            });
        } catch (error) {
            console.warn(error);
        }
    }

    return digitalMediaAnnotations;
}

export default GetDigitalMediaAnnotations;
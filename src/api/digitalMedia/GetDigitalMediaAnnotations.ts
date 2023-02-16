/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalMediaAnnotations, Annotation } from 'global/Types';


const GetDigitalMediaAnnotations = async (handle: string) => {
    if (handle) {
        let digitalMediaAnnotations = <DigitalMediaAnnotations>{ observation: [] };

        const endPoint = `specimens/${handle}/annotations`;

        await axios({
            method: "get",
            url: endPoint,
            responseType: 'json',
        }).then((result) => {
            const annotations: Annotation[] = result.data;

            /* Refactor Annotations object */
            annotations.forEach((annotation) => {
                /* Check if property is present */
                if (annotation.target.indvProp) {
                    if (digitalMediaAnnotations[annotation.target.indvProp]) {
                        digitalMediaAnnotations[annotation.target.indvProp].push(annotation);
                    } else {
                        digitalMediaAnnotations[annotation.target.indvProp] = [annotation];
                    }
                } else if (annotation.body.values) {
                    annotation.body.values.forEach((observationAnnotation: object) => {
                        digitalMediaAnnotations.observation.push({ ...observationAnnotation, creator: annotation.creator });
                    });
                }
            });
        }).catch((error) => {
            console.warn(error);
        });

        return digitalMediaAnnotations;
    }
}

export default GetDigitalMediaAnnotations;
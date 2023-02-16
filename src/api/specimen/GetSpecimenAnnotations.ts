/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { SpecimenAnnotations, Annotation } from 'global/Types';


const GetSpecimenAnnotations = async (handle: string) => {
    if (handle) {
        let specimenAnnotations = <SpecimenAnnotations>{};

        const endPoint = `specimens/${handle}/annotations`;

        await axios({
            method: "get",
            url: endPoint,
            responseType: 'json',
        }).then((result) => {
            const annotations: Annotation[] = result.data;

            /* Refactor Annotations object */
            annotations.forEach((annotation) => {
                if (specimenAnnotations[annotation.target.indvProp]) {
                    specimenAnnotations[annotation.target.indvProp].push(annotation);
                } else {
                    specimenAnnotations[annotation.target.indvProp] = [annotation];
                }
            });
        }).catch((error) => {
            console.warn(error);
        });

        return specimenAnnotations;
    }
}

export default GetSpecimenAnnotations;
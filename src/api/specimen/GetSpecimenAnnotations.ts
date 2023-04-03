/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import AnnotationModel from 'api/model/AnnotationModel';

/* Import Types */
import { SpecimenAnnotations, Annotation, JSONResultArray } from 'global/Types';


const GetSpecimenAnnotations = async (handle: string) => {
    if (handle) {
        let specimenAnnotations = <SpecimenAnnotations>{};

        const endPoint = `specimens/${handle}/annotations`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json',
            });

            /* Set Specimen Annotations with Model */
            const data: JSONResultArray = result.data;
            const annotations = <Annotation[]>[];

            data.data.forEach((dataRow) => {
                const annotation = AnnotationModel(dataRow);

                annotations.push(annotation);
            });

            /* Refactor Annotations object */
            annotations.forEach((annotation) => {
                if (specimenAnnotations[annotation.target.indvProp]) {
                    specimenAnnotations[annotation.target.indvProp].push(annotation);
                } else {
                    specimenAnnotations[annotation.target.indvProp] = [annotation];
                }
            });
        } catch (error) {
            console.warn(error);
        }

        return specimenAnnotations;
    }
}

export default GetSpecimenAnnotations;
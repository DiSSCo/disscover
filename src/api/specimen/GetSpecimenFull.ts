/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { Specimen, SpecimenDigitalMedia, Annotation, SpecimenAnnotations, JSONResult } from 'global/Types';


const GetSpecimenFull = async (handle: string) => {
    if (handle) {
        let specimen = <Specimen>{};
        let specimenDigitalMedia = <SpecimenDigitalMedia[]>[];
        let specimenAnnotations = <SpecimenAnnotations>{};

        let endPoint = `specimens/${handle}/full`;

        await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        }).then((result) => {
            /* Set Specimen with Model */
            const data: JSONResult = result.data;

            specimen = data.data.attributes.digitalSpecimen;

            /* Set Specimen Digital Media */
            specimenDigitalMedia = data.data.attributes.digitalMediaObjects;

            /* Set Specimen Annotations with Model */
            const annotations: Annotation[] = data.data.attributes.annotations;

            /* Refactor Annotations for Specimen Page */
            if (annotations) {
                annotations.forEach((annotation) => {
                    if (specimenAnnotations[annotation.target.indvProp]) {
                        specimenAnnotations[annotation.target.indvProp].push(annotation);
                    } else {
                        specimenAnnotations[annotation.target.indvProp] = [annotation];
                    }
                });
            }
        }).catch((error) => {
            console.warn(error);
        });

        return { specimen: specimen, digitalMedia: specimenDigitalMedia, annotations: specimenAnnotations };
    }
}

export default GetSpecimenFull;
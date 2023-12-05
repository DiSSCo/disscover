/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalSpecimen as DigitalSpecimenObject, DigitalMedia, SpecimenAnnotations, JSONResult } from 'app/Types';
import { Annotation } from 'app/types/Annotation';
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';


const GetSpecimenFull = async (handle: string) => {
    if (handle) {
        let specimen = {} as DigitalSpecimenObject;
        let specimenDigitalMedia = [] as DigitalMedia[];
        let specimenAnnotations = {} as SpecimenAnnotations;

        let endPoint = `specimens/${handle}/full`;

        await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        }).then((result) => {
            /* Set Specimen with Model */
            const data: JSONResult = result.data;

            specimen = {
                digitalSpecimen: data.data.attributes.digitalSpecimen as DigitalSpecimen,
                originalData: data.data.attributes.originalData ?? {}
            }

            /* Set Specimen Digital Media */
            if (data.data.attributes.digitalMediaObjects) {
                data.data.attributes.digitalMediaObjects.forEach((digitalMediaObject) => {
                    specimenDigitalMedia.push({
                        digitalEntity: digitalMediaObject.digitalMediaObject.digitalEntity,
                        originalData: digitalMediaObject.digitalMediaObject.originalData
                    });
                });
            }

            /* Set Specimen Annotations with Model */
            const annotations: Annotation[] = data.data.attributes.annotations as Annotation[];

            /* Refactor Annotations for Specimen Page */
            if (annotations) {
                annotations.forEach((annotation) => {
                    const annotationIndicator: string = annotation['oa:target']['oa:selector']?.['ods:field'] as string
                        ?? annotation['oa:target']['oa:selector']?.['oa:class'] as string;

                    if (specimenAnnotations[annotation['oa:target']['oa:selector']?.[annotationIndicator] as string]) {
                        specimenAnnotations[annotationIndicator.replace('$./', '')].push(annotation);
                    } else {
                        specimenAnnotations[annotationIndicator.replace('$./', '')] = [annotation];
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
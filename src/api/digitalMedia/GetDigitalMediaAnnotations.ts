/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalMediaAnnotations, JSONResultArray } from 'app/Types';
import { Annotation } from 'app/types/Annotation';


const GetDigitalMediaAnnotations = async (handle: string) => {
    let digitalMediaAnnotations = { visual: [] } as DigitalMediaAnnotations;

    if (handle) {
        const endPoint = `digitalmedia/${handle}/annotations`;

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
                annotations.push(dataRow.attributes as Annotation);
            });

            /* Refactor Annotations object */
            annotations.forEach((annotation) => {
                if (annotation['oa:target']['oa:selector']?.['ac:hasRoi']) {
                    digitalMediaAnnotations.visual.push(annotation);
                } else if (digitalMediaAnnotations[annotation['oa:target']['oa:selector']?.['ods:field'] as string]) {
                    digitalMediaAnnotations[annotation['oa:target']['oa:selector']?.['ods:field'] as string].push(annotation);
                } else {
                    digitalMediaAnnotations[annotation['oa:target']['oa:selector']?.['ods:field'] as string] = [annotation];
                } 
            });
        } catch (error) {
            console.warn(error);
        }
    }

    return digitalMediaAnnotations;
}

export default GetDigitalMediaAnnotations;
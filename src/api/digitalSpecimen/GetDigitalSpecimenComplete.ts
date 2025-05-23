/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, FullDigitalSpecimenResult } from 'app/Types';
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { Annotation } from 'app/types/Annotation';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';
import { DigitalMedia } from 'app/types/DigitalMedia';

const GetDigitalSpecimenComplete = async({ handle, version } : { handle: string, version?: number }) => {
    /* Declare necessary variables and types */
    let fullDigitalSpecimen: FullDigitalSpecimenResult | undefined;
    let digitalSpecimen: DigitalSpecimen | undefined;
    let digitalMedia: DigitalMedia[] = [];
    let digitalSpecimenAnnotations: Annotation[] = [];

    if (handle) {
        let endPoint: string;

        if (version) {
            endPoint = `digital-specimen/v1/${handle}/${version}/full`;
        } else {
            endPoint = `digital-specimen/v1/${handle}/full`;
        }

        try {
            const result = await axios({
                method: 'get',
                url: endPoint,
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: JSONResult = result.data;

            /* Set Digital Specimen Complete */
            digitalSpecimen = data.data.attributes.digitalSpecimen;

            /* Add digitalMedia to new array */
            const digitalMediaData = data.data.attributes.digitalMedia as Array<{digitalMediaObject: DigitalMedia }> | undefined;

            digitalMediaData?.forEach((digitalMediaItem) => {
                digitalMedia.push(digitalMediaItem.digitalMediaObject);
            })

            /* Add annotations to new variable */
            const annotationData = data.data.attributes.annotations as Annotation[] | undefined;
            
            annotationData?.forEach((annotationItem) => {
                digitalSpecimenAnnotations.push(annotationItem);
            });

            /* Push components into fullDigitalSpecimen*/
            fullDigitalSpecimen = {
                digitalSpecimen,
                digitalMedia,
                annotations: digitalSpecimenAnnotations
            }

        } catch (error: any) {
            throw(NotFoundException('Digital Specimen', error.request.responseURL));
        };
    }
    return fullDigitalSpecimen;
}

export default GetDigitalSpecimenComplete;
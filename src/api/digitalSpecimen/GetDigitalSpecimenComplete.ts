/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, DigitalSpecimenCompleteResult } from 'app/Types';
import { Annotation } from 'app/types/Annotation';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';
import { DigitalMedia } from 'app/types/DigitalMedia';

const GetDigitalSpecimenComplete = async({ handle, version } : { handle: string, version?: number }) => {
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
            const digitalSpecimen = data.data.attributes.digitalSpecimen;

            /* Add digitalMedia to new variable */
            const digitalMedia = (
                data.data.attributes.digitalMedia as Array<{digitalMediaObject: DigitalMedia, annotations: Annotation[] }> | undefined
            )?.map((digitalMediaItem) => digitalMediaItem) ?? [];

            /* Add annotations to new variable */
            const digitalSpecimenAnnotations = (
                data.data.attributes.annotations
            )?.map((annotation) => annotation) ?? [];

            /* Return object with digitalSpecimen, digitalMedia and annotations*/
            return {
                digitalSpecimen,
                digitalMedia,
                annotations: digitalSpecimenAnnotations
            } as DigitalSpecimenCompleteResult;

        } catch (error: any) {
            throw(NotFoundException('Digital Specimen', error.request.responseURL));
        };
    }
}

export default GetDigitalSpecimenComplete;
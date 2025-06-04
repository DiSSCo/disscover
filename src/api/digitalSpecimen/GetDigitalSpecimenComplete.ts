/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, DigitalSpecimenCompleteResult } from 'app/Types';
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { Annotation } from 'app/types/Annotation';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';
import { DigitalMedia } from 'app/types/DigitalMedia';

const GetDigitalSpecimenComplete = async({ handle, version } : { handle: string, version?: number }) => {
    /* Declare necessary variables and types */
    let completeDigitalSpecimen: DigitalSpecimenCompleteResult | undefined;

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
            const digitalSpecimen = data.data.attributes.digitalSpecimen as DigitalSpecimen | undefined;;

            /* Add digitalMedia to new array */
            const digitalMedia = (
                data.data.attributes.digitalMedia as Array<{digitalMediaObject: DigitalMedia, annotations: Annotation[] }> | undefined
            )?.map((digitalMediaItem) => digitalMediaItem) ?? [];

            /* Add annotations to new variable */
            const digitalSpecimenAnnotations = (
                data.data.attributes.annotations as Annotation[] | undefined
            )?.map((annotation) => annotation) ?? [];

            /* Push components into completeDigitalSpecimen*/
            return completeDigitalSpecimen = {
                digitalSpecimen,
                digitalMedia,
                annotations: digitalSpecimenAnnotations
            }

        } catch (error: any) {
            throw(NotFoundException('Digital Specimen', error.request.responseURL));
        };
    }
    return completeDigitalSpecimen;
}

export default GetDigitalSpecimenComplete;
/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, FullDigitalSpecimenResult } from 'app/Types';
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { Annotation } from 'app/types/Annotation';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';
import { DigitalMedia } from 'app/types/DigitalMedia';

const GetCompleteDigitalSpecimen = async({ handle, version } : { handle: string, version?: number }) => {
    /* Declare necessary variables and types */
    let fullDigitalSpecimen: FullDigitalSpecimenResult | undefined;
    let digitalSpecimen: DigitalSpecimen | undefined;
    let digitalMedia: Array<{ digitalMedia: DigitalMedia[], annotations: Annotation[] }> | undefined;
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

            console.log('data', result.data.data.attributes);

            /* Set Digital Specimen Complete */
            digitalSpecimen = data.data.attributes.digitalSpecimen;

            /* Add digitalMedia to new array */
            digitalMedia = (
                data.data.attributes.digitalMedia as Array<{digitalMedia: DigitalMedia[], annotations: Annotation[] }> | undefined
            )?.map((digitalMediaItem) => digitalMediaItem) ?? [];

            /* Add annotations to new variable */
            digitalSpecimenAnnotations = (
                data.data.attributes.annotations as Annotation[] | undefined
            )?.map((annotation) => annotation) ?? [];

            /* Push components into fullDigitalSpecimen*/
            fullDigitalSpecimen = {
                digitalSpecimen,
                digitalMedia,
                annotations: digitalSpecimenAnnotations
            }
            console.log('fullDigitalSpecimen', fullDigitalSpecimen);

        } catch (error: any) {
            throw(NotFoundException('Digital Specimen', error.request.responseURL));
        };
    }
    return fullDigitalSpecimen;
}

export default GetCompleteDigitalSpecimen;
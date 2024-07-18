/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalSpecimen, JSONResult } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';


/**
 * Function for fetching a digital specimen
 * @param handle The identifier of the digital specimen
 * @param version The version of the digital specimen
 * @returns Object of Digital Specimen
 */
const GetDigitalSpecimen = async({ handle, version } : { handle: string, version?: number }) => {
    let digitalSpecimen: DigitalSpecimen | undefined;

    if (handle) {
        let endPoint: string;

        if (version) {
            endPoint = `digital-specimen/${handle}/${version}`;
        } else {
            endPoint = `digital-specimen/${handle}`;
        };

        try {
            const result = await axios({
                method: 'get',
                url: endPoint,
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: JSONResult = result.data;

            /* Set Digital Specimen */
            digitalSpecimen = data.data.attributes as DigitalSpecimen;
        } catch (error: any) {
            throw(NotFoundException('Digital Specimen', error.request.responseURL));
        };
    };

    return digitalSpecimen;
}

export default GetDigitalSpecimen;
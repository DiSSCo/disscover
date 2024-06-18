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
 * @returns 
 */
const GetDigitalSpecimen = async({ handle, version } : { handle: string, version?: number }) => {
    let specimen = {} as DigitalSpecimen;

    if (handle) {
        let endPoint: string;

        if (version) {
            endPoint = `specimens/${handle}/${version}`;
        } else {
            endPoint = `specimens/${handle}`;
        }

        try {
            const result = await axios({
                method: 'get',
                url: endPoint,
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: JSONResult = result.data;

            /* Set Digital Specimen */
            specimen = data.data.attributes as DigitalSpecimen;
        } catch (error: any) {
            throw(NotFoundException('Digital Specimen', error.request.responseURL));
        }
    }

    return specimen;
}

export default GetDigitalSpecimen;
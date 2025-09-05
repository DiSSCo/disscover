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
            console.log(data);

        } catch (error: any) {
            throw(NotFoundException('Digital Specimen', error.request.responseURL));
        };
    }
}

export default GetDigitalSpecimenComplete;
/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';
import { JSONResult } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';


/**
 * Function for fetching a digital media item
 * @param handle The identifier of the digital media item
 * @param version The version of the digital media item
 * @returns Object of Digital Media
 */
const GetDigitalMedia = async({ handle, version } : { handle: string, version?: number }) => {
    let digitalMedia: DigitalMedia | undefined;

    if (handle) {
        try {
            const result = await axios({
                method: 'get',
                url: `digital-media/${handle}${version ? '/' + version : ''}`,
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: JSONResult = result.data;

            /* Set Digital Specimen */
            digitalMedia = data.data.attributes as DigitalMedia;
        } catch (error: any) {
            throw(NotFoundException('Digital Media', error.request.responseURL));
        };
    }

    return digitalMedia;
};

export default GetDigitalMedia;
/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';
import { JSONResultArray } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';


/**
 * Function for fetching a digital specimen's associated digital media
 * @param handle The identifier of the digital specimen
 * @returns Array of Digital Media objects
 */
const GetDigitalSpecimenDigitalMedia = async({ handle } : { handle: string }) => {
    let digitalSpecimenDigitalMedia: DigitalMedia[] = [];

    if (handle) {
        try {
            const result = await axios({
                method: 'get',
                url: `digital-specimen/${handle}/digital-media`,
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: JSONResultArray = result.data;

            /* Set Digital Specimen Digital Media items */
            data.data.forEach((dataRow) => {
                digitalSpecimenDigitalMedia.push(dataRow.attributes as DigitalMedia);
            });
        } catch (error: any) {
            throw(NotFoundException('Digital Specimen Digital Media', error.request.responseURL));
        };
    };

    return digitalSpecimenDigitalMedia;
};

export default GetDigitalSpecimenDigitalMedia;
/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { Annotation } from 'app/types/Annotation';
import { JSONResultArray } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';


/**
 * Function for fetching a digital media item's annotations
 * @param handle The identifier of the digital media item
 * @returns Array of Annotations
 */
const GetDigitalMediaAnnotations = async({ handle } : { handle: string }) => {
    const digitalMediaAnnotations: Annotation[] = [];

    if (handle) {
        try {
            const result = await axios({
                method: 'get',
                url: `digital-media/v1/${handle}/annotations`,
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: JSONResultArray = result.data;

            /* Set Digital Specimen Annotation items */
            data.data.forEach((dataRow) => {
                digitalMediaAnnotations.push(dataRow.attributes as Annotation);
            });
        } catch (error: any) {
            throw(NotFoundException('Digital Media Annotations', error.request.responseURL));
        };
    };

    return digitalMediaAnnotations;
};

export default GetDigitalMediaAnnotations;
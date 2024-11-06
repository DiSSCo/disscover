/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { Annotation } from 'app/types/Annotation';
import { JSONResultArray } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';


/**
 * Function for fetching a digital specimen's annotations
 * @param handle The identifier of the digital specimen
 * @returns Array of Annotations
 */
const GetDigitalSpecimenAnnotations = async({ handle } : { handle: string }) => {
    let digitalSpecimenAnnotations: Annotation[] = [];

    if (handle) {
        try {
            const result = await axios({
                method: 'get',
                url: `digital-specimen/${handle}/annotations`,
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: JSONResultArray = result.data;

            /* Set Digital Specimen Annotation items */
            data.data.forEach(dataRow => {
                digitalSpecimenAnnotations.push(dataRow.attributes as Annotation);
            });
        } catch (error: any) {
            throw(NotFoundException('Digital Specimen Annotations', error.request.responseURL));
        };
    };

    return digitalSpecimenAnnotations;
};

export default GetDigitalSpecimenAnnotations;
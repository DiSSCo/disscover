/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';
import { JSONResultArray, Dict } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';


/**
 * Function for fetching a digital specimen's potential MASs to be run
 * @param handle The identifier of the digital specimen
 * @returns List of 
 */
const GetDigitalSpecimenMASs = async ({ handle }: { handle: string }) => {
    const digitalSpecimenMASs: MachineAnnotationService[] = [];

    if (handle) {
        const endPoint: string = `/digital-specimen/${handle}/mas`;

        try {
            const result = await axios({
                method: 'get',
                url: endPoint,
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: JSONResultArray = result.data;

            /* Set MASs */
            data.data.forEach((dataRow: Dict) => {
                digitalSpecimenMASs.push(dataRow.attributes);
            });
        } catch (error: any) {
            throw (NotFoundException('Digital Specimen MASs', error.request.responseURL));
        };
    };

    return digitalSpecimenMASs;
};

export default GetDigitalSpecimenMASs;
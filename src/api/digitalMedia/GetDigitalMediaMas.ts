/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';
import { JSONResultArray, Dict } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';


/**
 * Function for fetching a digital media item's potential MASs to be run
 * @param handle The identifier of the digital media item
 * @returns List of 
 */
const GetDigitalMediaMas = async ({ handle }: { handle: string }) => {
    const digitalMediaMas: MachineAnnotationService[] = [];

    if (handle) {
        const endPoint: string = `/digital-media/${handle}/mas`;

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
                digitalMediaMas.push(dataRow.attributes);
            });
        } catch (error: any) {
            throw (NotFoundException('Digital Media MASs', error.request.responseURL));
        };
    };

    return digitalMediaMas;
};

export default GetDigitalMediaMas;
/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, Dict } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';


/**
 * Function for fetching the digital specimen disciplines
 * @returns Object containing the digital specimen disciplines and associated metadata
 */
const GetDigitalSpecimenDisciplines = async () => {
    const returnData: { disciplines?: Dict, metadata?: Dict } = {};

    try {
        const result = await axios({
            method: 'get',
            url: '/digital-specimen/discipline',
            responseType: 'json'
        });

        /* Set return data */
        const data: JSONResult = result.data;

        returnData.disciplines = data.data.attributes;

        if (data.meta) {
            returnData.metadata = data.meta;
        }
    } catch (error: any) {
        /* Throw error */
        throw(NotFoundException('Digital Specimen Disciplines', error.request.responseURL));
    }

    return returnData;
}

export default GetDigitalSpecimenDisciplines;
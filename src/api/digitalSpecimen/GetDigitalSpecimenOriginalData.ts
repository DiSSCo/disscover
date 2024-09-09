/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, Dict } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';


/**
 * Function for fetching the digital specimen original data
 * @param digitalSpecimenId The identifier of the digital specimen
 * @returns Dictionary containing the digital specimen original data
 */
const GetDigitalSpecimenOriginalData = async ({ digitalSpecimenId }: { digitalSpecimenId: string }) => {
    let originalData: Dict | undefined;

    try {
        const result = await axios({
            method: 'get',
            url: `/digital-specimen/${digitalSpecimenId}/original-data`,
            responseType: 'json'
        });

        /* Set return data */
        const data: JSONResult = result.data;

        originalData = data.data.attributes;
    } catch (error: any) {
        /* Throw error */
        throw (NotFoundException('Digital Specimen Original Data', error.request.responseURL));
    };

    return originalData;
};

export default GetDigitalSpecimenOriginalData;
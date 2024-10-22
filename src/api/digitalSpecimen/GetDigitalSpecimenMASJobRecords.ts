/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, Dict } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';


/**
 * Function for fetching a digital specimen's machine annotation service (MAS) job records
 * @param handle The identifier of the digital specimen
 * @param version The version of the digital specimen
 * @returns Object of Digital Specimen
 */
const GetDigitalSpecimenMASJobRecords = async ({ handle, pageSize, pageNumber, state }: { handle: string, pageSize?: number, pageNumber: number, state?: string }) => {
    let returnData: {
        MASJobRecords: Dict[],
        links?: Dict
    } = {
        MASJobRecords: []
    };

    if (handle) {
        const endPoint: string = `/digital-specimen/${handle}/mjr`;

        try {
            const result = await axios({
                method: 'get',
                url: endPoint,
                params: {
                    pageSize: pageSize,
                    pageNumber: pageNumber ?? 1,
                    ...(state && { state })
                },
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: JSONResult = result.data;

            /* Set return data */
            returnData.MASJobRecords = data.data.attributes as Dict[];
            returnData.links = data.links;
        } catch (error: any) {
            console.error(NotFoundException('Digital Specimen MAS Job Records', error.request.responseURL));
        };
    };

    return returnData;
}

export default GetDigitalSpecimenMASJobRecords;
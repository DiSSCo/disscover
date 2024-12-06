/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { MasJobRecord, JSONResultArray, Dict } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';


/**
 * Function for fetching a digital media item's machine annotation service (MAS) job records
 * @param handle The identifier of the digital media item
 * @param version The version of the digital media item
 * @returns Array of Machine Job Records
 */
const GetDigitalMediaMasJobRecords = async ({ handle, pageSize, pageNumber, state }: { handle: string, pageSize?: number, pageNumber: number, state?: string }) => {
    let returnData: {
        masJobRecords: MasJobRecord[],
        links?: Dict
    } = {
        masJobRecords: []
    };

    if (handle) {
        const endPoint: string = `/digital-media/${handle.replace(import.meta.env.VITE_DOI_URL, '')}/mjr`;

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
            const data: JSONResultArray = result.data;

            data.data.forEach(dataFragment => {
                returnData.masJobRecords.push(dataFragment.attributes as MasJobRecord);
            });

            /* Set return data */
            returnData.links = data.links;
        } catch (error: any) {
            console.error(NotFoundException('Digital Media MAS Job Records', error.request.responseURL));
        };
    };

    return returnData;
};

export default GetDigitalMediaMasJobRecords;
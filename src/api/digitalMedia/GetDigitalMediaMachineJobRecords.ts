/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResultArray, Dict } from 'app/Types';


const GetDigitalMediaMachineJobRecords = async (handle: string, pageSize: number, pageNumber: number) => {
    let digitalMediaMachineJobRecords: Dict[] = [];
    let links: Dict = {};

    if (handle) {
        const endPoint: string = `/digitalmedia/${handle}/mjr`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json',
                params: {
                    pageSize: pageSize,
                    pageNumber: pageNumber ?? 1
                }
            });

            /* Set DigitalMedia Machine Job Records */
            const data: JSONResultArray = result.data;

            digitalMediaMachineJobRecords = data.data;
            links = data.links;
        } catch (error) {
            console.warn(error);
        }
    }

    return {
        machineJobRecords: digitalMediaMachineJobRecords,
        links: links
    };
}

export default GetDigitalMediaMachineJobRecords;
/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResultArray, Dict } from 'app/Types';


const GetSpecimenMachineJobRecords = async (handle: string, pageSize: number, pageNumber: number) => {
    let specimenMachineJobRecords: Dict[] = [];
    let links: Dict = {};

    if (handle) {
        const endPoint: string = `/specimens/${handle}/mjr`;

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

            /* Set Specimen Machine Job Records */
            const data: JSONResultArray = result.data;

            specimenMachineJobRecords = data.data;
            links = data.links;
        } catch (error) {
            console.warn(error);
        }
    }

    return {
        machineJobRecords: specimenMachineJobRecords,
        links: links
    };
}

export default GetSpecimenMachineJobRecords;
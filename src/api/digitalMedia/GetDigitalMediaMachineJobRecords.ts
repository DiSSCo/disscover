/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResultArray, Dict } from 'app/Types';


const GetDigitalMediaMachineJobRecords = async (handle: string) => {
    let specimenMachineJobRecords: Dict[] = [];

    if (handle) {
        const endPoint: string = `/digitalmedia/${handle}/mjr`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json'
            });

            /* Set Specimen Machine Job Records */
            const data: JSONResultArray = result.data;

            specimenMachineJobRecords = data.data;
        } catch (error) {
            console.warn(error);
        }
    }

    return specimenMachineJobRecords;
}

export default GetDigitalMediaMachineJobRecords;
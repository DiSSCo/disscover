/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResultArray, Dict } from 'global/Types';


const ScheduleSpecimenMAS = async (handle: string, MASRequest: Dict, token?: string) => {
    let specimenMAS: Dict[] = [];

    if (handle && token) {
        const endPoint: string = `/specimens/${handle.replace('https://hdl.handle.net/', '')}/mas`;

        try {
            const result = await axios({
                method: "post",
                url: endPoint,
                data: MASRequest,
                responseType: 'json',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            /* Set Specimen MAS */
            const data: JSONResultArray = result.data;

            specimenMAS = data.data;
        } catch (error) {
            console.warn(error);
        }
    }

    return specimenMAS;
}

export default ScheduleSpecimenMAS;
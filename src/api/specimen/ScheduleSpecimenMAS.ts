/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, Dict } from 'app/Types';


const ScheduleSpecimenMAS = async (handle: string, MASRequest: Dict, batching: boolean = false, token?: string) => {
    let specimenMAS: Dict = {};

    if (handle && token) {
        const endPoint: string = `/specimens/${handle.replace(process.env.REACT_APP_DOI_URL as string, '')}/mas`;

        try {
            const result = await axios({
                method: "post",
                url: endPoint,
                data: MASRequest,
                responseType: 'json',
                params: {
                    batching: batching
                },
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            /* Set Specimen MAS */
            const data: JSONResult = result.data;

            specimenMAS = data.data.attributes;
        } catch (error) {
            console.warn(error);
        }
    }

    return specimenMAS;
}

export default ScheduleSpecimenMAS;
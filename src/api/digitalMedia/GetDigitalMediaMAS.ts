/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResultArray, Dict } from 'global/Types';


const GetDigitalMediaMAS = async (handle: string) => {
    let digitalMediaMAS: Dict[] = [];

    if (handle) {
        const endPoint: string = `/digitalmedia/${handle}/mas`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json'
            });

            /* Set Digital Media MAS */
            const data: JSONResultArray = result.data;

            digitalMediaMAS = data.data;
        } catch (error) {
            console.warn(error);
        }
    }

    return digitalMediaMAS;
}

export default GetDigitalMediaMAS;
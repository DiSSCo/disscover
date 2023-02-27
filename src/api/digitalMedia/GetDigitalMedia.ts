/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalMedia } from 'global/Types';


const GetDigitalMedia = async (handle: string) => {
    let digitalMedia = <DigitalMedia>{};

    const endPoint = `digitalmedia/${handle}`;

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        });

        digitalMedia = result.data;
    } catch (error) {
        console.warn(error);
    }

    return digitalMedia;
}

export default GetDigitalMedia;
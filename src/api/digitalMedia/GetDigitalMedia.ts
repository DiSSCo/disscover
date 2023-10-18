/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalMedia, JSONResult } from 'app/Types';


const GetDigitalMedia = async (handle: string, version?: string) => {
    let digitalMedia = {} as DigitalMedia;

    let endPoint = `digitalmedia/${handle}`;

    if (version) {
        endPoint = endPoint.concat(`/${version}`)
    }

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        });

        /* Set Digital Media with Model */
        const data: JSONResult = result.data;

        digitalMedia = data.data.attributes as DigitalMedia;
    } catch (error) {
        console.warn(error);
    }

    return digitalMedia;
}

export default GetDigitalMedia;
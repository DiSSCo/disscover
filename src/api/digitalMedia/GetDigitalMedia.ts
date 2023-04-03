/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import DigitalMediaModel from 'api/model/DigitalMediaModel';

/* Import Types */
import { DigitalMedia, JSONResult } from 'global/Types';


const GetDigitalMedia = async (handle: string) => {
    let digitalMedia = <DigitalMedia>{};

    const endPoint = `digitalmedia/${handle}`;

    await axios({
        method: "get",
        url: endPoint,
        responseType: 'json'
    }).then((result) => {
        /* Set Digital Media with Model */
        const data = result.data;

        digitalMedia = DigitalMediaModel(data.data);
    }).catch((error) => {
        console.warn(error);
    });

    return digitalMedia;
}

export default GetDigitalMedia;
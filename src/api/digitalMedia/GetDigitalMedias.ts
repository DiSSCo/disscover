/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalMedia } from 'global/Types';


const GetDigitalMedias = async () => {
    let digitalMedias = <DigitalMedia[]>[];

    const endPoint = `digitalmedia`;

    await axios({
        method: "get",
        url: endPoint,
        params: {
            pageSize: 17
        },
        responseType: 'json'
    }).then((result) => {
        digitalMedias = result.data;
    }).catch((error) => {
        console.warn(error);
    });

    return digitalMedias;
}

export default GetDigitalMedias;
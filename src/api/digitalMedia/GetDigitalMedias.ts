/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import DigitalMediaModel from 'api/model/DigitalMediaModel';

/* Import Types */
import { DigitalMedia, JSONResultArray } from 'global/Types';


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
        /* Set Digital Medias with Model */
        const data: JSONResultArray = result.data;

        data.data.forEach((dataRow) => {
            const digitalMedia = DigitalMediaModel(dataRow);

            digitalMedias.push(digitalMedia);
        });
    }).catch((error) => {
        console.warn(error);
    });

    return digitalMedias;
}

export default GetDigitalMedias;
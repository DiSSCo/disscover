/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalMedia, JSONResultArray } from 'app/Types';


const GetDigitalMedias = async () => {
    let digitalMedias = [] as DigitalMedia[];

    const endPoint = `digitalmedia`;

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            params: {
                pageSize: 17
            },
            responseType: 'json'
        });

        /* Set Digital Medias with Model */
        const data: JSONResultArray = result.data;

        data.data.forEach((dataRow) => {
            digitalMedias.push(dataRow.attributes as DigitalMedia);
        });
    } catch (error) {
        console.warn(error);
    }

    return digitalMedias;
}

export default GetDigitalMedias;
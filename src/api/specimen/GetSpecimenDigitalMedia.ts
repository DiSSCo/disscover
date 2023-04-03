/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import DigitalMediaModel from 'api/model/DigitalMediaModel';

/* Import Types */
import { DigitalMedia, JSONResultArray } from 'global/Types';


const GetSpecimenDigitalMedia = async (handle: string) => {
    if (handle) {
        let specimenDigitalMedia = <DigitalMedia[]>[];

        const endPoint = `specimens/${handle}/digitalmedia`;

        await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        }).then((result) => {
            /* Set Specimen Digital Media with Model */
            const data: JSONResultArray = result.data;

            data.data.forEach((dataRow) => {
                const digitalMedia = DigitalMediaModel(dataRow);

                specimenDigitalMedia.push(digitalMedia);
            });
        }).catch((error) => {
            console.warn(error);
        });

        return specimenDigitalMedia;
    }
}

export default GetSpecimenDigitalMedia;
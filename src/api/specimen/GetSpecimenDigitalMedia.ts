/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalMedia, JSONResultArray } from 'app/Types';


const GetSpecimenDigitalMedia = async (handle: string) => {
    if (handle) {
        let specimenDigitalMedia = [] as DigitalMedia[];

        const endPoint = `specimens/${handle}/digitalmedia`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json'
            });

            /* Set Specimen Digital Media with Model */
            const data: JSONResultArray = result.data;

            data.data.forEach((dataRow) => {
                specimenDigitalMedia.push(dataRow.attributes as DigitalMedia);
            });
        } catch (error) {
            console.warn(error);
        }

        return specimenDigitalMedia;
    }
}

export default GetSpecimenDigitalMedia;
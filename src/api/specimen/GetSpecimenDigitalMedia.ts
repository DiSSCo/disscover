/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalMedia } from 'global/Types';


const GetSpecimenDigitalMedia = async (handle: string) => {
    if (handle) {
        let specimenDigitalMedia = <DigitalMedia[]>[];

        const endPoint = `specimens/${handle}/digitalmedia`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json'
            });

            specimenDigitalMedia = result.data;
        } catch (error) {
            console.warn(error);
        }

        return specimenDigitalMedia;
    }
}

export default GetSpecimenDigitalMedia;
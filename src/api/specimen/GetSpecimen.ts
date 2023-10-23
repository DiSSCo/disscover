/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalSpecimen, JSONResult } from 'app/Types';


const GetSpecimen = async (handle: string, version?: string) => {
    let specimen = {} as DigitalSpecimen;

    if (handle) {
        let endPoint: string;

        if (version) {
            endPoint = `specimens/${handle}/${version}`;
        } else {
            endPoint = `specimens/${handle}`;
        }

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: JSONResult = result.data;

            /* Set Digital Specimen */
            specimen = data.data.attributes as DigitalSpecimen;
        } catch (error) {
            console.warn(error);
        }
    }

    return specimen;
}

export default GetSpecimen;
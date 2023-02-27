/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { Specimen } from 'global/Types';


const GetSpecimen = async (handle: string, version?: number) => {
    if (handle) {
        let specimen = <Specimen>{};

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

            specimen = result.data;
        } catch (error) {
            console.warn(error);
        }

        return specimen;
    }
}

export default GetSpecimen;
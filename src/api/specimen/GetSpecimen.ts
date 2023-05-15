/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import SpecimenModel from 'api/model/SpecimenModel';

/* Import Types */
import { Specimen, JSONResult } from 'global/Types';


const GetSpecimen = async (handle: string, version?: string) => {
    let specimen = {} as Specimen;

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

            /* Set Specimen with Model */
            const data: JSONResult = result.data;

            specimen = SpecimenModel(data.data);
        } catch (error) {
            console.warn(error);
        }
    }

    return specimen;
}

export default GetSpecimen;
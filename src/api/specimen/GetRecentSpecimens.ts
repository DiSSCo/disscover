/* Import Dependencies */
import axios from "axios";

/* Import Model */
import SpecimenModel from "api/model/SpecimenModel";

/* Import Types */
import { Specimen, JSONResultArray } from "global/Types";


const GetRecentSpecimens = async () => {
    let recentSpecimens = <Specimen[]>[];

    const endPoint = "/specimens"

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            params: {
                pageSize: 25
            },
            responseType: 'json'
        });

        /* Set Recent Specimens with Model */
        const data: JSONResultArray = result.data;

        data.data.forEach((dataRow) => {
            const specimen = SpecimenModel(dataRow);

            recentSpecimens.push(specimen);
        });
    } catch (error) {
        console.warn(error);
    }

    return recentSpecimens;
}

export default GetRecentSpecimens;
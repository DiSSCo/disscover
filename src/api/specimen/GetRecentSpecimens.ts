/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import SpecimenModel from 'api/model/SpecimenModel';

/* Import Types */
import { Specimen, JSONResultArray, Dict } from 'global/Types';


const GetRecentSpecimens = async (pageSize: number, pageNumber?: number) => {
    let recentSpecimens = [] as Specimen[];
    let links: Dict = {};
    let totalRecords: number = 25;

    const endPoint = "/specimens"

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber ? pageNumber : 1
            },
            responseType: 'json'
        });

        /* Set Recent Specimens with Model */
        const data: JSONResultArray = result.data;
        links = data.links;

        data.data.forEach((dataRow) => {
            const specimen = SpecimenModel(dataRow);

            recentSpecimens.push(specimen);
        });
    } catch (error) {
        console.warn(error);
    }

    return {
        specimens: recentSpecimens,
        links: links,
        totalRecords: totalRecords
    };
}

export default GetRecentSpecimens;
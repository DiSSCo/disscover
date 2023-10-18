/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalSpecimen, JSONResultArray, Dict } from 'app/Types';


const GetRecentSpecimens = async (pageSize: number, pageNumber?: number) => {
    let recentSpecimens = [] as DigitalSpecimen[];
    let links: Dict = {};
    let meta: Dict = {};

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

        if (data.meta) {
            meta = data.meta;
        }

        data.data.forEach((dataRow) => {
            recentSpecimens.push(dataRow.attributes.digitalSpecimen as DigitalSpecimen);
        });
    } catch (error) {
        console.warn(error);
    }

    return {
        specimens: recentSpecimens,
        links: links,
        meta: meta
    };
}

export default GetRecentSpecimens;
/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import OrganisationModel from 'api/model/OrganisationModel';

/* Import Types */
import { Organisation, JSONResultArray } from 'global/Types';


const GetOrganisations = async () => {
    let organisations = [] as Organisation[];

    const endPoint = "/organisation/tuples"

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        });

        const data: JSONResultArray = result.data;

        data.data.forEach((dataRow) => {
            const organisation = OrganisationModel(dataRow);

            organisations.push(organisation);
        })
    } catch (error) {
        console.warn(error);
    }

    return organisations;
}

export default GetOrganisations;
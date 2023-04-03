/* Import Dependencies */
import axios from "axios";

/* Import Model */
import OrganisationModel from "api/model/OrganisationModel";

/* Import Types */
import { Organisation, JSONResultArray } from "global/Types";


const GetOrganisations = async () => {
    let organisations = <Organisation[]>[];

    const endPoint = "/organisation/tuples"

    await axios({
        method: "get",
        url: endPoint,
        responseType: 'json'
    }).then((result) => {
        /* Set Organisations with Model */
        const data: JSONResultArray = result.data;

        data.data.forEach((dataRow) => {
            const organisation = OrganisationModel(dataRow);

            organisations.push(organisation);
        })
    }).catch((error) => {
        console.warn(error);
    });

    return organisations;
}

export default GetOrganisations;
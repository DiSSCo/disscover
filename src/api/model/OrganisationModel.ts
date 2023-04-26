/* Import Types */
import { Organisation as OrganisationType, JSONResult } from 'global/Types';


/* User Model for API calls */
const OrganisationModel = (data: JSONResult['data']) => {
    const organisation: OrganisationType = {
        id: data.id,
        ror: data.attributes.ror,
        name: data.attributes.name
    }

    return organisation;
}

export default OrganisationModel;
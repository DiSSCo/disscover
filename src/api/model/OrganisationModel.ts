/* Import Types */
import { Organisation as OrganisationType, Dict } from 'app/Types';


/* User Model for API calls */
const OrganisationModel = (data: Dict) => {
    const organisation: OrganisationType = {
        id: data.id,
        ror: data.attributes.ror,
        name: data.attributes.name
    }

    return organisation;
}

export default OrganisationModel;
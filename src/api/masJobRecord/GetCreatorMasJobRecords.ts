/* Import Dependencies */
import axios from 'axios';
import KeycloakService from 'app/Keycloak';

/* Import Types */
import { MasJobRecord, JSONResultArray } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';


/**
 * Function for fetching a the logged in user's MAS job records
 * @returns Array of MAS job records
 */
const GetCreatorMasJobRecords = async () => {
    let creatorMasJobRecords: MasJobRecord[] = [];

    const token = KeycloakService.GetToken();

    if (token) {
        try {
            const result = await axios({
                method: 'get',
                url: `mjr/v1/creator/${encodeURIComponent(KeycloakService.GetParsedToken()?.orcid)}`,
                responseType: 'json',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            /* Get result data from JSON */
            const data: JSONResultArray = result.data;

            /* Set creator MAS job record items */
            data.data.forEach(dataRow => {
                creatorMasJobRecords.push(dataRow.attributes as MasJobRecord);
            });
        } catch (error: any) {
            throw (NotFoundException('Creator MAS job records', error.request.responseURL));
        };
    }

    return creatorMasJobRecords;
};

export default GetCreatorMasJobRecords;
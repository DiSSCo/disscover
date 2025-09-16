/* Import Dependencies */
import axios from 'axios';
import KeycloakService from 'app/Keycloak';

/* Import Types */
import { Annotation } from 'app/types/Annotation';
import { JSONResultArray } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';


/**
 * Function for fetching a the logged in user's annotations
 * @returns Array of Annotations
 */
const GetCreatorAnnotations = async () => {
    const creatorAnnotations: Annotation[] = [];

    const token = KeycloakService.GetToken();

    if (token) {
        try {
            const result = await axios({
                method: 'get',
                url: `annotation/v1/creator`,
                responseType: 'json',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            /* Get result data from JSON */
            const data: JSONResultArray = result.data;

            /* Set creator annotation items */
            data.data.forEach(dataRow => {
                creatorAnnotations.push(dataRow.attributes as Annotation);
            });
        } catch (error: any) {
            throw (NotFoundException('Creator Annotations', error.request.responseURL));
        };
    }

    return creatorAnnotations;
};

export default GetCreatorAnnotations;
/* Import Dependencies */
import axios from 'axios';
import KeycloakService from 'app/Keycloak';

/* Import Utilities */
import { RetrieveEnvVariable } from 'app/Utilities';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Exceptions */
import { DeleteException } from 'app/Exceptions';


/**
 * Function for posting a new annotation
 * @param annotationId The identifier of the annotation to delete
 * @returns Object of Digital Specimen
 */
const DeleteAnnotation = async ({ annotationId }: { annotationId: string }): Promise<string | undefined> => {
    let response: string | undefined;

    const token = KeycloakService.GetToken();

    try {
        const result = await axios({
            method: 'delete',
            url: `annotation/${annotationId.replace(RetrieveEnvVariable('HANDLE_URL'), '')}`,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        /* Get result data from JSON */
        const data: Dict = result.data;

        /* Set Result */
        response = data.data as string;
    } catch (error: any) {
        throw DeleteException('Annotation', error.request.responseURL);
    };

    return response;
};

export default DeleteAnnotation;
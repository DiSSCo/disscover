/* Import Dependencies */
import axios from 'axios';
import KeycloakService from 'app/Keycloak';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Exceptions */
import { PostException } from 'app/Exceptions';


/**
 * Function for posting a new annotation
 * @param newAnnotation The annotation to post
 * @returns Object of Digital Specimen
 */
const DeleteAnnotation = async ({ annotationId }: { annotationId: string }): Promise<string | undefined> => {
    let response: string | undefined;

    const token = KeycloakService.GetToken();
    const endPoint = `annotation/${annotationId}`;

    try {
        const result = await axios({
            method: 'delete',
            url: endPoint,
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
        throw PostException('Annotation', error.request.responseURL);
    };

    return response;
};

export default DeleteAnnotation;
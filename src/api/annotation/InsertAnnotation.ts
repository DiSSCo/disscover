/* Import Dependencies */
import axios from 'axios';
import KeycloakService from 'app/Keycloak';

/* Import Types */
import { Annotation } from 'app/types/Annotation';
import { AnnotationTemplate, JSONResult } from 'app/Types';

/* Import Exceptions */
import { PostException } from 'app/Exceptions';


/**
 * Function for posting a new annotation
 * @param newAnnotation The annotation to post
 * @returns Object of Digital Specimen
 */
const InsertAnnotation = async ({ newAnnotation }: { newAnnotation: AnnotationTemplate }): Promise<Annotation | undefined> => {
    let annotation: Annotation | undefined;

    /* Construct post structure for annotation */
    const postAnnotation: {
        data: {
            type: 'ods:Annotation',
            attributes: AnnotationTemplate
        }
    } = {
        data: {
            type: 'ods:Annotation',
            attributes: newAnnotation
        }
    };

    try {
        const result = await axios({
            method: 'post',
            url: 'annotation',
            responseType: 'json',
            data: postAnnotation,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${KeycloakService.GetToken()}`
            }
        });

        /* Get result data from JSON */
        const data: JSONResult = result.data;

        /* Set Annotation */
        annotation = data.data.attributes as Annotation;
    } catch (error: any) {
        throw (PostException('Annotation', error.request.responseURL));
    };

    return annotation;
};

export default InsertAnnotation;
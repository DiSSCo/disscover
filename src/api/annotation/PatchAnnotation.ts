/* Import Dependencies */
import axios from 'axios';
import KeycloakService from 'app/Keycloak';

/* Import Types */
import { Annotation } from 'app/types/Annotation';
import { AnnotationTemplate, JSONResult } from 'app/Types';

/* Import Exceptions */
import { PatchException } from 'app/Exceptions';


/**
 * Function for patching an annotation
 * @param annotationId The identifier of the annotation to patch
 * @param updatedAnnotation The updated annotation template to patch
 * @returns Object of Digital Specimen
 */
const PatchAnnotation = async ({ annotationId, updatedAnnotation }: { annotationId: string, updatedAnnotation: AnnotationTemplate }): Promise<Annotation | undefined> => {
    let annotation: Annotation | undefined;

    /* Construct post structure for annotation */
    const patchAnnotation: {
        data: {
            type: 'ods:Annotation',
            attributes: AnnotationTemplate
        }
    } = {
        data: {
            type: 'ods:Annotation',
            attributes: updatedAnnotation
        }
    };

    const token = KeycloakService.GetToken();

    try {
        const result = await axios({
            method: 'patch',
            url: `annotation/${annotationId.replace(import.meta.env.VITE_HANDLE_URL, '')}`,
            responseType: 'json',
            data: patchAnnotation,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        /* Get result data from JSON */
        const data: JSONResult = result.data;

        /* Set Annotation */
        annotation = data.data.attributes as Annotation;
    } catch (error: any) {
        throw PatchException('Annotation', error.request.responseURL);
    };

    return annotation;
};

export default PatchAnnotation;
/* Import Types */
import { Annotation as AnnotationType, JSONResult } from 'global/Types';


/* User Model for API calls */
const AnnotationModel = (data: JSONResult['data']) => {
    const annotation: AnnotationType = {
        id: data.id,
        body: {
            type: data.attributes.body.type,
            value: data.attributes.body.value,
            ...(data.attributes.body.values && {values: data.attributes.body.values}),
            ...(data.attributes.body.description && {description: data.attributes.body.description}),
            ...(data.attributes.body.based_on && {basedOn: data.attributes.body.based_on}),
            ...(data.attributes.body.reference && {reference: data.attributes.body.reference})
        },
        created: data.attributes.created,
        creator: data.attributes.creator,
        ...(data.attributes.deleted_on && {deletedOn: data.attributes.deleted_on}),
        generated: data.attributes.generated,
        generator: data.attributes.generator,
        motivation: data.attributes.motivation,
        preferenceScore: data.attributes.preferenceScore,
        target: {
            id: data.attributes.target.id,
            indvProp: data.attributes.target.indvProp,
            type: data.attributes.target.type
        },
        type: data.attributes.type,
        version: data.attributes.version
    }

    return annotation;
}

export default AnnotationModel;
/* Import Types */
import { Annotation as AnnotationType, Dict } from 'app/Types';


/* User Model for API calls */
const AnnotationModel = (data: Dict) => {
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
            type: data.attributes.target.type,
            ...(data.attributes.target.selector && {
                selector: {
                    type: data.attributes.target.selector.type,
                    ...(data.attributes.target.selector.conformsTo && {conformsTo: data.attributes.target.selector.conformsTo}),
                    ...(data.attributes.target.selector.hasROI && {
                        hasROI: {
                            "ac:xFrac": data.attributes.target.selector.hasROI['ac:xFrac'],
                            "ac:yFrac": data.attributes.target.selector.hasROI['ac:yFrac'],
                            "ac:widthFrac": data.attributes.target.selector.hasROI['ac:widthFrac'],
                            "ac:heightFrac": data.attributes.target.selector.hasROI['ac:heightFrac']
                        }
                    })
                }
            })
        },
        type: data.attributes.type,
        version: data.attributes.version
    }

    return annotation;
}

export default AnnotationModel;
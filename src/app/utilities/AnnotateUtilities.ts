/* Import Dependencies */
import jp from 'jsonpath';

/* Import Utilities */
import { MakeJsonPathReadableString } from './SchemaUtilities';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalMedia } from 'app/types/DigitalMedia';
import { AnnotationTarget,ParentClass, Dict } from 'app/Types';


/* Utilities associated with annotating */


/**
 * Function to extract parent classes from a given super class and provide all their associated information
 * @param params An object containing: the annotationTarget, superClass and parentClasses properties
 * @returns The extracted parent classes
 */
const ExtractParentClasses = (params: {
    annotationTarget: AnnotationTarget,
    superClass: DigitalSpecimen | DigitalMedia | Dict
}) => {
    const { annotationTarget, superClass } = params;

    /* Base variables */
    const pathArray: string[] = ['$'];
    const parents = jp.parse(annotationTarget.jsonPath).slice(1, -1);
    const parentClasses: ParentClass[] = [];

    /* For each parant, find and extract its class information */
    parents.forEach((parent, index) => {
        /* Filter path from schemas */
        let parentName = parent.expression.value.replace('ods:', '').replace('dwc:', '').replace('dcterms:', '');

        /* Add to pathArray */
        pathArray.push(parent.expression.value);

        if (parentName.includes('has') || parentName[0] === parentName[0].toUpperCase()) {
            /* If a parent class is empty, it needs to be targeted, if it is not completely empty, check for indexes */
            const parentNodes = jp.nodes(superClass, jp.stringify(pathArray).replaceAll('][', ']..[').replaceAll('"', "'"));

            if (!parentNodes.length) {
                parentClasses.push({
                    jsonPath: jp.stringify(pathArray).replaceAll('"', "'"),
                    name: MakeJsonPathReadableString(jp.stringify(pathArray)),
                    ...(index > 0 && { parentName: pathArray[index] }),
                    present: false
                });
            }

            parentNodes.forEach((parentNode, parentIndex) => {
                parentClasses.push({
                    jsonPath: jp.stringify(parentNode.path).replaceAll('"', "'"),
                    name: MakeJsonPathReadableString(jp.stringify(parentNode.path)),
                    ...(index > 0 && { parentName: MakeJsonPathReadableString(pathArray[index]) }),
                    present: (Array.isArray(parentNode.value) && !!parentNode.value.length) || (!Array.isArray(parentNode.value) && typeof (parentNode.value) === 'object'),
                    ...(parentNode.value.length && { options: parentNode.value.length }),
                    ...(parentClasses[parentIndex]?.options && { dependent: true })
                });
            });
        }
    });

    return parentClasses;
};

/**
 * Function to provide a readable motivation based on the motivation vocabulary
 * @param motivation The motivation to transcribe
 * @returns Readable motivation string
 */
const ProvideReadableMotivation = (motivation: 'ods:adding' | 'ods:deleting' | 'oa:assessing' | 'oa:editing' | 'oa:commenting') => {
    const annotationMotivations = {
        'ods:adding': 'Addition',
        'ods:deleting': 'Deletion',
        'oa:assessing': "Assessment",
        'oa:editing': "Modification",
        "oa:commenting": "Comment"
    };

    return annotationMotivations[motivation];
};

export {
    ExtractParentClasses,
    ProvideReadableMotivation
};
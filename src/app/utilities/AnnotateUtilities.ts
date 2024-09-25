/* Import Dependencies */
import jp from 'jsonpath';

/* Import Utilities */
import { ExtractLowestLevelSchema, ExtractClassesAndTermsFromSchema, MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";
import { DigitalMedia } from "app/types/DigitalMedia";
import { AnnotationFormProperty, AnnotationTarget, ParentClass, Dict } from "app/Types";


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

        if (parentName.includes('has')) {
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
                console.log(parentNode);
                console.log(parentClasses[parentIndex]);

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
 * Function that formats a JSON path string and replaces the connections with lower dashes
 * @param jsonPath The provided JSON path
 * @returns Formatted JSON path string replacing connections with lower dashes
 */
const FormatFieldNameFromJsonPath = (jsonPath: string) => {
    return jsonPath.replaceAll('.', '_').replaceAll('][', '_').replaceAll('[', '').replaceAll(']', '');
};

/**
 * 
 */
const FormatJsonPathFromFieldName = (fieldName: string) => {
    const splittedArray: (string | number)[] = fieldName.replaceAll("'", '').replaceAll('$', '').split('_');

    splittedArray.forEach((value, index) => {
        if (!isNaN(value as number)) {
            splittedArray[index] = Number(value);
        }
    });

    return jp.stringify(splittedArray);
};

/**
 * Function to generate and return a dictionary containing all classes and terms of the schema adhering to the provided schema name; and their values
 * @param jsonPath The JSON path that leads to the schema to be used
 * @returns The annotation form field properties and their associated form values
 */
const GenerateAnnotationFormFieldProperties = async (jsonPath: string, superClass: DigitalSpecimen | DigitalMedia | Dict) => {
    const annotationFormFieldProperties: {
        [propertyName: string]: AnnotationFormProperty
    } = {};
    const formValues: Dict = {};

    /* Extract main schema */
    const schema = await ExtractLowestLevelSchema(jsonPath);

    await ExtractClassesAndTermsFromSchema(schema, jsonPath).then(({
        classesList,
        termsList,
        termValue
    }) => {
        /* For each class, add it as a key property to the annotation form fields dictionary */
        classesList.forEach(classProperty => {
            if (!termValue) {
                annotationFormFieldProperties[classProperty.label] = {
                    key: classProperty.key,
                    name: classProperty.label,
                    jsonPath: classProperty.value.replace(`$`, jsonPath),
                    type: classProperty.value.includes('has') ? 'array' : 'object',
                    properties: []
                };

                /* Add class values to form values */
                const classValues: Dict | Dict[] = jp.value(superClass, classProperty.value.replace(`$`, jsonPath));
                const classFormValues: Dict = { ...classValues };

                if (!Array.isArray(classValues) && classValues) {
                    Object.entries(classValues).forEach(([key, value]) => {
                        if (typeof (value) === 'object') {
                            delete classFormValues[key];
                        }
                    });

                    formValues[FormatFieldNameFromJsonPath(classProperty.value.replace(`$`, jsonPath))] = classFormValues ?? {};
                } else if (classProperty.value.includes('has')) {
                    formValues[FormatFieldNameFromJsonPath(classProperty.value.replace(`$`, jsonPath))] = classValues ?? [];
                } else {
                    formValues[FormatFieldNameFromJsonPath(classProperty.value.replace(`$`, jsonPath))] = {};
                }

                /* For each term of class, add it to the properties array of the corresponding class in the annotation form fields dictionary */
                const termProperties = termsList.find(termsListOption => termsListOption.label === classProperty.label);

                termProperties?.options.forEach(termOption => {
                    annotationFormFieldProperties[classProperty.label].properties?.push({
                        key: termOption.key,
                        name: termOption.label,
                        jsonPath: termOption.value,
                        type: 'string'
                    });
                });
            } else {
                /* Treat upper parent as term and set annotation form value */
                formValues.value = jp.value(superClass, termValue.value);
            }
        });
    });

    return {
        annotationFormFieldProperties,
        newFormValues: formValues
    };
};

/**
 * Function that returns all of the annotation motivations as options (excluding deletion as this is handled systematically)
 * @param givenMotivation An already selected motivation that impacts the choice in motivation
 */
const GetAnnotationMotivations = (givenMotivation?: string) => ({
    ...(givenMotivation === 'ods:adding' && { 'ods:adding': 'Addition' }),
    'oa:assessing': 'Assessment',
    'oa:editing': "Modification",
    'oa:commenting': "Comment"
});

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
    FormatJsonPathFromFieldName,
    GenerateAnnotationFormFieldProperties,
    GetAnnotationMotivations,
    ProvideReadableMotivation
};
/* Import Dependencies */
import jp from 'jsonpath';
import { lowerFirst } from "lodash";

/* Import Utilities */
import { ExtractFromSchema, ExtractClassesAndTermsFromSchema } from 'app/utilities/SchemaUtilities';
import { MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";
import { DigitalMedia } from "app/types/DigitalMedia";
import { AnnotationFormProperty, Dict } from "app/Types";


/* Utilities associated with annotating */


/**
 * Function to generate and return a dictionary containing all classes and terms of the schema adhering to the provided schema name
 * @param jsonPath The JSON path that leads to the schema to be used
 */
const GenerateAnnotationFormFieldProperties = async (jsonPath: string, superClass: DigitalSpecimen | DigitalMedia | Dict, schemaTitle: string) => {
    const annotationFormFieldProperties: {
        [propertyName: string]: AnnotationFormProperty
    } = {};

    /* Format schema name to match the data model naming convention */
    // const schemaName: string = lowerFirst(MakeJsonPathReadableString(jsonPath === '$' ? schemaTitle : jsonPath).replaceAll(/[0-9]/g, '').replaceAll(' ', ''));

    /* Extract main schema */
    await ExtractFromSchema(jsonPath).then(async (schema) => {
        await ExtractClassesAndTermsFromSchema(schema).then(({
            classesList,
            termsList
        }) => {
            /* For each class, add it as a key property to the annotation form fields dictionary */
            classesList.forEach(classProperty => {
                annotationFormFieldProperties[classProperty.label] = {
                    key: classProperty.key,
                    name: classProperty.label,
                    jsonPath: classProperty.value.replace(`$`, jsonPath),
                    type: classProperty.value.includes('has') ? 'array' : 'object',
                    properties: []
                };

                /* For each term of class, add it to the properties array of the corresponding class in the annotation form fields dictionary */
                const termProperties = termsList.find(termsListOption => termsListOption.label === classProperty.label);

                termProperties?.options.forEach(termOption => {
                    const currentValue: string = jp.value(superClass, termOption.value.replace(`$`, jsonPath));

                    annotationFormFieldProperties[classProperty.label].properties?.push({
                        key: termOption.key,
                        name: termOption.label,
                        jsonPath: termOption.value,
                        type: 'string',
                        currentValue
                    })
                });
            });
        })
    });

    return annotationFormFieldProperties;
};

/**
 * Function that returns all of the annotation motivations as options
 */
const GetAnnotationMotivations = () => ({
    'ods:adding': 'Addition',
    'ods:deleting': 'Deletion',
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
    GenerateAnnotationFormFieldProperties,
    GetAnnotationMotivations,
    ProvideReadableMotivation
};
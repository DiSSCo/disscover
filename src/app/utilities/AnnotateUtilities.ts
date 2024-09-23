/* Import Dependencies */
import jp from 'jsonpath';

/* Import Utilities */
import { ExtractFromSchema, ExtractClassesAndTermsFromSchema } from 'app/utilities/SchemaUtilities';

/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";
import { DigitalMedia } from "app/types/DigitalMedia";
import { AnnotationFormProperty, Dict } from "app/Types";


/* Utilities associated with annotating */


/**
 * Function that formats a JSON path string and replaces the connections with lower dashes
 * @param jsonPath The provided JSON path
 * @returns Formatted JSON path string replacing connections with lower dashes
 */
const FormatFieldNameFromJsonPath = (jsonPath: string) => {
    return jsonPath.replaceAll('.', '_').replaceAll('][', '_').replaceAll('[', '').replaceAll(']', '');
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
    const schema = await ExtractFromSchema(jsonPath);

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

            /* Add class values to form values */
            const classValues: Dict | Dict[] = jp.value(superClass, classProperty.value.replace(`$`, jsonPath));
            const classFormValues: Dict = { ...classValues };

            if (!Array.isArray(classValues) && classValues) {
                Object.entries(classValues).forEach(([key, value]) => {
                    if (typeof (value) === 'object') {
                        delete classFormValues[key];
                    }
                });

                formValues[FormatFieldNameFromJsonPath(classProperty.value.replace(`$`, jsonPath))] = classFormValues;
            } else {
                formValues[FormatFieldNameFromJsonPath(classProperty.value.replace(`$`, jsonPath))] = classValues;
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
    GenerateAnnotationFormFieldProperties,
    GetAnnotationMotivations,
    ProvideReadableMotivation
};
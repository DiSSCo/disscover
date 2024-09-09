/* Import Utilities */
import { MakeReadableString } from "app/Utilities";

/* Import Types */
import { Dict } from "app/Types";


/**
 * Function to extract the classes and terms from a given schema
 * @param schema The schema of which the classes and terms should be extracted
 * @returns Dictionary containing the generated classes and terms list
 */
const ExtractClassesAndTermsFromSchema = async (schema: Dict) => {
    const classesList: { label: string, value: string }[] = [];
    const termsList: { label: string, options: { label: string, value: string }[] }[] = [];

    /**
     * 
     * @param classOption 
     */
    const PushToClassesList = (classOption: { label: string, value: string }) => {
        classesList.push(classOption);
    };

    /**
     * 
     * @param termsOption 
     */
    const PushToTermsList = (termsOption: { label: string, options: { label: string, value: string }[] }) => {
        termsList.push(termsOption);
    };

    /* Push super class to classes list */
    PushToClassesList({
        label: MakeReadableString(schema.title),
        value: '$'
    });

    await IterateOverSchemaLayer({
        schema: schema.properties,
        jsonPath: '$',
        schemaName: MakeReadableString(schema.title),
        PushToClassesList,
        PushToTermsList
    });

    /* Sort Classes and Terms lists */
    classesList.sort((a, b) => a.label > b.label ? 1 : 0)
    termsList.sort((a, b) => a.label > b.label ? 1 : 0)

    return {
        classesList,
        termsList,
    };
};

/**
 * Function to extract the data from a generated schema of the data model
 * @param schemaName The name of the schema to extract from 
 * @returns Dictionary of the requested schema
 */
const ExtractFromSchema = async (schemaName: string) => {
    const strippedSchemaName: string = schemaName.replace('ods:', '').replace('has', '')[0].toLowerCase() + schemaName.replace('ods:', '').replace('has', '').slice(1);

    return await import(`../../sources/dataModel/${strippedSchemaName}.json`);
};

/**
 * Function to iterate over a schema layer and extract the layer's terms and classes
 * Recursive so it will continue iterating over all sub classes
 * @param params A params object containing:
 * the schema, JSON path properties
 * the PushToClassesList and PushToTermsList functions
 */
const IterateOverSchemaLayer = async (params: {
    schema: Dict,
    jsonPath: string,
    schemaName?: string,
    PushToClassesList: Function,
    PushToTermsList: Function
}) => {
    const { schema, jsonPath, schemaName, PushToClassesList, PushToTermsList } = params;

    const localTermsList: { label: string, value: string }[] = [];

    /* Iterate over schema layer properties and determine if it is a class or term by checking the ods:has pattern */
    for (let i = 0; i < Object.keys(schema).length; i++) {
        const key = Object.keys(schema)[i];
        const property = Object.values(schema)[i];

        if (key.includes('ods:has') || property.type === 'object') {
            /* Treat as a class with terms */
            PushToClassesList({
                label: MakeJsonPathReadableString(`${jsonPath}['${key}']`),
                value: `${jsonPath}['${key}']`
            });

            /* Recall function with this class as the provided schema */
            let subSchema: Dict = {};

            if (('items' in property && '$ref' in property.items) || '$ref' in property) {
                subSchema = await ExtractFromSchema(key);
            } else if ('items' in property) {
                subSchema = property.items;
            } else {
                subSchema = property;
            }

            await IterateOverSchemaLayer({
                schema: subSchema.properties,
                jsonPath: `${jsonPath}['${key}']`,
                PushToClassesList,
                PushToTermsList
            });
        } else {
            /* Treat as a stand alone term */
            localTermsList.push({
                label: MakeJsonPathReadableString(key),
                value: `${jsonPath}['${key}']`
            });
        };
    };

    /* When finished, push local terms to global terms list as affiliated with this schema level (class) */
    PushToTermsList({
        label: schemaName ?? MakeJsonPathReadableString(jsonPath),
        options: localTermsList
    });
};

/**
* Function to transform a JSON path to a human readable string
* @param jsonPath The provided JSON path to transform
* @returns String
*/
const MakeJsonPathReadableString = (jsonPath: string): string => {
    let readableString: string = jsonPath;

    /* Remove root dollar sign */
    readableString = readableString.replace('$', '');

    /* Remove schema prefixes */
    readableString = readableString.replaceAll('@', '');
    readableString = readableString.replaceAll('ods:', '');
    readableString = readableString.replaceAll('dwc:', '');
    readableString = readableString.replaceAll('dcterms:', '');
    readableString = readableString.replaceAll('has', '');

    /* Remove JSON path indications */
    readableString = readableString.replaceAll('[', '');
    readableString = readableString.replaceAll(']', ' ')
    readableString = readableString.replaceAll('.', ' ');

    return MakeReadableString(readableString);
};

export {
    ExtractClassesAndTermsFromSchema,
    MakeJsonPathReadableString
};
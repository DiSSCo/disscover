/* Import Dependencies */
import { lowerFirst } from "lodash";

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
    const classesList: { key: string, label: string, value: string }[] = [];
    const termsList: { label: string, options: { key: string, label: string, value: string }[] }[] = [];

    /**
     * Function to push to the classes list
     * @param classOption 
     */
    const PushToClassesList = (classOption: { key: string, label: string, value: string }) => {
        classesList.push(classOption);
    };

    /**
     * Function to push to the terms list
     * @param termsOption 
     */
    const PushToTermsList = (termsOption: { label: string, options: { key: string, label: string, value: string }[] }) => {
        termsList.push(termsOption);
    };

    /* Push super class to classes list */
    PushToClassesList({
        key: schema.title,
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
const ExtractFromSchema = async (jsonPath: string) => {
    /* Base variables */
    let classSeparatedString: string = jsonPath.replaceAll(/\[(\d+)\]/g, '_').replaceAll('$', '').replaceAll('][', '_').replaceAll('[', '').replaceAll(']', '').replaceAll("'", '');

    if (classSeparatedString.at(-1) === '_') {
        classSeparatedString = classSeparatedString.slice(0, -1);
    }

    /**
     * Function to strip a schema string to remove all schema specific string occurrences
     * @param jsonPath The provided JSON path to strip
     * @returns Stripped schema string
     */
    const StripSchemaString = (jsonPath: string) => {
        const strippedSchemaName: string = lowerFirst(jsonPath.replaceAll('ods:', '').replaceAll('has', ''));

        return strippedSchemaName;
    };

    const strippedSchemaName = lowerFirst(StripSchemaString(classSeparatedString).split('_').at(-1));

    /* Try to import schema from data model sources, if it fails, try and search for the schema via its parents untill its found */
    try {
        return await import(`../../sources/dataModel/${strippedSchemaName}.json`);
    } catch {
        /* Try to iterate through the different schema levels and search for properties */
        const schemaClasses: string[] = classSeparatedString.split('_');
        const targetedSchemaName: string = schemaClasses.at(-1) as string;
        let lowestLevelSchema: Dict | undefined;
        let crashCheck: boolean = false;

        /* Find lowest level schema */
        while (!(lowestLevelSchema && targetedSchemaName in lowestLevelSchema.properties) && !crashCheck) {
            try {
                await ExtractFromSchema(schemaClasses[0]).then((schema: Dict) => {
                    lowestLevelSchema = schema;
                });
            } catch {
                crashCheck = true;
            };

            /* Remove index from array */
            schemaClasses.shift();
        };

        /* For remaining parent levels, dig through the lowest schema's levels to uncover the targeted schema */
        schemaClasses.forEach(schemaClass => {
            lowestLevelSchema = lowestLevelSchema?.properties[schemaClass];

            if (lowestLevelSchema?.items) {
                lowestLevelSchema = { ...lowestLevelSchema,
                    ...lowestLevelSchema.items,
                };
            }

            if (lowestLevelSchema && !lowestLevelSchema.title) {
                lowestLevelSchema.title = MakeJsonPathReadableString(schemaClass);
            }
        });

        return lowestLevelSchema;
    };
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

    const localTermsList: { key: string, label: string, value: string }[] = [];

    /* Iterate over schema layer properties and determine if it is a class or term by checking the ods:has pattern */
    for (let i = 0; i < Object.keys(schema ?? {}).length; i++) {
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
                key,
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
    ExtractFromSchema,
    MakeJsonPathReadableString
};
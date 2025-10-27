/* Import Dependencies */
import { lowerFirst } from "lodash";

/* Import Utilities */
import { MakeReadableString } from "app/Utilities";

/* Import Types */
import { Dict } from "app/Types";


/**
 * Function to extract the classes and terms from a given schema
 * @param schema The schema of which the classes and terms should be extracted
 * @param jsonPath The JSON path of the upper parent, provided and necessary when annotating a term
 * @returns Dictionary containing the generated classes and terms list
 */
const ExtractClassesAndTermsFromSchema = async (schema: Dict, jsonPath?: string) => {
    const classesList: { key: string, label: string, value: string }[] = [];
    const termsList: { label: string, options: { key: string, type: string, enum?: (string | number)[], label: string, value: string }[] }[] = [];
    let termValue: { key: string, label: string, value: string, enum?: (string | number)[] } | undefined;

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
    const PushToTermsList = (termsOption: { label: string, options: { key: string, type: string, enum?: (string | number)[], label: string, value: string }[] }) => {
        termsList.push(termsOption);
    };

    /* Push upper parent to classes list */
    PushToClassesList({
        key: schema.title,
        label: MakeReadableString(schema.title),
        value: '$'
    });

    if (jsonPath && (schema.type !== 'object' || !schema.type)) {
        const key: string = jsonPath.split("['").at(-1)?.replace("']", '') as string;

        termValue = {
            key,
            label: schema.title,
            value: jsonPath,
            ...(schema.enum && { enum: schema.enum })
        };
    }

    await IterateOverSchemaLayer({
        schema: schema.properties,
        jsonPath: '$',
        schemaName: MakeReadableString(schema.title),
        PushToClassesList,
        PushToTermsList
    });

    /* Sort Classes and Terms lists */
    classesList.sort((a, b) => a.label > b.label ? 1 : 0);
    termsList.sort((a, b) => a.label > b.label ? 1 : 0);

    return {
        classesList,
        termsList,
        termValue
    };
};

/**
 * Function to extract the data from a generated schema of the data model
 * @param schemaName The name of the schema to extract from
 * @returns Dictionary of the requested schema
 */
const ExtractFromSchema = async (schemaName: string): Promise<Dict> => {
    let strippedSchemaName = StripSchemaString(schemaName);

    /* Temporary solution to catch different agent naming conventions */
    if (['creator', 'assertionByAgent', 'relationshipAccordingToAgent', 'tombstonedByAgent'].includes(strippedSchemaName)) {
        strippedSchemaName = 'agent';
    }

    return await import(`../../sources/dataModel/${strippedSchemaName}.json`);
};

/**
 * Function to extract the data from a lowest level generated schema of the data model
 * @param jsonPath The JSON path of the provided property
 * @param schemaName The name of the base schema 
 * @returns Dictionary of the requested schema
 */
const ExtractLowestLevelSchema = async (jsonPath: string, schemaName: string): Promise<Dict | undefined> => {
    /* Base variables */
    let classSeparatedString: string = jsonPath.replaceAll(/\[(\d+)\]/g, '_').replaceAll('$', '').replaceAll('][', '_').replaceAll(/[\][']/g, '');

    if (classSeparatedString.at(-1) === '_') {
        classSeparatedString = classSeparatedString.slice(0, -1);
    }

    /* Check for super class or top level term, if so add base schema name to class separated string */
    if (!classSeparatedString) {
        classSeparatedString = schemaName;
    } else if (!(classSeparatedString.includes('has') && classSeparatedString.at(-1) === 's')) {
        classSeparatedString = `${schemaName}_${classSeparatedString}`;
    }

    const strippedSchemaName = lowerFirst(StripSchemaString(classSeparatedString).split('_').at(-1));

    /* Try to import schema from data model sources, if it fails, try and search for the schema via its parents untill its found */
    try {
        return await ExtractFromSchema(strippedSchemaName);
    } catch {
        /* Try to iterate through the different schema levels and search for properties */
        const schemaClasses: string[] = classSeparatedString.split('_');
        let lowestLevelSchema: Dict | undefined;
        let crashCheck: boolean = false;

        /* Find lowest level schema */
        while (schemaClasses.length && !crashCheck) {
            try {
                lowestLevelSchema = await ExtractFromSchema(StripSchemaString(schemaClasses[0]));

                schemaClasses.shift();
            } catch {
                /* Remove checked index from array */
                crashCheck = true;
            };
        };

        /* For remaining parent levels, dig through the lowest schema's levels to uncover the targeted schema */
        schemaClasses.forEach(schemaClass => {
            lowestLevelSchema = lowestLevelSchema?.properties[schemaClass];

            if (lowestLevelSchema?.items) {
                lowestLevelSchema = {
                    ...lowestLevelSchema,
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

    const localTermsList: { key: string, type: string, enum?: (string | number)[], label: string, value: string }[] = [];

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
            let subSchema: Dict | undefined = {};

            if (('items' in property && '$ref' in property.items) || '$ref' in property) {
                subSchema = await ExtractFromSchema(key);
            } else if ('items' in property) {
                subSchema = property.items;
            } else {
                subSchema = property;
            }

            await IterateOverSchemaLayer({
                schema: subSchema?.properties,
                jsonPath: `${jsonPath}['${key}']`,
                PushToClassesList,
                PushToTermsList
            });
        } else {
            /* Treat as a stand alone term */
            localTermsList.push({
                key,
                type: property.type,
                ...(property.enum && { enum: property.enum }),
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
    readableString = RemoveSchemaPrefixes(readableString);

    /* Remove JSON path indications */
    readableString = readableString.replaceAll('[', '');
    readableString = readableString.replaceAll(']', ' ')
    readableString = readableString.replaceAll('.', ' ');

    return MakeReadableString(readableString);
};

/**
 * Function to remove the schema prefixes from a JSON path
 * @param jsonPath The provided JSON path
 * @returns JSON path string without the schema prefixes
 */
const RemoveSchemaPrefixes = (jsonPath: string): string => {
    return jsonPath.replaceAll('has', '')
        .replaceAll('ods:', '')
        .replaceAll('dwc:', '')
        .replaceAll('dwciri:', '')
        .replaceAll('chrono:', '')
        .replaceAll('dcterms:', '')
        .replaceAll('schema:', '')
        .replaceAll('eco:', '');
};

/**
    * Function to strip a schema string to remove all schema specific string occurrences
    * @param jsonPath The provided JSON path to strip
    * @returns Stripped schema string
    */
const StripSchemaString = (jsonPath: string) => {
    let strippedSchemaName: string = lowerFirst(RemoveSchemaPrefixes(jsonPath));

    if (strippedSchemaName.at(-1) === 's') {
        strippedSchemaName = strippedSchemaName.slice(0, -1);
    }

    return strippedSchemaName;
};

/**
 * Function to extract the last human-readable part from a JSONPath string.
 * For example, from '$["ods:hasEvents"][0]["ods:hasLocation"]["ods:hasGeoreference"]' it will extract 'Georeference'.
 * @param jsonPath The JSON path string.
 * @returns The readable last part of the path.
 */
const ExtractLastSegmentFromPath = (jsonPath: string): string => {
    /* If jsonPath is root, return generic name */
    if (jsonPath === '$') return 'Digital Specimen';

    /* Split the path by the '[' character to get parts */
    const parts = jsonPath.split('[');

    /* Find the last part that is not just a number (to ignore array indices) */
    const lastMeaningfulPart = [...parts].reverse().find(part => !/^\d+\]$/.test(part));

    if (!lastMeaningfulPart) return '';

    /* Clean up the part and make it readable */
    const cleanedPart = lastMeaningfulPart.replaceAll(/["'\]]/g, '');

    return MakeReadableString(RemoveSchemaPrefixes(cleanedPart));
};

export {
    ExtractClassesAndTermsFromSchema,
    ExtractFromSchema,
    ExtractLowestLevelSchema,
    MakeJsonPathReadableString,
    ExtractLastSegmentFromPath
};
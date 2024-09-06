/* Import Utilities */
// import { ExtractFromSchema, MakeReadableString } from "app/Utilities";

/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";
import { DigitalMedia } from "app/types/DigitalMedia";
import { Dict } from "app/Types";


/**
 * Function to extract the classes and terms from a given schema
 * @param schema The schema of which the classes and terms should be extracted
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

    await IterateOverSchemaLayer({
        schema,
        jsonPath: '$',
        PushToClassesList,
        PushToTermsList
    });

    return {
        classesList: classesList.sort((a, b) => a.label > b.label ? 1 : 0),
        termsList: termsList.sort((a, b) => a.label > b.label ? 1 : 0),
    };
};

/**
 * 
 */
const IterateOverSchemaLayer = async (params: {
    schema: Dict,
    jsonPath: string,
    PushToClassesList: Function,
    PushToTermsList: Function
}) => {
    const { schema, jsonPath, PushToClassesList, PushToTermsList } = params;

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
                // subSchema = await ExtractFromSchema(key);
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
                label: '',
                value: `${jsonPath}['${key}']`
            });
        };
    };

    /* When finished, push local terms to global terms list as affiliated with this schema level (class) */
    PushToTermsList({
        label: MakeJsonPathReadableString(jsonPath),
        options: localTermsList
    });
};


/**
 * 
 * @param jsonPath 
 */
const MakeJsonPathReadableString = (jsonPath: string) => {
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

    // return MakeReadableString(readableString);
};









/* Functions specifically designed for the annotation side panel */

/* Function for pushing to the annotatable properties list, or recall Construct List */
const PushToList = (params: Dict) => {
    const { propertyData, threshhold, propertiesList, property, schema, classValue, targetType, FieldAdheres, PushToClassesList, PushToPropertiesList, subSchema, fieldValue } = params;

    /* If type is string/integer/boolean: treat as field, otherwise treat as class */
    if (['string', 'integer', 'number', 'boolean'].includes(propertyData.type) && threshhold) {
        propertiesList.options.push({ label: property, value: subSchema ? `${schema}.${subSchema}.${property}` : `${schema}.${property}` });

        /* Check if current field value adheres to class value */
        FieldAdheres(fieldValue?.includes(property));
    } else if (threshhold) {
        /* Push Class to classes list */
        let nestingBreak: string = '';

        if (schema.split('.').length > 1) {
            nestingBreak = schema.split('.').pop() as string;
        }

        PushToClassesList(subSchema ? `${nestingBreak && nestingBreak + '.'}${subSchema}.${property}` : `${property}`);

        /* Extract properties from schema */
        // ExtractFromSchema(MapPropertyToSchemaName(property)).then(properties =>
        //     ConstructList({
        //         schema: subSchema ? `${schema}.${subSchema}` : schema,
        //         targetType: targetType,
        //         properties: properties,
        //         classValue: classValue,
        //         FieldAdheres,
        //         PushToPropertiesList,
        //         PushToClassesList,
        //         subSchema: property,
        //         fieldValue: fieldValue
        //     })
        // );
    } else {
        /* Extract properties from schema */
        // ExtractFromSchema(property).then(properties =>
        //     /* Continue recurstion untill right class is found */
        //     ConstructList({
        //         schema: subSchema ? `${schema}.${subSchema}` : schema,
        //         targetType: targetType,
        //         properties: properties,
        //         classValue: classValue,
        //         FieldAdheres,
        //         PushToPropertiesList,
        //         PushToClassesList,
        //         subSchema: property,
        //         fieldValue: fieldValue
        //     })
        // );
    }
};

/**
 * Recursive function for constructing a list of annotatable properties and classes
 * @param params A dictionary containing the necessary properties used in this function:
 * The variables: schema, targetType, properties, classValue, subSchema and fieldValue
 * The functions: FieldAdheres, PushToPropertiesList and PushToClassesList
 * Recalls PushToPropertiesList
 */
const ConstructList = (params: Dict) => {
    const { schema, targetType, properties, classValue, subSchema, fieldValue, FieldAdheres, PushToPropertiesList, PushToClassesList } = params;

    const propertiesList: { label: string, options: { label: string, value: string }[] } = {
        label: subSchema ? `${schema}.${subSchema}` : schema,
        options: []
    };

    for (const property in properties) {
        const propertyData = properties[property];

        /* Variables track presence of requested class, also true when no requested class is provided */
        let threshhold: boolean = false;

        /* Check if there is a predefined class instance */
        if ((classValue && (schema.includes(classValue) || `${schema}.${subSchema}.${property}`.includes(`${targetType}.${classValue}`)) || !classValue)) {
            threshhold = true;
        }

        PushToList({
            propertyData, threshhold, propertiesList, property, schema, classValue, targetType,
            FieldAdheres, PushToClassesList, PushToPropertiesList, subSchema, fieldValue
        });
    }

    PushToPropertiesList(propertiesList);
};

/**
 * Base function for constructing list of annotatable properties and classes
 * @param superClass The type of the base 
 * @param classValue 
 * @param fieldValue 
 * @returns 
 */
const ConstructTargetPropertiesLists = (superClass: DigitalSpecimen | DigitalMedia, classValue?: string, fieldValue?: string) => {
    /* Base variables */
    const propertiesList: { label: string, options: { label: string, value: string }[] }[] = [];
    const classesList: { label: string, value: string }[] = [];
    let fieldAdheres: boolean = false;

    /* Function to verify current field value still adheres to one of the chosen class values */
    const FieldAdheres = (bool: boolean) => {
        fieldAdheres = bool;
    };

    /* Function to push to the properties list */
    const PushToPropertiesList = (propertiesListItem: { label: string, options: { label: string, value: string }[] }) => {
        propertiesList.push(propertiesListItem);
    };

    /* Function to push to the classes list */
    const PushToClassesList = (classItem: string) => {
        classesList.push({
            label: classItem,
            value: classItem
        });
    };

    /* For each property/class, collect fields for annotating */
    ConstructList({
        schema: '$',
        targetType: '$',
        properties: superClass,
        classValue: classValue ?? '',
        FieldAdheres,
        PushToPropertiesList,
        PushToClassesList,
        subSchema: undefined,
        fieldValue
    });

    return {
        fieldAdheres: fieldAdheres,
        properties: propertiesList,
        classes: classesList
    };
};

export {
    ConstructTargetPropertiesLists,
    ExtractClassesAndTermsFromSchema
};
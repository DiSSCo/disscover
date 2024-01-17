/* Import Types */
import { Dict } from 'app/Types';

/* Import Sources */
import DigitalSpecimen from 'sources/dataModel/digital_specimen.json';
import DigitalEntity from 'sources/dataModel/digital_entity.json';
import MaterialEntity from 'sources/dataModel/material_entity.json';
import Identification from 'sources/dataModel/identifications.json';
import Assertion from 'sources/dataModel/assertions.json';
import Occurrence from 'sources/dataModel/occurrences.json';
import EntityRelationship from 'sources/dataModel/entity_relationships.json';
import Citation from 'sources/dataModel/citations.json';
import Identifier from 'sources/dataModel/identifiers.json';
import ChronometricAge from 'sources/dataModel/chronometric_age.json';
import Location from 'sources/dataModel/location.json';


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
        const properties = ExtractFromSchema(property);

        ConstructList({
            schema: subSchema ? `${schema}.${subSchema}` : schema,
            targetType: targetType,
            properties: properties,
            classValue: classValue,
            FieldAdheres,
            PushToPropertiesList,
            PushToClassesList,
            subSchema: property,
            fieldValue: fieldValue
        });
    } else {
        /* Extract properties from schema */
        const properties = ExtractFromSchema(property);

        /* Continue recurstion untill right class is found */
        ConstructList({
            schema: subSchema ? `${schema}.${subSchema}` : schema,
            targetType: targetType,
            properties: properties,
            classValue: classValue,
            FieldAdheres,
            PushToPropertiesList,
            PushToClassesList,
            subSchema: property,
            fieldValue: fieldValue
        });
    }
}

/* Recursive function for constructing a list of annotatable properties and classes */
const ConstructList = (params: Dict) => {
    const { schema, targetType, properties, classValue, FieldAdheres, PushToPropertiesList, PushToClassesList, subSchema, fieldValue } = params;

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
}

/* Function for extracting all properties from a schema, based upon the name of the schema */
const ExtractFromSchema = (property: string) => {
    switch (property) {
        case 'materialEntity': {
            return MaterialEntity.properties;
        }
        case 'dwc:identification': {
            return Identification.properties;
        }
        case 'taxonIdentifications': {
            return Identification.properties.taxonIdentifications.items.properties;
        }
        case 'assertions': {
            return Assertion.properties;
        }
        case 'occurrences': {
            return Occurrence.properties;
        }
        case 'entityRelationships': {
            return EntityRelationship.properties;
        }
        case 'citations': {
            return Citation.properties;
        }
        case 'identifiers': {
            return Identifier.properties;
        }
        case 'chronometricAge': {
            return ChronometricAge.properties;
        }
        case 'location': {
            return Location.properties;
        }
        case 'georeference': {
            return Location.properties.georeference.properties;
        }
        case 'geologicalContext': {
            return Location.properties.geologicalContext.properties;
        }
        default: {
            return {}
        }
    }
}

/* Base function for constructing list of annotatable properties and classes */
const ConstructTargetPropertiesLists = (targetType: string = 'DigitalSpecimen', classValue?: string, fieldValue?: string) => {
    /* Base variables */
    const propertiesList: { label: string, options: { label: string, value: string }[] }[] = [];
    const classesList: { label: string, value: string }[] = [];
    let baseModel: Dict;
    let fieldAdheres: boolean = false;

    if (targetType === 'DigitalMedia') {
        baseModel = DigitalEntity;
    } else {
        baseModel = DigitalSpecimen;
    }

    /* Function to verify current field value still adheres to one of the chosen class values */
    const FieldAdheres = (bool: boolean) => {
        fieldAdheres = bool;
    }

    /* Function to push to the properties list */
    const PushToPropertiesList = (propertiesListItem: { label: string, options: { label: string, value: string }[] }) => {
        propertiesList.push(propertiesListItem);
    }

    /* Function to push to the classes list */
    const PushToClassesList = (classItem: string) => {
        classesList.push({
            label: classItem,
            value: classItem
        });
    }

    /* For each property/class, collect fields for annotating */
    ConstructList({
        schema: targetType,
        targetType,
        properties: baseModel.properties,
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
}

/* Function for searching in nested levels of a schema */
const SearchNestedLevels = (level: Dict | Dict[], nestingLevels: string[], targetType: string, PushToExistingInstances: Function) => {
    /* Check type of level */
    if (!(Array.isArray(level)) && nestingLevels.length) {
        const localLevel = level;
        const nextLevel: Dict[] = localLevel[nestingLevels[0]] as Dict[];
        nestingLevels.shift();

        SearchNestedLevels(nextLevel, nestingLevels, targetType, PushToExistingInstances);
    } else if (Array.isArray(level) && nestingLevels.length) {
        level.forEach((nextLevel: Dict, index: number) => {
            SearchNestedLevels(nextLevel, nestingLevels, targetType, PushToExistingInstances);
        });
    } else if (Array.isArray(level)) {
        level.forEach((instance: Dict) => {
            PushToExistingInstances(instance);
        });
    } else if (level) {
        /* Check target type as the distinction between class and field property */
        if (['string', 'integer', 'number', 'boolean'].includes(typeof (level))) {
            PushToExistingInstances(level as unknown as string | number | boolean);
        } else if (targetType === 'class') {
            PushToExistingInstances(level);
        }
    }
}

/* Function for formatting the property path based upon the base model and its typings, indexes are assigned to the first parent class that represents an array */
const FormatTargetPropertyPath = (path: string, targetType: string = 'DigitalSpecimen', index?: number) => {
    let baseModel: Dict;
    let formattedPath: string = '';

        /* Prepare base model */
    if (targetType === 'DigitalMedia') {
        baseModel = DigitalEntity.properties;
    } else {
        baseModel = DigitalSpecimen.properties;
    }

    /* Function to check if type of property is array */
    const CheckArrayType = (schema: Dict, level: string) => {
        let formattedLevel = level;

        if (schema[level].type === 'array') {
            formattedLevel = `${level}[${index}]`;
        }

        return formattedLevel;
    }

    /* Function to concat level to field, add dot if index is greater than zero */
    const ConcatToField = (level: string, index: number) => {
        if (index > 0 && !formattedPath.endsWith(']')) {
            formattedPath = formattedPath.concat(`.${level}`);
        } else {
            formattedPath = formattedPath.concat(level);
        }
    }

    const levels = path.replace(`${targetType}.`, '').split('.');
    let loopedLevels: string[] = [];

    levels.forEach((level, index) => {
        /* Push to looped levels */
        loopedLevels.push(level);

        /* Check if level is array */
        if (level in baseModel) {
            ConcatToField(CheckArrayType(baseModel, level), index);
        } else if (level in ExtractFromSchema(loopedLevels[index - 1])) {
            ConcatToField(CheckArrayType(ExtractFromSchema(loopedLevels[index - 1]), level), index);
        } else {
            ConcatToField(level, index);
        }
    });

    return formattedPath;
}

const RemoveRootFromPath = (targetPath: string) => {
    const trimmedPath = targetPath.replace('$.', '');

    return trimmedPath;
}

const CheckPathForRoot = (targetPath: string) => {
    let trimmedPath: string = targetPath;

    if (targetPath.indexOf('$.') < 0) {
        trimmedPath = `$.${targetPath}`;
    }

    return trimmedPath;
}

export {
    ExtractFromSchema,
    ConstructTargetPropertiesLists,
    SearchNestedLevels,
    RemoveRootFromPath,
    CheckPathForRoot,
    FormatTargetPropertyPath
};
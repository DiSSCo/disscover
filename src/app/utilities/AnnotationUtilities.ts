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


/* Recursive function for constructing a list of annotatable properties and classes */
const ConstructList = (
    schema: string, targetType: string, properties: Dict, classValue: string,
    FieldAdheres: Function, PushToPropertiesList: Function, PushToClassesList: Function, subSchema?: string, fieldValue?: string
) => {
    const propertiesList: { label: string, options: { label: string, value: string }[] } = {
        label: subSchema ? `${schema}.${subSchema}` : schema,
        options: []
    };

    for (const property in properties) {
        const propertyData = properties[property];

        /* Variables track presence of requested class, also true when no requested class is provided */
        let threshhold: boolean = false;

        /* Check if there is a predefined class instance */
        if (classValue && (schema.includes(classValue) || `${schema}.${subSchema}.${property}`.includes(`${targetType}.${classValue}`))) {
            threshhold = true;
        } else if (!classValue) {
            threshhold = true;
        }

        /* If type is string/integer/boolean: treat as field, otherwise treat as class */
        if (['string', 'integer', 'number', 'boolean'].includes(propertyData.type) && threshhold) {
            propertiesList.options.push({ label: property, value: subSchema ? `${schema}.${subSchema}.${property}` : `${schema}.${property}` });

            /* Check if current field value adheres to class value */
            if (fieldValue && fieldValue.includes(property)) {
                FieldAdheres();
            }
        } else if (threshhold) {
            /* Push Class to classes list */
            let nestingBreak: string = '';

            if (schema.split('.').length > 1) {
                nestingBreak = schema.split('.').pop() as string;
            }

            PushToClassesList(subSchema ? `${nestingBreak && `${nestingBreak}.`}${subSchema}.${property}` : `${property}`);

            /* Extract properties from schema */
            const properties = ExtractFromSchema(property);

            ConstructList(subSchema ? `${schema}.${subSchema}` : schema, targetType, properties, classValue,
                FieldAdheres, PushToPropertiesList, PushToClassesList, property, fieldValue
            );
        } else {
            /* Extract properties from schema */
            const properties = ExtractFromSchema(property);

            /* Continue recurstion untill right class is found */
            ConstructList(subSchema ? `${schema}.${subSchema}` : schema, targetType, properties, classValue,
                FieldAdheres, PushToPropertiesList, PushToClassesList, property, fieldValue
            );
        }
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
    const FieldAdheres = () => {
        fieldAdheres = true;
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
    ConstructList(targetType, targetType, baseModel.properties, classValue ?? '', FieldAdheres, PushToPropertiesList, PushToClassesList, undefined, fieldValue);

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
        const localLevel = level as Dict;
        const nextLevel: Dict[] = localLevel[nestingLevels[0]] as Dict[];
        nestingLevels.shift();

        SearchNestedLevels(nextLevel, nestingLevels, targetType, PushToExistingInstances);
    } else if (Array.isArray(level) && nestingLevels.length) {
        level.forEach((nextLevel: Dict) => {
            SearchNestedLevels(nextLevel, nestingLevels, targetType, PushToExistingInstances);
        });
    } else if (Array.isArray(level)) {
        level.forEach((instance: Dict) => {
            PushToExistingInstances(instance as Dict);
        });
    } else if (level) {
        /* Check target type as the distinction between class and field property */
        if (['string', 'integer', 'number', 'boolean'].includes(typeof (level))) {
            PushToExistingInstances(level as unknown as string | number | boolean);
        } else if (targetType === 'class') {
            PushToExistingInstances(level as Dict);
        }
    }
}

export {
    ExtractFromSchema,
    ConstructTargetPropertiesLists,
    SearchNestedLevels
};
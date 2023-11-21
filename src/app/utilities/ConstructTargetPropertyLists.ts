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


const ConstructList = (schema: string, properties: Dict, classValue: string, PushToPropertiesList: Function, PushToClassesList: Function, subSchema?: string) => {
    const propertiesList: { label: string, options: { label: string, value: string }[] } = {
        label: subSchema ? `${schema}_${subSchema}` : schema,
        options: []
    };

    for (const property in properties) {
        const propertyData = properties[property];

        /* Variables track presence of requested class, also true when no requested class is provided */
        let threshhold: boolean = false;

        /* Check if there is a predefined class instance */
        if (classValue && (schema.includes(classValue) || `${schema}_${subSchema}_${property}`.includes(classValue))) {
            threshhold = true;
        } else if (!classValue) {
            threshhold = true;
        }

        /* If type is string/integer/boolean: treat as field, otherwise treat as class */
        if (['string', 'integer', 'number', 'boolean'].includes(propertyData.type) && threshhold) {
            propertiesList.options.push({ label: property, value: schema ? `${schema}_${property}` : property });
        } else if (threshhold) {
            /* Push Class to classes list */
            let nestingBreak: string = '';

            if (schema.split('_').length > 1) {
                nestingBreak = schema.split('_').pop() as string;
            }

            PushToClassesList(subSchema ? `${nestingBreak && `${nestingBreak}_`}${subSchema}_${property}` : `${property}`);

            /* Extract properties from schema */
            const properties = ExtractFromSchema(property);

            ConstructList(subSchema ? `${schema}_${subSchema}` : schema, properties, classValue, PushToPropertiesList, PushToClassesList, property);
        } else {
            /* Extract properties from schema */
            const properties = ExtractFromSchema(property);

            /* Continue recurstion untill right class is found */
            ConstructList(subSchema ? `${schema}_${subSchema}` : schema, properties, classValue, PushToPropertiesList, PushToClassesList, property);
        }
    }

    PushToPropertiesList(propertiesList);
}

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

const ConstructTargetPropertiesLists = (targetType: string = 'DigitalSpecimen', classValue?: string) => {
    /* Base variables */
    const propertiesList: { label: string, options: { label: string, value: string }[] }[] = [];
    const classesList: { label: string, value: string }[] = [];
    let baseModel: Dict;

    if (targetType === 'DigitalMedia') {
        baseModel = DigitalEntity;
    } else {
        baseModel = DigitalSpecimen;
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
    ConstructList(targetType, baseModel.properties, classValue ?? '', PushToPropertiesList, PushToClassesList);

    return {
        properties: propertiesList,
        classes: classesList
    };
}

export default ConstructTargetPropertiesLists;
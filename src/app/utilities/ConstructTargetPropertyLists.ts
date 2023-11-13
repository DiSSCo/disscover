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


const ConstructList = (schema: string, properties: Dict, PushToPropertiesList: Function, subSchema?: string) => {
    const propertiesList: { label: string, options: { label: string, value: string }[] } = {
        label: subSchema ? `${schema}:${subSchema}` : schema,
        options: []
    };

    for (const property in properties) {
        const propertyData = properties[property];

        /* If type is string/integer/boolean: treat as field, otherwise treat as class */
        if (['string', 'integer', 'boolean'].includes(propertyData.type)) {
            propertiesList.options.push({ label: property, value: schema ? `${schema}:${property}` : property });
        } else {
            const properties = ExtractFromSchema(property);

            ConstructList(subSchema ?? schema, properties, PushToPropertiesList, property);
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
        default : {
            return {}
        }
    }
}


const ConstructTargetPropertiesLists = (targetType: string = 'DigitalSpecimen') => {
    /* Base variables */
    const propertiesList: { label: string, options: { label: string, value: string }[] }[] = [];
    let baseModel: Dict;

    if (targetType === 'DigitalMedia') {
        baseModel = DigitalEntity;
    } else {
        baseModel = DigitalSpecimen;
    }

    const PushToPropertiesList = (propertiesListItem: { label: string, options: { label: string, value: string }[] }) => {
        propertiesList.push(propertiesListItem);
    }

    /* For each property/class, collect fields for annotating */
    ConstructList(targetType, baseModel.properties, PushToPropertiesList);

    return propertiesList;
}

export default ConstructTargetPropertiesLists;
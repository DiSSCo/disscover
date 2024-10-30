/* Import Dependencies */
import axios from 'axios';
import { writeFileSync } from 'fs'
import { compile } from "json-schema-to-typescript";
import { resolve } from 'path';

/* Import Types */
import { Dict } from './Types';


/* Dict of types and their endpoints to fetch */
const typesDict = {
    identifier: 'https://schemas.dissco.tech/schemas/fdo-type/shared-model/0.3.0/identifier.json',
    agent: 'https://schemas.dissco.tech/schemas/fdo-type/shared-model/0.3.0/agent.json',
    assertion: 'https://schemas.dissco.tech/schemas/fdo-type/shared-model/0.3.0/assertion.json',
    chronometricAge: 'https://schemas.dissco.tech/schemas/fdo-type/digital-specimen/0.3.0/chronometric-age.json',
    citation: 'https://schemas.dissco.tech/schemas/fdo-type/shared-model/0.3.0/citation.json',
    tombstoneMetadata: 'https://schemas.dissco.tech/schemas/fdo-type/shared-model/0.3.0/tombstone-metadata.json',
    entityRelationship: 'https://schemas.dissco.tech/schemas/fdo-type/shared-model/0.3.0/entity-relationship.json',
    identification: 'https://schemas.dissco.tech/schemas/fdo-type/digital-specimen/0.3.0/identification.json',
    location: 'https://schemas.dissco.tech/schemas/fdo-type/digital-specimen/0.3.0/location.json',
    event: 'https://schemas.dissco.tech/schemas/fdo-type/digital-specimen/0.3.0/event.json',
    digitalMedia: 'https://schemas.dissco.tech/schemas/fdo-type/digital-media/0.3.0/digital-media.json',
    materialEntity: 'https://schemas.dissco.tech/schemas/fdo-type/digital-specimen/0.3.0/material-entity.json',
    digitalSpecimen: 'https://schemas.dissco.tech/schemas/fdo-type/digital-specimen/0.3.0/digital-specimen.json',
    annotationTarget: 'https://schemas.dissco.tech/schemas/fdo-type/annotation/0.3.0/annotation-target.json',
    annotationBody: 'https://schemas.dissco.tech/schemas/fdo-type/annotation/0.3.0/annotation-body.json',
    annotation: 'https://schemas.dissco.tech/schemas/fdo-type/annotation/0.3.0/annotation.json',
    sourceSystem: 'https://schemas.dissco.tech/schemas/fdo-type/source-system/0.3.0/source-system.json'
    environmentalVariable: 'https://schemas.dissco.tech/schemas/fdo-type/shared-model/0.3.0/environmental-variable.json',
    secretVariable: 'https://schemas.dissco.tech/schemas/fdo-type/shared-model/0.3.0/secret-variable.json',
    machineAnnotationService: 'https://schemas.dissco.tech/schemas/fdo-type/machine-annotation-service/0.3.0/machine-annotation-service.json'
};

/**
 * Function to generate local type and json files based on the provided schemas
 * @param typesDict A dictionary which keys indicate the name of the schema and value is an url that references the schema's source
 */
const HarvestTypes = (typesDict: { [type: string]: string }) => {
    const promises: Promise<Dict>[] = [];

    Object.values(typesDict).forEach(typeValue => {
        promises.push(axios({
            method: 'get',
            url: typeValue,
            responseType: 'json'
        }));
    });

    Promise.all(promises).then(async results => {
        for (let index = 0; index < results.length; index++) {
            const type: string = Object.keys(typesDict)[index][0].toUpperCase() + Object.keys(typesDict)[index].slice(1);

            let result: Dict = results[index];

            /* Check for refs inside schema, if so, replace with local generated files */
            Object.values(result.data.properties).filter((value: any) => (value.type === 'array' || value.type === 'object')).forEach((value: any) => {
                if (value.items && '$ref' in value.items) {
                    /* Treat as array of references */
                    let refTypeName: string = value.items['$ref'].split('/').pop();

                    /* Check for - symbols and replace with camel case */
                    refTypeName = refTypeName.split('-', 2).map((string, index) => index === 1 ? `${string[0].toUpperCase() + string.slice(1)}` : string).toString().replace(',', '');

                    value.items['$ref'] = resolve(__dirname, '../sources/dataModel', `./${refTypeName}`);
                } else if ('$ref' in value) {
                    /* Treat as object reference */
                    let refTypeName: string = value['$ref'].split('/').pop();

                    /* Check for - symbols and replace with camel case */
                    refTypeName = refTypeName.split('-', 2).map((string, index) => index === 1 ? `${string[0].toUpperCase() + string.slice(1)}` : string).toString().replace(',', '');

                    value['$ref'] = resolve(__dirname, '../sources/dataModel', `./${refTypeName}`);
                }
            });

            await compile(result.data, Object.keys(typesDict)[index]).then(ts => {
                /* Write to source data model */
                writeFileSync(`../sources/dataModel/${Object.keys(typesDict)[index]}.json`, JSON.stringify(result.data));

                /* Write to types */
                writeFileSync(`./types/${type}.d.ts`, ts);
            }).catch(error => {
                console.error(error);
            });
        };
    });
};

HarvestTypes(typesDict);
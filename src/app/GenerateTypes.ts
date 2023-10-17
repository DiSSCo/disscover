/* Import Dependencies */
import { writeFileSync } from 'fs'
import { compileFromFile } from "json-schema-to-typescript";
import { resolve } from 'path';


/* Assertion */
const Assertion = async () => {
    writeFileSync('types/Assertion.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'assertions.json'), {}));
}

Assertion();

/* Chronometric Age */
const ChronometricAge = async () => {
    writeFileSync('types/ChronometricAge.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'chronometric_age.json'), {}));
}

ChronometricAge();

/* Citation */
const Citation = async () => {
    writeFileSync('types/Citation.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'citations.json'), {}));
}

Citation();

/* Entity Relationship */
const EntityRelationship = async () => {
    writeFileSync('types/EntityRelationship.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'entity_relationships.json'), {}));
}

EntityRelationship();

/* Identification */
const Identification = async () => {
    writeFileSync('types/Identification.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'identifications.json'), {}));
}

Identification();

/* Identifier */
const Identifier = async () => {
    writeFileSync('types/Identifier.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'identifiers.json'), {}));
}

Identifier();

/* Location */
const Location = async () => {
    writeFileSync('types/Location.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'location.json'), {}));
}

Location();

/* Agent */
const Agent = async () => {
    writeFileSync('types/Agent.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'agent.json'), {}));
}

Agent();

/* Occurrence */
const Occurrence = async () => {
    writeFileSync('types/Occurrence.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'occurrences.json'), {}));
}

Occurrence();

/* Event */
const Event = async () => {
    writeFileSync('types/Event.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'events.json'), {}));
}

Event();

/* Digital Entity */
const DigitalEntity = async () => {
    writeFileSync('types/DigitalEntity.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'digital_entity.json'), {}));
}

DigitalEntity();

/* Material Entity */
const MaterialEntity = async () => {
    writeFileSync('types/MaterialEntity.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'material_entity.json'), {}));
}

MaterialEntity();

/* Digital Specimen */
const DigitalSpecimen = async () => {
    writeFileSync('types/DigitalSpecimen.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'digital_specimen.json'), {}))
}

DigitalSpecimen();

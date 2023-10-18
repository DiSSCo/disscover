/* Import Dependencies */
import { writeFileSync } from 'fs'
import { compileFromFile } from "json-schema-to-typescript";
import { resolve } from 'path';


/* Assertion */
const Assertion = async () => {
    writeFileSync('src/app/types/Assertion.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'assertions.json'), {}));
}

Assertion();

/* Chronometric Age */
const ChronometricAge = async () => {
    writeFileSync('src/app/types/ChronometricAge.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'chronometric_age.json'), {}));
}

ChronometricAge();

/* Citation */
const Citation = async () => {
    writeFileSync('src/app/types/Citation.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'citations.json'), {}));
}

Citation();

/* Entity Relationship */
const EntityRelationship = async () => {
    writeFileSync('src/app/types/EntityRelationship.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'entity_relationships.json'), {}));
}

EntityRelationship();

/* Identification */
const Identification = async () => {
    writeFileSync('src/app/types/Identification.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'identifications.json'), {}));
}

Identification();

/* Identifier */
const Identifier = async () => {
    writeFileSync('src/app/types/Identifier.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'identifiers.json'), {}));
}

Identifier();

/* Location */
const Location = async () => {
    writeFileSync('src/app/types/Location.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'location.json'), {}));
}

Location();

/* Agent */
const Agent = async () => {
    writeFileSync('src/app/types/Agent.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'agent.json'), {}));
}

Agent();

/* Occurrence */
const Occurrence = async () => {
    writeFileSync('src/app/types/Occurrence.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'occurrences.json'), {}));
}

Occurrence();

/* Event */
const Event = async () => {
    writeFileSync('src/app/types/Event.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'events.json'), {}));
}

Event();

/* Digital Entity */
const DigitalEntity = async () => {
    writeFileSync('src/app/types/DigitalEntity.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'digital_entity.json'), {}));
}

DigitalEntity();

/* Material Entity */
const MaterialEntity = async () => {
    writeFileSync('src/app/types/MaterialEntity.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'material_entity.json'), {}));
}

MaterialEntity();

/* Digital Specimen */
const DigitalSpecimen = async () => {
    writeFileSync('src/app/types/DigitalSpecimen.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'digital_specimen.json'), {}))
}

DigitalSpecimen();

/* Import Dependencies */
import KeycloakService from "app/Keycloak";

/* Import Utilities */
import { FormatFieldNameFromJsonPath } from "./AnnotateUtilities";


/* Utilities associated with a class annotation */


/**
 * Function to check for class default values and if present, return them
 * @param jsonPath The JSON path of the class to check
 * @returns Prefilled data array or object depending on provided class
 */
const CheckForClassDefaultValues = (jsonPath: string) => {
    const className: string = FormatFieldNameFromJsonPath(jsonPath.replaceAll(/\[(\d+)\]/g, '')).split('_').slice(-1)[0].replace('$', '').replaceAll("'", '');

    switch (className) {
        case 'ods:hasAgents': {
            return ClassAgents();
        }
        case 'ods:hasGeoreference': {
            return ClassGeoreference();
        }
        case 'ods:hasIdentifiers': {
            return ClassIdentifiers(jsonPath);
        }
        case 'ods:hasRoles': {
            return ClassRoles();
        }
    };
};

/**
 * Function to create a prefilled agent values object
 * @returns Prefilled agents values array
 */
const ClassAgents = () => {
    /* Construct agent values object */
    const classValues = {
        "@type": 'schema:Person',
        "schema:identifier": KeycloakService.GetParsedToken()?.orcid,
        "schema:name": `${KeycloakService.GetParsedToken()?.given_name ?? ''} ${KeycloakService.GetParsedToken()?.family_name ?? ''}`
    };

    return [classValues];
};

/**
 * Function to create a prefilled role values object
 * @returns Prefilled georeferene values object
 */
const ClassGeoreference = () => {
    /* Construct role values object */
    const classValues = {
        "@type": 'ods:Georeference'
    };

    return classValues;
};

/**
 * Function to create a prefilled role values object
 * @returns Prefilled identifiers values array
 */
const ClassIdentifiers = (jsonPath: string) => {
    /* Extract parent class name from JSON path */
    const parentClassName: string = FormatFieldNameFromJsonPath(jsonPath.replaceAll(/\[(\d+)\]/g, '')).split('_').slice(-2)[0].replace('$', '').replaceAll("'", '');

    /* Set parent specific values */
    const dctermsIdentifier: string = parentClassName === 'ods:hasAgents' ? KeycloakService.GetParsedToken()?.orcid : '';

    /* Construct identifier values object */
    const classValues = {
        "@type": '',
        "dcterms:title": '',
        "dcterms:identifier": dctermsIdentifier
    };

    return [classValues];
};

/**
 * Function to create a prefilled role values object
 * @returns Prefilled roles values array
 */
const ClassRoles = () => {
    /* Construct role values object */
    const classValues = {
        "@type": '',
        "schema:roleName": ''
    };

    return [classValues];
};

export {
    CheckForClassDefaultValues
};
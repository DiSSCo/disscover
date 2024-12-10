/* Import Dependencies */
import KeycloakService from "app/Keycloak";

/* Import Utilities */
import { FormatFieldNameFromJsonPath } from "./AnnotateUtilities";


/* Utilities associated with a class annotation */


/**
 * Function to check for class default values and if present, return them
 * @param jsonPath The JSON path of the class to check
 */
const CheckForClassDefaultValues = (jsonPath: string) => {
    const className: string = FormatFieldNameFromJsonPath(jsonPath.replaceAll(/\[(\d+)\]/g, '')).split('_').slice(-1)[0].replace('$', '').replaceAll("'", '');

    switch (className) {
        case 'ods:hasAgents': {
            return ClassAgents(jsonPath);
        }
        case 'ods:hasIdentifiers': {
            return ClassIdentifiers();
        }
        case 'ods:hasRoles': {
            return ClassRoles();
        }
    };
};

/**
 * Function to create a prefilled agent values object
 * @param jsonPath The full provided JSON path
 * @returns
 */
const ClassAgents = (jsonPath: string) => {
    /* Extract parent class name from JSON path */
    // const parentClassName: string = FormatFieldNameFromJsonPath(jsonPath.replaceAll(/\[(\d+)\]/g, '')).split('_').slice(-2)[0].replace('$', '').replaceAll("'", '');

    /* Construct agent values object */
    const classValues = {
        "@type": 'schema:Person',
        "schema:name": `${KeycloakService.GetParsedToken()?.given_name ?? ''} ${KeycloakService.GetParsedToken()?.family_name ?? ''}`
    };

    return classValues;
};

/**
 * Function to create a prefilled role values object
 * @returns 
 */
const ClassIdentifiers = () => {
    /* Construct identifier values object */
    const classValues = {
        "@type": '',
        "dcterms:title": '',
        "dcterms:identifier": ''
    };

    return [classValues];
};

/**
 * Function to create a prefilled role values object
 * @param roleForClassName The class name which to create a role for
 * @returns 
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
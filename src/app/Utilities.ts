/* Import Dependencies */
import { isEmpty, startCase } from "lodash";

/* Import Types */
import { Dict } from "./Types";


/**
 * Function to extract a nested node from a source object by passing along a JSON path as an array of strings
 * @param sourceObject The source object to search for the nested node
 * @param nestedLevels An array of strings containing the relative JSON path to the nested node
 * @returns String | Undefined
 */
const GetNestedObjectNode = (sourceObject: Dict, nestedLevels: string[]): string | undefined => {
    let result: string | undefined;

    if (nestedLevels.length > 1) {
        if (sourceObject[nestedLevels[0]]) {
            result = GetNestedObjectNode(sourceObject[nestedLevels[0]], nestedLevels.slice(1));
        };
    } else {
        result = sourceObject[nestedLevels[0]];
    };

    return result;
};

/**
 * Function to replace capitals in a string with spaces to make a readable string
 * @param string The string that needs to be made readable
 * @returns Human readable string
 */
const MakeReadableString = (string: string): string => {
    const splitArray: RegExpMatchArray | null = string.match(/[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g);

    return startCase(splitArray?.join(' ')) ?? startCase(string.split(/(?=[A-Z])/).join(' '));
};

const SearchNestedObjectNode = (sourceObject: Dict, identificationKey: string): any | undefined => {
    let result: any | undefined;

    for (let index = 0; index < Object.keys(sourceObject).length; index++) {
        if (identificationKey === Object.keys(sourceObject)[index]) {
            result = sourceObject[Object.keys(sourceObject)[index]];

            return result;
        } else if (typeof sourceObject[Object.keys(sourceObject)[index]] === 'object') {
            result = SearchNestedObjectNode(sourceObject[Object.keys(sourceObject)[index]], identificationKey);
        };
    };

    return result;
};

export {
    GetNestedObjectNode,
    MakeReadableString,
    SearchNestedObjectNode
};
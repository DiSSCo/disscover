/* Import Dependencies */
import { startCase, toUpper } from "lodash";


/**
 * Function to replace capitals in a string with spaces to make a readable string
 * @param string The string that needs to be made readable
 * @returns Human readable string
 */
const MakeReadableString = (string: string): string => {
    const splitArray: RegExpMatchArray | null = string.match(/[A-Z]?[a-z]+|\d+|[A-Z]+(?![a-z])/g);

    return startCase(splitArray?.join(' ')) ?? startCase(string.split(/(?=[A-Z])/).join(' '));
};

/**
 * Function for retieving an environment variable by name
 * @param name The name of the environment variable
 */
const RetrieveEnvVariable = (name: string) => {
    return import.meta.env[`VITE_${toUpper(name)}`];
};

export {
    MakeReadableString,
    RetrieveEnvVariable
};
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
 * Function to check for mobile browsers
 */
const MobileCheck = (): boolean => {
    let isMobile: boolean = false;

    /* Test Browser Agent */
    if (/Android/i.exec(navigator.userAgent) ||
        /webOS/i.exec(navigator.userAgent) ||
        /iPhone/i.exec(navigator.userAgent) ||
        /iPod/i.exec(navigator.userAgent) ||
        /BlackBerry/i.exec(navigator.userAgent) ||
        /Windows Phone/i.exec(navigator.userAgent) ||
        /Opera Mini/i.exec(navigator.userAgent) ||
        /IEMobile/i.exec(navigator.userAgent)
    ) {
        isMobile = true;
    }

    /* Test Screen Size */
    if (!isMobile && window.innerWidth <= 768) {
        isMobile = true;
    }

    return isMobile;
};

/**
 * Function for retieving an environment variable by name
 * @param name The name of the environment variable
 */
const RetrieveEnvVariable = (name: string) => {
    return import.meta.env[`VITE_${toUpper(name)}`];
};

export {
    MobileCheck,
    MakeReadableString,
    RetrieveEnvVariable
};
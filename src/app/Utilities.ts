/* Import Types */
import { Dict } from "./Types";


/* Function to capitalize the first character of a string */
const Capitalize = (string: string) => {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
        return '';
    }
}

/* Function to replace capitals in a string with spaces */
const AddSpaceBeforeCaptials = (string: string) => {
    let spacedString: string = string;

    for (let index = 0; index < string.length; index++) {
        if (string[index] === string[index].toUpperCase()) {
            let splittedArray = string.split(string[index], 2);

            spacedString = `${splittedArray[0]} ${string[index]}${splittedArray[1]}`;
        }
    }

    return spacedString;
}

/* Function for displaying a properties' value, or 'not provided'; used in ID Card */
const CheckProperty = (property: string | undefined): string => {
    if (property) {
        return property;
    } else {
        return 'Not provided';
    }
}

/* Function for checking if the user is using a mobile device */
const DetectMobile = (): boolean => {
    let mobile: boolean = false;

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
        mobile = true;
    }

    /* Test Screen Size */
    if (!mobile && window.innerWidth <= 768) {
        mobile = true;
    }

    return mobile;
}

/* Function for returning all filters from search params */
const GetFilters = (searchParams: URLSearchParams) => {
    const filters = [];

    for (const filterEntry of searchParams.entries()) {
        filters.push(filterEntry);
    }

    return filters;
}

/* Function for generating a random, ten character string */
const RandomString = () => {
    let result = '';

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

/* Function for returning all key value pairs from an object, including nested ones */
const ReturnPropertiesFromNestedObject = (propertiesObject: Dict) => {
    const propertiesArray: { key: string, value: string | number | boolean }[] = [];

    const PushToPropertiesArray = (propertyPair: { key: string, value: string | number | boolean }) => {
        propertiesArray.push(propertyPair);
    }

    const LoopOverProperties = (propertiesObject: Dict) => {
        for (const property in propertiesObject) {
            if (typeof propertiesObject[property] !== 'object') {
                PushToPropertiesArray({ key: property, value: propertiesObject[property] });
            } else {
                LoopOverProperties(propertiesObject[property]);
            }
        }
    }

    LoopOverProperties(propertiesObject);

    return propertiesArray;
}

export {
    Capitalize,
    AddSpaceBeforeCaptials,
    CheckProperty,
    DetectMobile,
    GetFilters,
    RandomString,
    ReturnPropertiesFromNestedObject
};
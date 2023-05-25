/* Function to capitalize the first character of a string */
const Capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* Function for displaying a properties' value, or 'not provided'; used in ID Card */
const CheckProperty = (property: string | undefined) => {
    if (property) {
        return property;
    } else {
        return 'Not provided';
    }
}

export {
    Capitalize,
    CheckProperty
};
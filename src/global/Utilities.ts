/* Function to capitalize the first character of a string */
const Capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export {
    Capitalize
};
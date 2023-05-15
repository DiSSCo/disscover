/* Function to capitalize the first character of a string */
const Capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* Function to check if given string is a valid url */
const ValidateURL = (url: string) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    return !!pattern.test(url);
}

export {
    Capitalize,
    ValidateURL
};
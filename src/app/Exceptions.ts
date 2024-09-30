/* Exceptions for error logging */

/**
 * Function for returning a default exception, activated for uknown response codes
 * @param objectType The type of the object that was requested
 * @param requestUrl The url that was requested
 * @returns Error message
 */
const DefaultException = (objectName: string, requestUrl: string) => {
    return `There was an error whilst retrieving digital object of type: ${objectName}. Request: ${requestUrl}`;
};

/**
 * Function for returning a not found exception, activated by response code 404
 * @param objectType The type of the object that was requested
 * @param requestUrl The url that was requested
 * @returns Error message
 */
const NotFoundException = (objectName: string, requestUrl: string) => {
    return `Digital object of type: '${objectName}' was not found. Request: ${requestUrl}`;
};

/**
 * Function for returning a no search results found exception, activated by an empty result array when a response code 200 occurs
 * @param objectType The type of the object that was requested
 * @param requestUrl The url that was requested
 * @returns Error message
 */
const NoSearchResults = (objectName: string, requestUrl: string) => {
    return `No search results were found for object type: ${objectName}' with these search parameters. Request: ${requestUrl}`;
};

/**
 * Function for returning a post exception that is thrown when an error occurs during the post request
* @param objectType The type of the object that was requested
 * @param requestUrl The url that was requested
 * @returns Error message
 */
const PostException = (objectName: string, requestUrl: string) => {
    return `Post request for object type: ${objectName} failed. Request: ${requestUrl}`;
};

export {
    DefaultException,
    NotFoundException,
    NoSearchResults,
    PostException
};
/* Import dependencies */
import DOMPurify from 'dompurify';

/* Import types */
import { DigitalMediaJson, DigitalSpecimenJson, JsonViewerData } from 'types/dataMapperTypes';

/**
 * Paginates an array of items based on the current page and limit.
 * This utility can do both server-side and client-side pagination. We need both.
 * @param items The full list of data
 * @param currentPage The current active page (1 - indexed)
 * @param maxPerPage Amount of items per page we want to show
 * @returns The sliced array, total amount of pages and total amount of items
 */
export const paginateItems = <T>(items: T[] | undefined, currentPage: number, maxPerPage: number, totalRecords?: number | undefined) => {
    /* If totalRecords is provided, server side pagination is happening. If no totalRecords, use items.length to use client side pagination */
    const totalAmount = totalRecords ?? items?.length ?? 0;
    const totalPages = totalAmount ? Math.ceil(totalAmount / maxPerPage) : 0;
    
    /* If totalRecords is provided, the items returned by the service can just be used, and totalPages and totalAmount can be returned */
    if (totalRecords !== undefined) {
        return {
            currentItems: items || [],
            totalPages,
            totalAmount,
        };
    }

    /* If no totalRecords, we provide client-side pagination */
    const sanitizedPage = Math.max(1, Math.min(currentPage, totalPages || 1));
    const startIndex = (sanitizedPage - 1) * maxPerPage;

    /* And return the outcome of this */
    return {
        currentItems: items?.slice(startIndex, startIndex + maxPerPage) || [],
        totalPages,
        totalAmount,
    };
};

/**
 * Wrapper function for the DOMPurify package to sanitize html when dangerously setting it
 * @param htmlString html string that needs to be sanitized 
 * @returns a sanitized HTML string
 */
export const sanitizeHtmlWrapper = (htmlString: string) => {
    return DOMPurify.sanitize(htmlString);
}

/**
 * Util function to clean up and validate DOIs in string and convert to array
 * @param doiInputString User input string
 * @returns An array of cleaned up and validated DOIs that adhere to the provided regex
 */
export const cleanAndValidateDOIs = (doiInputString: string) => {
    if (!doiInputString) return [];

    /* Split by newline, comma or semicolon and trim whitespaces */
    const rawDois = doiInputString
        .split(/[\n,;]+/)
        .map((doi) => doi.trim())
        .filter(doi => doi.length > 0);
    /* DOI regex to check if string adheres to https://doi.org/TEST|SANDBOX|10.xxxx/xxx-xxx-xxx */
    const doiRegex = /^(https?:\/\/((dx|www)\.)?doi\.org\/)?(10\.\d{4,9}|TEST|SANDBOX)\/[-._;()/:A-Z0-9]+$/i;

    return rawDois.filter(doi => doiRegex.test(doi));
}

/**
 * Function to take the url and get the handle or DOI
 * @returns An identifier that is a handle or DOI
 */
export const getIdFromUrl = () => {
    const url = new URL(globalThis.location.href);
    const segments = url.pathname.split('/');
    const identifier = segments.slice(2).join("/");

    return {
        identifier
    }
}

/* Generic functions to check whether a data object is digital media or digital specimen */
export function isDigitalSpecimenJson(data: JsonViewerData): data is DigitalSpecimenJson {
    return data.type === 'ods:DigitalSpecimen' || 'digitalSpecimen' in data.attributes;
}
  
export function isDigitalMediaJson(data: JsonViewerData): data is DigitalMediaJson {
    return !isDigitalSpecimenJson(data);
}

interface DownloadJsonOptions {
    data: unknown;
    filename: string;
}

/**
 * Downloads JSON data using Progressive Enhancement:
 * Uses native File System Access API (showSaveFilePicker) if supported,
 * falling back to an invisible <a> tag Blob download.
 */
export const downloadJsonFile = async ({ data, filename }: DownloadJsonOptions): Promise<void> => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });

    /* Progressive Enhancement: Check if File System Access API is supported */
    if ("showSaveFilePicker" in window) {
        try {
            const handle = await (window as any).showSaveFilePicker({
                suggestedName: filename,
                types: [
                    {
                        description: "JSON File",
                        accept: { "application/json": [".json"] },
                    },
                ],
            });
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            return;
        } catch (err: any) {
            /* When user cancels the accept question */
            if (err.name === "AbortError") {
                return;
            }
            console.error("File System Access API error, falling back to Blob link:", err);
        }
    }

    /* Fallback: Dynamic a tag acting as link */
    const link = document.createElement("a");
    const objectUrl = URL.createObjectURL(blob);
    
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    /* Clean up DOM and memory */
    link.remove();
    URL.revokeObjectURL(objectUrl);
};

/**
 * Splits conjoined camelCase or PascalCase strings into space-separated words.
 * 
 * @example
 * splitPascalCase('PreservedSpecimen') = 'Preserved Specimen'
 * splitPascalCase('JSONParser')        = 'JSON Parser'
 * splitPascalCase('myCamelCase')       = 'my Camel Case'
 */
export function splitPascalCase(str: string): string {
    if (!str) return '';
    return str
      /* Insert a space before capital letters preceded by a lowercase letter */
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      /* Insert a space between a sequence of capitals and a following lowercase letter (e.g., 'JSONParser' -> 'JSON Parser') */
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

/**
 * Converts a string so that only the first character is capitalized 
 * and the remaining characters are lowercase.
 * 
 * @example
 * capitalizeFirst('KINGDOM') = 'Kingdom'
 * capitalizeFirst('kInGdOm') = 'Kingdom'
 */
export function capitalizeFirst(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
/* Import dependencies */
import DOMPurify from 'dompurify';

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
        .split(/[n,;]+/)
        .map((doi) => doi.trim())
        .filter(doi => doi.length > 0);

    /* DOI regex to check if string adheres to https://doi.org/TEST|SANDBOX|10.xxxx/xxx-xxx-xxx */
    const doiRegex = /^(https?:\/\/(dx\.)?doi\.org\/)?(10\.\d{4,9}|TEST|SANDBOX)\/[-._;()/:A-Z0-9]+$/i;

    return rawDois.filter(doi => doiRegex.test(doi));
}
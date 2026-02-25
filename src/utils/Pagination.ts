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
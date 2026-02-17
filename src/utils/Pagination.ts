/**
 * Paginates an array of items based on the current page and limit.
 * @param items The full list of data
 * @param currentPage The current active page (1 - indexed)
 * @param maxPerPage Amount of items per page we want to show
 * @returns The sliced array, total amount of pages and total amount of items
 */
export const paginateItems = <T>(items: T[] | undefined, currentPage: number, maxPerPage: number, totalRecords: number | undefined) => {
    // If totalRecords is provided, we trust it as the source of truth for total amount (server-side pagination).
    // Otherwise, we use the length of the items array (client-side pagination).
    const totalAmount = totalRecords ?? items?.length ?? 0;
    const totalPages = totalAmount ? Math.ceil(totalAmount / maxPerPage) : 0;

    // When totalRecords is provided, it implies server-side pagination,
    // and the `items` array is already the data for the current page.
    if (totalRecords !== undefined) {
        return {
            currentItems: items || [],
            totalPages,
            totalAmount,
        };
    }

    // Otherwise, we perform client-side pagination by slicing the items array.
    const sanitizedPage = Math.max(1, Math.min(currentPage, totalPages || 1));
    const startIndex = (sanitizedPage - 1) * maxPerPage;

    return {
        currentItems: items?.slice(startIndex, startIndex + maxPerPage) || [],
        totalPages,
        totalAmount,
    };
};
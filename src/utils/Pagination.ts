/**
 * Paginates an array of items based on the current page and limit.
 * @param items The full list of data
 * @param currentPage The current active page (1 - indexed)
 * @param maxPerPage Amount of items per page we want to show
 * @returns The sliced array, total amount of pages and total amount of items
 */
export const paginateItems = <T>(items: T[] | undefined, currentPage: number, maxPerPage: number) => {
    if (!items) return { currentItems: [], totalPages: 0, totalAmount: 0 };

    const totalAmount = items.length;
    const totalPages = Math.ceil(totalAmount / maxPerPage);
    
    // Ensure we don't calculate indices for a page that doesn't exist
    const sanitizedPage = Math.max(1, Math.min(currentPage, totalPages || 1));

    const startIndex = (sanitizedPage - 1) * maxPerPage;
    const endIndex = startIndex + maxPerPage;

    return {
        currentItems: items.slice(startIndex, endIndex),
        totalPages,
        totalAmount,
    };
};
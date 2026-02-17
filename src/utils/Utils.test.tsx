import { describe, expect, it } from 'vitest';
import { paginateItems } from 'utils/Pagination';


describe('Pagination utils', () => {
    it('should return a sliced array, total amount of pages and total amount of items', () => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        const currentPage = 2;
        const maxPerPage = 5;
        const { currentItems, totalPages, totalAmount } = paginateItems(data, currentPage, maxPerPage);

        expect(currentItems).toEqual([6, 7, 8, 9, 10]);
        expect(totalPages).toEqual(4);
        expect(totalAmount).toEqual(20);
    })
});
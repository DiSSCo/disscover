import { describe, expect, it } from 'vitest';
import { paginateItems } from 'utils/Pagination';

/**
 * Test suite for the pagination utilities
 */
describe('Pagination utils', () => {
    it('should return a sliced array, total amount of pages and total amount of items', () => {
        const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}, {id: 13}, {id: 14}, {id: 15}, {id: 16}, {id: 17}, {id: 18}, {id: 19}, {id: 20}];
        const currentPage = 2;
        const maxPerPage = 5;
        const { currentItems, totalPages, totalAmount } = paginateItems(data, currentPage, maxPerPage);

        expect(currentItems).toEqual([{ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }]);
        expect(totalPages).toEqual(4);
        expect(totalAmount).toEqual(20);
    })
});
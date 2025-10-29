/* Import Dependencies */
import { describe, expect, it } from 'vitest';

/* Import components */
import { MakeReadableString } from 'app/Utilities';

/**
 * Description of tests to validate the functionality in Utilities
 */
describe("the MakeReadableString functionality", () => {
    let string: string;
    let result: string;

    it('should replace capitals in a string with white spaces to make a readable string and capitalize first character if not a string', async () => {
        string = 'TaxonIdentifications';

        result = MakeReadableString(string);

        expect(result).toBe('Taxon Identifications');

        string = 'scientificNameAuthorship';

        result = MakeReadableString(string);

        expect(result).toBe('Scientific Name Authorship');
    });
    it('should be able to deal with empty strings and numbers', async () => {
        string = '';

        result = MakeReadableString(string);

        expect(result).toBe('');

        string = 'MultipleThings1';

        result = MakeReadableString(string);

        expect(result).toBe('Multiple Things 1');
    })
});

/* Import Dependencies */
import { describe, expect, it } from 'vitest';

/* Import components */
import { ExtractLastSegmentFromPath } from '../SchemaUtilities';

/**
 * Description of tests to validate the functionality in Schema Utilities
 */
describe("the ExtractLastSegmentFromPath functionality", () => {
    let jsonPath: string;
    let result: string | undefined;

    it('should extract the last human-readable part from a JSONPath string', async () => {
        jsonPath = '$["ods:hasEvents"][0]["ods:hasLocation"]["ods:hasGeoreference"]';

        result = ExtractLastSegmentFromPath(jsonPath);

        expect(result).toBe('Georeference');

        jsonPath = '$';

        result = ExtractLastSegmentFromPath(jsonPath);

        expect(result).toBe('Digital Specimen');

        jsonPath = '$["ods:hasEntityRelationships"]';

        result = ExtractLastSegmentFromPath(jsonPath);

        expect(result).toBe('Entity Relationships');
    });
    it ('should return undefined if jsonPath is empty', async () => {
        jsonPath = '';

        result = ExtractLastSegmentFromPath(jsonPath);

        expect(result).toBeUndefined();
    });
});

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
    });
    it('should extract the last human-readable part from a JSONPath string and ignore index numbers', async () => {
        jsonPath = '$["ods:hasIdentifications"][0]["ods:hasTaxonIdentification"][0]';

        result = ExtractLastSegmentFromPath(jsonPath);

        expect(result).toBe('Taxon Identification');
    });
    it('should return Digital Specimen if jsonPath is root', async () => {
        jsonPath = '$';

        result = ExtractLastSegmentFromPath(jsonPath);

        expect(result).toBe('Digital Specimen');
    });
    it('should return the last human-readable part of a JSONPath if JSONPath only has one part', async () => {
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

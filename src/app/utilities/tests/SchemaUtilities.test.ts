/* Import Dependencies */
import { describe, expect, it } from 'vitest';

/* Import components */
import { ExtractLastSegmentFromPath } from '../SchemaUtilities';

/**
 * Description of tests to validate the functionality in Schema Utilities
 */
describe("the ExtractLastSegmentFromPath functionality", () => {
    // Each case for this functionality has a description, a jsonPath and the expected outcome
    it.each([
        {
            description: 'a complex path',
            jsonPath: '$["ods:hasEvents"][0]["ods:hasLocation"]["ods:hasGeoreference"]',
            expected: 'Georeference'
        },
        {
            description: 'a path ending in an index',
            jsonPath: '$["ods:hasIdentifications"][0]["ods:hasTaxonIdentification"][0]',
            expected: 'Taxon Identification'
        },
        { description: 'the root path', jsonPath: '$', expected: 'Digital Specimen' },
        { description: 'a simple path', jsonPath: '$["ods:hasEntityRelationships"]', expected: 'Entity Relationships' },
        { description: 'an empty path', jsonPath: '', expected: undefined }
    ])('should correctly extract segment for $description', ({ jsonPath, expected }) => {
        const result = ExtractLastSegmentFromPath(jsonPath);
        expect(result).toBe(expected);
    });
});

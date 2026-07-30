/* Import test dependencies */
import { describe, it, expect, beforeEach, vi } from 'vitest';

/* Import methods to test and mock */
import { mapDigitalSpecimen, mapDigitalSpecimenMedia } from './digitalSpecimenDataMapper';

/* Mock the schema map so test outcomes don't depend on actual schema definitions */
vi.mock('./schemas/digitalSpecimenSchema', () => ({
    default: [
        {
            name: 'Taxonomy',
            data: [
                {
                    label: 'Scientific Name',
                    type: 'string',
                    hidden: false,
                    resolve: (_ds: any, { acceptedIdentification }: any) =>
                        acceptedIdentification?.['dwc:scientificName'] ?? null,
                },
                {
                    label: 'Family',
                    type: 'string',
                    hidden: false,
                    resolve: () => null, 
                },
            ],
        },
        {
            name: 'Event',
            data: [
                {
                    label: 'Event Date',
                    type: 'string',
                    hidden: false,
                    resolve: (_ds: any, { primaryEvent }: any) =>
                        primaryEvent?.['dwc:eventDate'] ?? null,
                },
            ],
        },
        {
            name: 'Empty Category',
            data: [
                {
                    label: 'Missing Field',
                    resolve: () => null,
                },
            ],
        },
    ],
}));

/* Mock Specimen Payloads */
const mockValidPayload = {
    data: {
        attributes: {
            digitalSpecimen: {
                'ods:hasIdentifications': [
                    {
                        'ods:isVerifiedIdentification': false,
                        'ods:hasTaxonIdentifications': [{ 'dwc:scientificName': 'Unverified Name' }],
                    },
                    {
                        'ods:isVerifiedIdentification': true,
                        'ods:hasTaxonIdentifications': [{ 'dwc:scientificName': 'Panthera leo' }],
                    },
                ],
                'ods:hasEvents': [
                    { 'dwc:eventDate': '2023-05-18' },
                    { 'dwc:eventDate': '2020-01-01' },
                ],
            },
            digitalMedia: [
                {
                    digitalMediaObject: {
                        "@id": "https://doi.org/TEST/K05-DG7-0EM",
                        "ac:accessURI": "https://image.bgbm.org/images/internal/HerbarThumbs/B100630718_1700",
                        "dcterms:format": "image/jpeg",
                    }
                }
            ],
        },
    },
};

describe('mapDigitalSpecimen utilities', () => {
    describe('mapDigitalSpecimen', () => {
        it('returns null if rawData or digitalSpecimen payload is missing', () => {
            expect(mapDigitalSpecimen(null)).toBeNull();
            expect(mapDigitalSpecimen({})).toBeNull();
            expect(mapDigitalSpecimen({ data: {} })).toBeNull();
        });

        it('correctly selects verified identification over unverified ones', () => {
            const result = mapDigitalSpecimen(mockValidPayload);

            const taxonomyCategory = result?.mappedData.find((category) => category.name === 'Taxonomy');
            const scientificNameField = taxonomyCategory?.data.find((field) => field.label === 'Scientific Name');

            expect(scientificNameField?.value).toBe('Panthera leo');
        });

        it('falls back to the first identification when no identification is verified', () => {
            const unverifiedPayload = {
                data: {
                    attributes: {
                        digitalSpecimen: {
                            'ods:hasIdentifications': [
                                {
                                    'ods:isVerifiedIdentification': false,
                                    'ods:hasTaxonIdentifications': [{ 'dwc:scientificName': 'First Unverified' }],
                                },
                            ],
                        },
                    },
                },
            };

            const result = mapDigitalSpecimen(unverifiedPayload);
            const taxonomyCategory = result?.mappedData.find((cat) => cat.name === 'Taxonomy');

            expect(taxonomyCategory?.data[0].value).toBe('First Unverified');
        });

        it('filters out categories that contain no valid resolved data fields', () => {
            const result = mapDigitalSpecimen(mockValidPayload);

            const categoryNames = result?.mappedData.map((category) => category.name);
            expect(categoryNames).toEqual(['Taxonomy', 'Event']);
            expect(categoryNames).not.toContain('Empty Category');
        });

        it('applies default field fallback attributes for type and hidden', () => {
            const result = mapDigitalSpecimen(mockValidPayload);
            const eventField = result?.mappedData
                .find((category) => category.name === 'Event')
                ?.data.find((field) => field.label === 'Event Date');

            expect(eventField).toEqual({
                label: 'Event Date',
                value: '2023-05-18',
                type: 'string',
                hidden: false,
            });
        });
    });

    describe('mapDigitalSpecimenMedia', () => {
        it('returns digitalMedia array from raw payload', () => {
            const result = mapDigitalSpecimenMedia(mockValidPayload);

            expect(result).toEqual({
                digitalMedia: [
                    {
                        digitalMediaObject: {
                            "@id": "https://doi.org/TEST/K05-DG7-0EM",
                            "ac:accessURI": "https://image.bgbm.org/images/internal/HerbarThumbs/B100630718_1700",
                            "dcterms:format": "image/jpeg",
                        }
                    }
                ],
            });
        });

        it('returns null if digitalSpecimen object does not exist in payload', () => {
            const invalidPayload = {
                data: {
                    attributes: {
                        digitalMedia: [
                            {
                                digitalMediaObject: {
                                    "@id": "https://doi.org/TEST/K05-DG7-0EM",
                                    "ac:accessURI": "https://image.bgbm.org/images/internal/HerbarThumbs/B100630718_1700",
                                    "dcterms:format": "image/jpeg",
                                }
                            }
                        ],
                    },
                },
            };

            expect(mapDigitalSpecimenMedia(invalidPayload)).toBeNull();
        });
    });
});
/* Import test dependencies */
import { screen, render } from 'tests/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';

/* Import components */
import { VirtualCollectionCard } from './VirtualCollectionCard';

/* Mock external utilities */
vi.mock('app/Utilities', () => ({
    RetrieveEnvVariable: vi.fn(() => 'https://doi.org/'),
}));

vi.mock('app/utilities/NomenclaturalUtilities', () => ({
    GetSpecimenNameHTMLLabel: vi.fn((attributes) => `<i>${attributes?.['dwc:scientificName'] || 'Specimen Name'}</i>`),
}));

/* Mock Data */
const mockCollection = {
    id: 'https://doi.org/10.1234/SAMPLE-123',
    attributes: {
        'ods:isKnownToContainMedia': true,
        'ods:hasIdentifications': [
            { 'dwc:typeStatus': 'Holotype' }
        ],
        'ods:hasEvents': [
            {
                'ods:hasLocation': { 'dwc:country': 'Netherlands' },
                'dwc:eventDate': '2023-05-18'
            }
        ],
        'dcterms:rightsHolder': 'Naturalis Biodiversity Center',
        'dwc:scientificName': 'Panthera leo'
    }
};

describe('VirtualCollectionCard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the card details view with sanitized link and attributes', () => {
        render(<VirtualCollectionCard collection={mockCollection} type="details" />);

        /* Verify DOI is stripped from link */
        const cardLink = screen.getByRole('link');
        expect(cardLink).toHaveAttribute('href', '/ds/10.1234/SAMPLE-123');

        /* Check badge */
        expect(screen.getByText('Holotype')).toBeInTheDocument();

        /* Check inner HTML output from helper */
        expect(screen.getByText('Panthera leo')).toBeInTheDocument();

        /* Check metadata details */
        expect(screen.getByText('Netherlands')).toBeInTheDocument();
        expect(screen.getByText('2023-05-18')).toBeInTheDocument();
        expect(screen.getByText('Naturalis Biodiversity Center')).toBeInTheDocument();
    });

    it('displays "No image" fallback container when media flag is false', () => {
        const noMediaCollection = {
            ...mockCollection,
            attributes: {
                ...mockCollection.attributes,
                'ods:isKnownToContainMedia': false,
            }
        };

        render(<VirtualCollectionCard collection={noMediaCollection} type="details" />);

        expect(screen.getByText('No image')).toBeInTheDocument();
    });

    it('renders "Unknown" for date when eventDate is missing', () => {
        const missingDateCollection = {
            ...mockCollection,
            attributes: {
                ...mockCollection.attributes,
                'ods:hasEvents': [
                    {
                        'ods:hasLocation': { 'dwc:country': 'Netherlands' },
                        'dwc:eventDate': null
                    }
                ]
            }
        };

        render(<VirtualCollectionCard collection={missingDateCollection} type="details" />);

        const dateElement = screen.getByText('Unknown');
        expect(dateElement).toBeInTheDocument();
        expect(dateElement.id).toBe('updated-date');
    });
});
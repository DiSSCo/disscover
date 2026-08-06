/* Import test dependencies */
import { screen, render } from 'tests/test-utils';
import { describe, it, expect, vi } from 'vitest';

/* Import components */
import { VirtualCollectionCard } from './VirtualCollectionCard';

/* Import custom hook for mocking */
import { useDigitalSpecimenComplete } from 'hooks/useDigitalSpecimen';

/* Mock external utilities */
vi.mock('app/Utilities', () => ({
    RetrieveEnvVariable: vi.fn(() => 'https://doi.org/'),
}));

vi.mock('app/utilities/NomenclaturalUtilities', () => ({
    GetSpecimenNameHTMLLabel: vi.fn((attributes) => `<i>${attributes?.['dwc:scientificName'] || 'Specimen Name'}</i>`),
}));

/* Mock the hook that VirtualCollectionImage depends on */
vi.mock('hooks/useDigitalSpecimen', () => ({
    useDigitalSpecimenComplete: vi.fn()
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
    it('renders card details and image background when media is present and loaded', () => {
        vi.mocked(useDigitalSpecimenComplete).mockReturnValue({
            data: {
                digitalMedia: [
                    {
                        digitalMediaObject: {
                            'dcterms:format': 'image/jpeg',
                            'ac:accessURI': 'https://example.com/specimen.jpg'
                        }
                    }
                ]
            }
        } as any);

        render(<VirtualCollectionCard collection={mockCollection} type="details" />);

        /* Verify DOI is stripped from link */
        const cardLink = screen.getByRole('link');
        expect(cardLink).toHaveAttribute('href', '/ds/10.1234/SAMPLE-123');

        /* Check badge and metadata details */
        expect(screen.getByText('Holotype')).toBeInTheDocument();
        expect(screen.getByText('Panthera leo')).toBeInTheDocument();
        expect(screen.getByText('Netherlands')).toBeInTheDocument();
        expect(screen.getByText('2023-05-18')).toBeInTheDocument();
        expect(screen.getByText('Naturalis Biodiversity Center')).toBeInTheDocument();
    });

    it('displays "No image" fallback container when media flag is false', () => {
        vi.mocked(useDigitalSpecimenComplete).mockReturnValue({ data: undefined } as any);

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

    it('displays "Error loading image" when hasMedia is true but no JPG is returned', () => {
        vi.mocked(useDigitalSpecimenComplete).mockReturnValue({
            data: {
                digitalMedia: [
                    {
                        digitalMediaObject: {
                            'dcterms:format': 'application/pdf',
                            'ac:accessURI': 'https://example.com/doc.pdf'
                        }
                    }
                ]
            }
        } as any);

        render(<VirtualCollectionCard collection={mockCollection} type="details" />);

        expect(screen.getByText('Error loading image')).toBeInTheDocument();
    });

    it('renders "Unknown" for date when eventDate is missing', () => {
        vi.mocked(useDigitalSpecimenComplete).mockReturnValue({ data: undefined } as any);

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
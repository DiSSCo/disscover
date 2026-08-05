/* Import test dependencies */
import { render, screen } from 'tests/test-utils';
import { describe, it, expect, vi } from 'vitest';

/* Import component & hook */
import { VirtualCollectionImage } from './VirtualCollectionImage';
import { useDigitalSpecimenComplete } from 'hooks/useDigitalSpecimen';

/* Mock dependencies */
vi.mock('app/Utilities', () => ({
    RetrieveEnvVariable: vi.fn(() => 'https://doi.org/'),
}));

vi.mock('hooks/useDigitalSpecimen', () => ({
    useDigitalSpecimenComplete: vi.fn(),
}));

/* Base mock collection */
const baseCollection = {
    id: 'https://doi.org/10.1234/SAMPLE-123',
    attributes: {
        'ods:isKnownToContainMedia': true,
    },
};

describe('VirtualCollectionImage', () => {
    it('renders image container with background image when valid JPEG is present', () => {
        vi.mocked(useDigitalSpecimenComplete).mockReturnValue({
            data: {
                digitalMedia: [
                    {
                        digitalMediaObject: {
                            'dcterms:format': 'image/jpeg',
                            'ac:accessURI': 'https://example.com/specimen.jpg',
                        },
                    },
                ],
            },
        } as any);

        const { container } = render(<VirtualCollectionImage collection={baseCollection} />);

        expect(useDigitalSpecimenComplete).toHaveBeenCalledWith({
            doi: '10.1234/SAMPLE-123',
            enabled: true,
        });

        const imageDiv = container.querySelector('.vc-card-image-container');
        expect(imageDiv).toBeInTheDocument();
        expect(imageDiv).toHaveStyle({ backgroundImage: 'url(https://example.com/specimen.jpg)' });
    });

    it('renders "Error loading image" when hasMedia is true but no JPEG is found', () => {
        vi.mocked(useDigitalSpecimenComplete).mockReturnValue({
            data: {
                digitalMedia: [
                    {
                        digitalMediaObject: {
                            'dcterms:format': 'application/pdf',
                            'ac:accessURI': 'https://example.com/doc.pdf',
                        },
                    },
                ],
            },
        } as any);

        render(<VirtualCollectionImage collection={baseCollection} />);

        expect(screen.getByText('Error loading image')).toBeInTheDocument();
    });

    it('renders "No image" and disables query when isKnownToContainMedia is false', () => {
        vi.mocked(useDigitalSpecimenComplete).mockReturnValue({ data: undefined } as any);

        const noMediaCollection = {
            ...baseCollection,
            attributes: {
                'ods:isKnownToContainMedia': false,
            },
        };

        render(<VirtualCollectionImage collection={noMediaCollection} />);

        expect(useDigitalSpecimenComplete).toHaveBeenCalledWith({
            doi: '10.1234/SAMPLE-123',
            enabled: false,
        });

        expect(screen.getByText('No image')).toBeInTheDocument();
    });

    it('handles image/jpg format variant correctly', () => {
        vi.mocked(useDigitalSpecimenComplete).mockReturnValue({
            data: {
                digitalMedia: [
                    {
                        digitalMediaObject: {
                            'dcterms:format': 'image/jpg',
                            'ac:accessURI': 'https://example.com/specimen_alt.jpg',
                        },
                    },
                ],
            },
        } as any);

        const { container } = render(<VirtualCollectionImage collection={baseCollection} />);

        const imageDiv = container.querySelector('.vc-card-image-container');
        expect(imageDiv).toHaveStyle({ backgroundImage: 'url(https://example.com/specimen_alt.jpg)' });
    });
});
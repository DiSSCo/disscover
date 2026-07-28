/* Import test dependencies */
import { screen, fireEvent, render } from 'tests/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';

/* Import component & mocked modules */
import { DigitalMediaCard } from './DigitalMediaCard';
import { getJpegFromIIIFImages } from 'services/digitalMediaService/getJpegFromIIIFImages';

/* Mock external services & utilities */
vi.mock('services/digitalMediaService/getJpegFromIIIFImages', () => ({
    getJpegFromIIIFImages: vi.fn(),
}));

vi.mock('app/Utilities', () => ({
    RetrieveEnvVariable: vi.fn(() => 'https://doi.org/'),
}));

/* Mock data */
const mockSpecimen = {
    digitalMedia: [
        {
            digitalMediaObject: {
                "@id": "https://doi.org/TEST/K05-DG7-0EM",
                "ac:accessURI": "https://image.bgbm.org/images/internal/HerbarThumbs/B100630718_1700",
                "dcterms:format": "image/jpeg",
            }
        },
        {
            digitalMediaObject: {
                "@id": "https://doi.org/TEST/ZXE-EPN-B0V",
                "ac:accessURI": "https://herbarium.bgbm.org/data/iiif/B100630718/manifest.json",
                "dcterms:format": "application/json",
            }
        },
        {
            digitalMediaObject: {
                "@id": "https://doi.org/TEST/IGNORE",
                "ac:accessURI": "https://example.com/doc.pdf",
                "dcterms:format": "application/pdf",
            }
        }
    ]
};

describe('DigitalMediaCard component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(getJpegFromIIIFImages).mockResolvedValue('https://herbarium.bgbm.org/data/iiif/resolved_image.jpg');
    });

    it('renders the loading placeholder initially before processing images', () => {
        render(<DigitalMediaCard specimen={mockSpecimen} />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('processes images, calls IIIF resolver for json, and renders thumbnails', async () => {
        render(<DigitalMediaCard specimen={mockSpecimen} />);

        const firstThumb = await screen.findByAltText('https://doi.org/TEST/K05-DG7-0EM');
        const secondThumb = await screen.findByAltText('https://doi.org/TEST/ZXE-EPN-B0V');

        expect(firstThumb).toBeInTheDocument();
        expect(secondThumb).toBeInTheDocument();

        /* Check if IIIF service was called specifically for the json format */
        expect(getJpegFromIIIFImages).toHaveBeenCalledTimes(1);
        expect(getJpegFromIIIFImages).toHaveBeenCalledWith(mockSpecimen.digitalMedia[1].digitalMediaObject);

        /* Verify that unsupported formats (e.g. application/pdf) are filtered out */
        const queryUnsupported = screen.queryByAltText('https://doi.org/TEST/IGNORE');
        expect(queryUnsupported).not.toBeInTheDocument();
    });

    it('updates main image background and DOI link path when clicking a thumbnail', async () => {
        render(<DigitalMediaCard specimen={mockSpecimen} />);

        /* Wait for first image thumbnail to load */
        const secondThumb = await screen.findByAltText('https://doi.org/TEST/ZXE-EPN-B0V');
        
        /* Initial link should point to active DOI path of the first image */
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/dm/TEST/K05-DG7-0EM');

        /* Click on the second thumbnail */
        fireEvent.click(secondThumb);

        /* Link should update to match the second image's DOI path */
        expect(link).toHaveAttribute('href', '/dm/TEST/ZXE-EPN-B0V');
    });

    it('handles missing or empty specimen', async () => {
        render(<DigitalMediaCard specimen={null} />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});
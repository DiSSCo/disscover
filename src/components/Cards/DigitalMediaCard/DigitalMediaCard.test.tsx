/* Import test dependencies */
import { screen, render } from 'tests/test-utils';
import { describe, it, expect, vi } from 'vitest';

/* Import component */
import { DigitalMediaCard } from './DigitalMediaCard';

/* Mock @annotorious/react for JS/DOM environment */
vi.mock('@annotorious/react', () => ({
    Annotorious: ({ children }: { children: React.ReactNode }) => <div data-testid="annotorious">{children}</div>,
    OpenSeadragonAnnotator: ({ children }: { children: React.ReactNode }) => <div data-testid="osd-annotator">{children}</div>,
    OpenSeadragonViewer: () => <div data-testid="osd-viewer" />,
    W3CImageFormat: vi.fn(),
}));

/* Mock external utilities */
vi.mock('app/Utilities', () => ({
    RetrieveEnvVariable: vi.fn(() => 'https://doi.org/'),
}));

describe('DigitalMediaCard component', () => {
    const testUri = 'https://image.bgbm.org/images/internal/HerbarThumbs/B100630718_1700';

    it('renders the button and image element when ImageAction is provided', () => {
        const mockAction = vi.fn();
        const { container } = render(<DigitalMediaCard imageUri={testUri} ImageAction={mockAction} />);

        /* Target the styled image container */
        const imageElement = container.querySelector('.digital-media-card-image');
        expect(imageElement).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders the OpenSeadragon viewer when ImageAction is not provided', () => {
        render(<DigitalMediaCard imageUri={testUri} />);

        /* Check that the OpenSeadragon fallback renders */
        expect(screen.getByTestId('osd-viewer')).toBeInTheDocument();
    });

    it('renders fallback placeholder when imageUri is not provided', () => {
        render(<DigitalMediaCard imageUri={null} />);
        
        expect(screen.getByText('Something went wrong with the image')).toBeInTheDocument();
    });
});
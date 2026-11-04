/* Import test dependencies */
import { screen, render } from 'tests/test-utils';
import { describe, it, expect, vi } from 'vitest';

/* Import component */
import { DigitalMediaCard } from './DigitalMediaCard';

/* Import mock data */
import mockAnnotationData from 'tests/mock/annotations/multipleAnnotations.json';


/* Mock @annotorious/react for JS/DOM environment */
vi.mock('@annotorious/react', () => ({
    Annotorious: ({ children }: { children: React.ReactNode }) => <div data-testid="annotorious">{children}</div>,
    OpenSeadragonAnnotator: ({ children }: { children: React.ReactNode }) => <div data-testid="osd-annotator">{children}</div>,
    OpenSeadragonViewer: () => <div data-testid="osd-viewer" />,
    OpenSeadragonAnnotationPopup: () => <div data-testid="a9s-popup" />,
    W3CImageFormat: vi.fn(),
    UserSelectAction: vi.fn(),
    useAnnotator: vi.fn(),
    useSelection: vi.fn(),
}));

/* Mock external utilities */
vi.mock('app/Utilities', () => ({
    RetrieveEnvVariable: vi.fn(() => 'https://doi.org/'),
}));

vi.mock('hooks/useDigitalMedia', () => ({
    useDigitalMediaAnnotations: vi.fn(() => {
        return mockAnnotationData;
    })
}));

describe('DigitalMediaCard component', () => {
    const testUri = 'https://image.bgbm.org/images/internal/HerbarThumbs/B100630718_1700';
    const testId = 'https://doi.org/TEST/145-SXG-KZS';

    it('renders the button and image element when ImageAction is provided', () => {
        const mockAction = vi.fn();
        const { container } = render(<DigitalMediaCard imageUri={testUri} identifier={testId} isDrawingEnabled={false} ImageAction={mockAction} />);

        /* Target the styled image container */
        const imageElement = container.querySelector('.digital-media-card-image');
        expect(imageElement).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders the OpenSeadragon viewer when ImageAction is not provided', () => {
        render(<DigitalMediaCard imageUri={testUri} identifier={testId} isDrawingEnabled={false} />);

        /* Check that the OpenSeadragon fallback renders */
        expect(screen.getByTestId('osd-viewer')).toBeInTheDocument();
    });

    it('renders fallback placeholder when imageUri is not provided', () => {
        render(<DigitalMediaCard imageUri={null} identifier={testId} isDrawingEnabled={false} />);
        
        expect(screen.getByText('Something went wrong with the image')).toBeInTheDocument();
    });
});
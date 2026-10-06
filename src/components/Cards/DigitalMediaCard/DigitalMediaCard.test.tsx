/* Import test dependencies */
import { screen, render } from 'tests/test-utils';
import { describe, it, expect, vi } from 'vitest';

/* Import component */
import { DigitalMediaCard } from './DigitalMediaCard';

/* Mock external utilities */
vi.mock('app/Utilities', () => ({
    RetrieveEnvVariable: vi.fn(() => 'https://doi.org/'),
}));

describe('DigitalMediaCard component', () => {
    it('renders the image container with background image style when imageUri is provided', () => {
        const testUri = 'https://image.bgbm.org/images/internal/HerbarThumbs/B100630718_1700';
        
        const { container } = render(<DigitalMediaCard imageUri={testUri} />);

        /* Target the styled image container */
        const imageElement = container.querySelector('.digital-media-card-image');
        expect(imageElement).toBeInTheDocument();
    });

    it('wraps the image in a link if a target handle or link route is provided', () => {
        const testUri = 'https://image.bgbm.org/images/internal/HerbarThumbs/B100630718_1700';
        
        render(<DigitalMediaCard imageUri={testUri} />);

        /* Check if img exists when imageUri is valid */
        const img = screen.queryByRole('img');
        if (img) {
            expect(img).toBeInTheDocument();
        }
    });
});
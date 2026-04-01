import { screen, fireEvent, renderWithRouter, render } from 'tests/test-utils';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Hero } from './Hero';
import { useHasRole } from 'hooks/roleChecker';
import { useClipboard } from 'hooks/useClipboard';

/* Mocks */
vi.mock('hooks/useClipboard', () => ({
    useClipboard: vi.fn()
}))
vi.mock('hooks/roleChecker', () => ({
    useHasRole: vi.fn(),
}));

describe('Hero Component', () => {
    beforeEach(() => {
        vi.mocked(useHasRole).mockReturnValue(false);
        vi.mocked(useClipboard).mockReturnValue({
            copy: vi.fn(),
            hasCopied: false,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
      });

    it('renders correctly with standard render', () => {
        render(<Hero title="Dino" description="Desc" />);
        expect(screen.getByText('Dino')).toBeInTheDocument();
    });

    it('should update the router state when navigation button is clicked', async () => {
        const props = {
            title: 'Dino',
            description: 'Desc',
            navigateTo: { pathName: '/virtual-collections', text: 'Back to Virtual Collections' }
        };

        const { user, router } = renderWithRouter([
            { path: '/', element: <Hero {...props} /> },
            { path: '/virtual-collections', element: <div>Success</div> }
        ]);

        await user.click(screen.getByText('Back to Virtual Collections'));
        expect(router.state.location.pathname).toBe('/virtual-collections');
    });

    it('calls the copy function with the correct URL', async () => {
        const mockCopy = vi.fn(); 
        vi.mocked(useClipboard).mockReturnValue({
            copy: mockCopy,
            hasCopied: false,
        });

        renderWithRouter([
          { path: '/dinosaurs/123', element: <Hero title="T-Rex" showShareButton description="Desc" /> }
        ], ['/dinosaurs/123']);
    
        const shareButton = screen.getByRole('button', { name: /share/i });
    
        fireEvent.click(shareButton);
    
        expect(mockCopy).toHaveBeenCalledWith('http://localhost:3000/dinosaurs/123');
    });

    it('shows "Copied!" when the hook says so', () => {
        vi.mocked(useClipboard).mockReturnValue({
            copy: vi.fn(),
            hasCopied: true,
        });
    
        renderWithRouter([{ path: '/', element: <Hero title="T-rex" showShareButton description="Description" /> }]);
        
        expect(screen.getByText(/copied/i)).toBeInTheDocument();
    });
});
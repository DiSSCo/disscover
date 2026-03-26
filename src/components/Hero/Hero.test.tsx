import { screen, fireEvent, waitFor, renderWithRouter, render } from 'tests/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Hero } from './Hero';
import { useHasRole } from 'hooks/roleChecker';
import { useClipboard } from 'hooks/useClipboard';

// 1. Create a simple mock function for the copy action
const mockCopy = vi.fn();

// 2. Mock the ENTIRE hook module
vi.mock('hooks/useClipboard', () => ({
  useClipboard: () => ({
    copy: mockCopy,
    hasCopied: false, // We can manually toggle this in a second test if needed
  }),
}));

vi.mock('hooks/roleChecker', () => ({
    useHasRole: vi.fn(),
}));

describe('Hero Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useHasRole).mockReturnValue(false);
    });

    it('renders correctly with standard render', () => {
        // This no longer throws the "context" error because AllTheProviders has MemoryRouter
        render(<Hero title="Dino" description="Desc" />);
        expect(screen.getByText('Dino')).toBeInTheDocument();
    });

    it('should update the router state when navigation button is clicked', async () => {
        const props = {
            title: 'Dino',
            description: 'Desc',
            navigateTo: { pathName: '/target', text: 'Go' }
        };

        const { user, router } = renderWithRouter([
            { path: '/', element: <Hero {...props} /> },
            { path: '/target', element: <div>Success</div> }
        ]);

        await user.click(screen.getByText('Go'));
        expect(router.state.location.pathname).toBe('/target');
    });

    it('calls the copy function with the correct URL', async () => {
        renderWithRouter([
          { path: '/dinosaurs/123', element: <Hero title="T-Rex" showShareButton description="Desc" /> }
        ], ['/dinosaurs/123']);
    
        const shareButton = screen.getByRole('button', { name: /share/i });
    
        fireEvent.click(shareButton);
    
        expect(mockCopy).toHaveBeenCalledWith('http://localhost/dinosaurs/123');
    });

    it('shows "Copied!" when the hook says so', () => {
        // Tell the mock hook to return true for this specific test
        vi.mocked(useClipboard).mockReturnValue({
        copy: vi.fn(),
        hasCopied: true,
        });
    
        renderWithRouter([{ path: '/', element: <Hero title="T" showShareButton description="Desc" /> }]);
        
        expect(screen.getByText(/copied/i)).toBeInTheDocument();
    });
});
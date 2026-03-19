/* Import dependencies */
import { fireEvent, screen } from '@testing-library/react';
import { render } from 'tests/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useNavigate } from 'react-router-dom';

/* Import components */
import { Hero } from './Hero';

/* Import hooks */
import { useHasRole } from 'hooks/roleChecker';

/* Mock router */
vi.mock(import('react-router-dom'), async (importOriginal) => {
    const routerContentToKeep = await importOriginal();
    return {
        ...routerContentToKeep,
        useNavigate: vi.fn(),
    }
});

/* Mock roleChecker */
vi.mock('hooks/roleChecker', () => ({
    useHasRole: vi.fn(),
  }));

/* Mock navigator.clipboard function */
Object.assign(navigator, {
    clipboard: {
        writeText: vi.fn(),
    },
});


describe('Hero Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useHasRole).mockReturnValue(false);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the title, description and a badge if supplied', () => {
        const props = {
            title: 'Wonderful Dinosaurs of the World',
            description: '100 most wonderful dinosaurs of the world',
            badge: ['Reference collection'],
        }
        render(<Hero {...props} />);

        expect(screen.getByText('Wonderful Dinosaurs of the World')).toBeInTheDocument();
        expect(screen.getByText('100 most wonderful dinosaurs of the world')).toBeInTheDocument();
        expect(screen.getByText('Reference collection')).toBeInTheDocument();
    });

    it('should call the navigate function when the navigation button is clicked', async () => {
        /* Mock specific functions */
        const navigate = vi.fn();
        vi.mocked(useNavigate).mockReturnValue(navigate);

        const props = {
            title: 'Wonderful Dinosaurs of the World',
            description: '100 most wonderful dinosaurs of the world',
            badge: ['Reference collection'],
            navigateTo: { pathName: '/fake-url', text: 'Super link' }
        };

        render(<Hero {...props} />);

        /* Find the navigateTo button and click on it */
        const navButton = screen.getByText('Super link');
        fireEvent.click(navButton);

        /* Assert that the navigate hook has been called with the expected url */
        expect(navigate).toHaveBeenCalledWith('/fake-url');
    });

    it('should copy the current URL to clipboard when the share button is clicked', async () => {
        const props = {
            title: 'Wonderful Dinosaurs',
            description: 'Dino description',
            showShareButton: true // Enable share button
        };
        
        render(<Hero {...props} />);
        
        /* Find share button and click it */
        const shareButton = screen.getByText(/share/i);
        fireEvent.click(shareButton);

        /* globalThis.location.href is localhost:3000 */
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/');
    });
});
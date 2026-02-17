/* Import dependencies */
import { screen } from '@testing-library/react';
import { render } from 'tests/test-utils'
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

/* Import components */
import { Navigation } from './Navigation';
import KeycloakService from 'app/Keycloak';

// Mock the KeycloakService
vi.mock('app/Keycloak', () => ({
    default: {
        IsLoggedIn: vi.fn(),
        Login: vi.fn(),
        Logout: vi.fn(),
    },
}));

describe('Navigation Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the logo and basic navigation items', () => {
        // Default to logged out
        (KeycloakService.IsLoggedIn as any).mockReturnValue(false);
        render(<Navigation />);

        expect(screen.getByRole('link', { name: /disscover/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /specimens/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /virtual\s+collections/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
    });

    describe('When Logged Out', () => {
        beforeEach(() => {
            (KeycloakService.IsLoggedIn as any).mockReturnValue(false);
            render(<Navigation />);
        });

        it('shows the Login button', () => {
            // Use getBy if something should be visible
            expect(screen.getByRole('button', { name: /login\s*\/\s*sign-up/i })).toBeInTheDocument();
        });

        it('does not show Data Export or MyDiSSCover', () => {
            // Use queryBy if something might not be visible
            expect(screen.queryByRole('button', {name: /data\s+export/i })).not.toBeInTheDocument();
            expect(screen.queryByRole('button', { name: /mydisscover/i})).not.toBeInTheDocument();
        });

        it('calls Keycloak Login when login button is clicked', async () => {
            const user = userEvent.setup();
            const loginBtn = screen.getByRole('button', { name: /login\s*\/\s*sign-up/i});

            // Click the button
            await user.click(loginBtn);

            // Check to see if the keycloak mock has been called
            expect(KeycloakService.Login).toHaveBeenCalledTimes(1);
        });
    });

    describe('When Logged In', () => {
        beforeEach(() => {
            (KeycloakService.IsLoggedIn as any).mockReturnValue(true);
            render(<Navigation />);
        });

        it('shows Data Export and MyDiSSCover', () => {
            expect(screen.getByRole('button', {name: /data\s+export/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /mydisscover/i})).toBeInTheDocument();
        });

        it('does NOT show the Login button', () => {
            expect(screen.queryByRole('button', { name: /login\s*\/\s*sign-up/i})).not.toBeInTheDocument();
        });

        it('calls Keycloak Logout when logout is clicked', async () => {
            const user = userEvent.setup({ pointerEventsCheck: 0});

            // Open the dropdown first (Radix UI dropdowns need to be triggered)
            const dropdownTrigger = screen.getByRole('button', {name: /disscover/i});
            await user.click(dropdownTrigger);

            // Find logout button in the dropdown content
            const logoutBtn = await screen.findByRole('menuitem', {name: /logout/i });

            // Click on the logout button
            await user.click(logoutBtn);
            
            expect(KeycloakService.Logout).toHaveBeenCalledTimes(1);
        });
    });
});
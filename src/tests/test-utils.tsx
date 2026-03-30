/* Import dependencies */
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider, RouteObject, MemoryRouter } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { ReactElement, ReactNode } from 'react';

// Use a consistent origin for all tests
Object.defineProperty(window, 'location', {
	value: { origin: 'http://localhost:3000' },
	configurable: true,
  });

/**
 * Standard wrapper for unit tests with Radix theme
 */
const AllTheProviders = ({ children }: { children: ReactNode }) => (
	<Theme hasBackground={false}>
		{children}
	</Theme>
);

/**
 * Wrapper for unit tests with whatever is in AllTheProviders and no real routing needs
 */
export const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => ({
	user: userEvent.setup(),
	...render(ui, { 
		wrapper: ({ children }) => (
		<MemoryRouter>
			<AllTheProviders>{children}</AllTheProviders>
		</MemoryRouter>
		), 
		...options 
	}),
});

/**
 * Wrapper for unit tests that make use of complex routing. Also wrapped in the AllTheProviders wrapper.
 */
export function renderWithRouter(routes: RouteObject[], initialEntries = ['/']) {
    const router = createMemoryRouter(routes, { initialEntries });

    return {
		user: userEvent.setup(),
		router,
		...render(
			<AllTheProviders>
				<RouterProvider router={router} />
			</AllTheProviders>
		),
    };
}

export * from '@testing-library/react';
export { customRender as render };
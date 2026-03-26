import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider, RouteObject, MemoryRouter } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { ReactElement, ReactNode } from 'react';

// Use a consistent origin for all tests
Object.defineProperty(window, 'location', {
  value: { origin: 'http://localhost' },
  configurable: true,
});

/**
 * A standard wrapper that ensures Radix UI and Router context are present.
 * We add 'hasBackground={false}' to Theme to reduce JSDOM rendering noise.
 */
const AllTheProviders = ({ children }: { children: ReactNode }) => (
  <Theme hasBackground={false}>
    {children}
  </Theme>
);

/**
 * Standard render: Use this for basic components that don't need complex routing
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
 * Advanced render: Use this when you need to test navigation or useLocation
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
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';

/**
 * Function to set up every test with the same context including the Router and the Radix Theme
 * @param children Our application components
 * @returns A custom render function that renders the Router and Theme to add context to all tests
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter>
      <Theme>
        {children}
      </Theme>
    </MemoryRouter>
  );
};

/* We create a custom render here that does what the original render does but with our specific context */
const customRender = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
/* We use this render in our tests */
export { customRender as render };

/* Import Components */
import { MemoryRouter as Router } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import 'i18n';

/* Import Store */
import { setupStore } from 'app/store';
import type { AppStore, RootState } from 'app/store';

/* Import Server API */
import Server from './mock/APIMock';


/* Mock API Server */
beforeAll(() => Server.listen());

afterEach(() => Server.resetHandlers());

afterAll(() => Server.close());

/* Mock Keycloak Service */
jest.mock('keycloak/Keycloak.ts', () => {
  const KeycloakService = jest.requireActual('tests/mock/keycloak/KeycloakService.ts');

  return {
    __esModule: true,
    ...KeycloakService,
  };
});

/* This type interface extends the default options for render from RTL, as well
as allows the user to specify other things such as initialState and store */
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  route: string,
  ui: React.ReactElement,
  {
    preloadedState = {},
    /* Automatically create a store instance if no store was passed in */
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <Router initialEntries={[route]}>
          {children}
        </Router>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
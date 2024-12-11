/* Import Components */
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { PreloadedStateShapeFromReducersMapObject } from '@reduxjs/toolkit';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

/* Import Store */
import { setupStore } from 'app/Store';
import type { AppStore, RootState } from 'app/Store';

/* Import Server API */
import Server from 'tests/mock/APIMock';


/* Mock API Server */
beforeAll(() => Server.listen());

afterEach(() => Server.resetHandlers());

afterAll(() => Server.close());

/* Mock Keycloak Service */
vi.mock('app/Keycloak.ts', async () => {
  const KeycloakService = await vi.importMock('tests/mock/keycloak/KeycloakService.ts');

  return {
    __esModule: true,
    ...KeycloakService,
  };
});

/* This type interface extends the default options for render from RTL, as well
as allows the user to specify other things such as initialState and store */
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>
  store?: AppStore
}

interface RenderWithProvidersResult extends RenderResult {
  store: AppStore;
};


export const renderWithProviders = (
  route: string,
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
): RenderWithProvidersResult => {
  const {
    preloadedState = {} as PreloadedStateShapeFromReducersMapObject<RootState>,
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <Router initialEntries={[route]}>
        {children}
      </Router>
    </Provider>
  );

  const renderResult = render(ui, { wrapper: Wrapper, ...renderOptions });

  return {
    ...renderResult,
    store
  };
};
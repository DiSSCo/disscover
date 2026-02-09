/* Import Dependencies */
import './app/i18n';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Theme } from "@radix-ui/themes";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

/* Import Store */
import { setupStore } from './app/Store';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import '@annotorious/react/annotorious-react.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@radix-ui/themes/styles.css";
import 'intro.js/introjs.css';
import 'leaflet/dist/leaflet.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-tabs/style/react-tabs.css';

/* Import Boot file */
import Boot from 'app/Boot';

/* Import Components */
import App from './App';
import Loading from 'components/Loading';


/* Define axios base url */
axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api`;
/* Set up queryClient for TanStack query */
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/**
 * Function for rendering the root of the application
 */
const RenderRoot = (bootState?: {
  aggregations: Dict,
}) => {
  if (bootState) {
    root.render(
      <QueryClientProvider client={queryClient}>
        <Provider store={setupStore()}>
          <Theme accentColor="indigo" grayColor="sand" radius="large" scaling="95%">
            <App bootState={bootState} />
          </Theme>
        </Provider>
      </QueryClientProvider>
    );
  } else {
    root.render(
      <Loading />
    );
  }
};

RenderRoot();

/* Boot application */
Boot(RenderRoot);
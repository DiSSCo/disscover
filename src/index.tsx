/* Import Dependencies */
import './app/i18n';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

/* Import Store */
import { setupStore } from './app/Store';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import '@annotorious/react/annotorious-react.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/**
 * Function for rendering the root of the application
 */
const RenderRoot = (bootState?: {
  aggregations: Dict,
  phylopicBuild: number
}) => {
  if (bootState) {
    root.render(
      <Provider store={setupStore()}>
        <App bootState={bootState} />
      </Provider>
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
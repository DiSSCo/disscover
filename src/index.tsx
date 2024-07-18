/* Import Dependencies */
import './app/i18n';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

/* Import Utilities */
import KeycloakService from 'app/Keycloak';

/* Import Store */
import { setupStore } from './app/Store';

/* Import Styles */
import '@annotorious/react/annotorious-react.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'intro.js/introjs.css';
import 'leaflet/dist/leaflet.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-tabs/style/react-tabs.css';

/* Import Components */
import App from './App';


/* Define axios base url */
axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/v1`;


/**
 * Function for rendering the root of the application
 */
const RenderRoot = () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <Provider store={setupStore()}>
      <App />
    </Provider>
  );
};

/* Initiate keycloak which will render the root after receiving the user token */
KeycloakService.InitKeyCloak(RenderRoot);
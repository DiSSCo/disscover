/* Import Dependencies */
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import axios from "axios";
import KeycloakService from 'keycloak/Keycloak';
import './i18n';

/* Import Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'leaflet/dist/leaflet.css'

/* Import Components */
import App from './App';


axios.defaults.baseURL = process.env.REACT_APP_AXIOS_URL;

const RenderRoot = () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <Provider store={setupStore()}>
      <App />
    </Provider>
  );
}

KeycloakService.InitKeyCloak(RenderRoot);
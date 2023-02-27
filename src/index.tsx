/* Import Dependencies */
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import axios from "axios";
import KeycloakService from 'keycloak/Keycloak';

/* Import Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

/* Import Components */
import App from './App';


axios.defaults.baseURL = process.env.REACT_APP_AXIOS_URL;

const RenderRoot = () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

KeycloakService.InitKeyCloak(RenderRoot);
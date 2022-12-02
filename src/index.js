import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserService from "./keycloak/Keycloak.js";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";


axios.defaults.baseURL = process.env.REACT_APP_AXIOS_URL;

const RenderRoot = () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));

    root.render(
        <App />
    );
}

UserService.InitKeyCloak(RenderRoot);
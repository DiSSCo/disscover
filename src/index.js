import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserService from "./keycloak/Keycloak.js";
import axios from "axios";


axios.defaults.baseURL = "https://sandbox.dissco.tech/api/v1";

const RenderRoot = () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));

    root.render(
        <App />
    );
}

UserService.initKeyCloak(RenderRoot);
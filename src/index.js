import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserService from "./keyCloak/Keycloak.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

UserService.initKeyCloak(root);
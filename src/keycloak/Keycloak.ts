/* Import Dependencies */
import Keycloak from 'keycloak-js';

/* Import Types */
import { EmptyCallback } from 'app/Types';


const keycloak = new Keycloak({
    url: "https://login-demo.dissco.eu/auth",
    realm: "dissco",
    clientId: "orchestration-service"
});

const InitKeyCloak = (callback?: EmptyCallback, token?: string) => {
    keycloak.init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
        pkceMethod: "S256",
        token: token,
        refreshToken: token
    })
        .then((authenticated) => { 
            if (!authenticated) {
                console.log("User is not authenticated");
            }

            if (callback) {
                callback();
            }
        })
        .catch(console.error);
}

const Login = keycloak.login;

const Logout = keycloak.logout;

const GetToken = () => keycloak.token;

const GetParsedToken = () => keycloak.tokenParsed;

const IsLoggedIn = () => !!keycloak.token;

const UpdateToken = (successCallback: EmptyCallback) =>
    keycloak.updateToken(5)
        .then(successCallback)
        .catch(Login);

const GetSubject = () => keycloak.subject;

const HasRole = (roles: any) => roles.some((role: any) => keycloak.hasRealmRole(role));

const KeycloakService = {
    InitKeyCloak,
    Login,
    Logout,
    IsLoggedIn,
    GetToken,
    GetParsedToken,
    GetSubject,
    UpdateToken,
    HasRole
};

export default KeycloakService;
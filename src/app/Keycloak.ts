/* Import Dependencies */
import Keycloak from 'keycloak-js';


/* Callback type */
type Callback = () => Function | void;

/* Create keycloak instance */
const keycloak = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_SERVER,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
});

const InitKeyCloak = (callback?: Callback, token?: string) => {
    keycloak.init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
        pkceMethod: "S256",
        scope: 'roles profile email',
        token: token,
        refreshToken: token
    })
        .then((authenticated) => {
            if (!authenticated) {
                console.info("User is not authenticated");
            }

            callback?.();
        })
        .catch((error) => {
            console.error(error);

            callback?.();
        });
}

const Login = keycloak.login;

const Logout = keycloak.logout;

const GetToken = () => keycloak.token;

const GetParsedToken = () => keycloak.idTokenParsed;

const IsLoggedIn = () => !!keycloak.token;

const UpdateToken = (successCallback: Callback) =>
    keycloak.updateToken(5)
        .then(successCallback)
        .catch(Login);

const GetSubject = () => keycloak.subject;

const HasRole = (roles: any) => roles.some((role: any) => keycloak.hasResourceRole(role));

keycloak.onTokenExpired = () => {
    Logout();
}

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
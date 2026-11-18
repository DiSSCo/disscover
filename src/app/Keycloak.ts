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

/* Subscribers for React useSyncExternalStore */
const listeners = new Set<() => void>();
const notifyListeners = () => listeners.forEach((listener) => listener());

const Subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

const InitKeyCloak = (callback?: Callback, token?: string, refreshToken?: string) => {
    keycloak.init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
        pkceMethod: "S256",
        scope: 'roles profile email',
        token: token,
        refreshToken: refreshToken
    })
        .then((authenticated) => {
            if (!authenticated) {
                console.info("User is not authenticated");
            }
            notifyListeners();
            callback?.();
        })
        .catch((error) => {
            console.error(error);
            notifyListeners();
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
        .then((refreshed) => {
            if (refreshed) notifyListeners();
            successCallback();
        })
        .catch(Login);

const GetSubject = () => keycloak.subject;

const HasRole = (roles: any) => roles.some((role: any) => keycloak.hasResourceRole(role));

/* Listen to Keycloak auth state changes */
keycloak.onAuthSuccess = notifyListeners;
keycloak.onAuthRefreshSuccess = notifyListeners;
keycloak.onAuthLogout = notifyListeners;
keycloak.onAuthError = notifyListeners;

/* Update keycloak with token that lasts 30 min */
keycloak.onTokenExpired = () => {
    keycloak.updateToken(30)
        .then((refreshed) => {
            if (refreshed) notifyListeners();
        })
        .catch(() => {
            console.error('Failed to refresh token, logging out...');
            notifyListeners();
            keycloak.logout();
        });
};

const KeycloakService = {
    InitKeyCloak,
    Login,
    Logout,
    IsLoggedIn,
    GetToken,
    GetParsedToken,
    GetSubject,
    UpdateToken,
    HasRole,
    Subscribe
};

export default KeycloakService;
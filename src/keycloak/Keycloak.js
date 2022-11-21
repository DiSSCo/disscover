import Keycloak from "keycloak-js";

/* Import API */
import GetUser from "api/user/GetUser";
import InsertUser from "api/user/InsertUser";


const keycloak = new Keycloak({
    url: "https://login-demo.dissco.eu/auth",
    realm: "dissco",
    clientId: "orchestration-service"
});

let disscoUser = localStorage.getItem('disscoUser');

const initKeyCloak = (callback) => {
    keycloak.init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
        pkceMethod: "S256"
    })
        .then((authenticated) => {
            if (!authenticated) {
                console.log("User is not authenticated");
            } else {
                /* Check if user exists in database */
                if (!disscoUser || disscoUser !== keycloak.subject) {
                    GetUser(keycloak.token, keycloak.subject, Process);

                    function Process(result) {
                        if (!result) {
                            InsertUser(keycloak.token, keycloak.subject, keycloak.tokenParsed, SetDisscoUser);
                        } else {
                            SetDisscoUser(keycloak.subject)
                        }
                    }

                    function SetDisscoUser(userId) {
                        localStorage.setItem('disscoUser', userId);
                    }
                }
            }

            callback();
        })
        .catch(console.error);
}

const doLogin = keycloak.login;

function doLogout() {
    localStorage.removeItem('disscoUser');

    keycloak.logout();
}

const getToken = () => keycloak.token;

const isLoggedIn = () => !!keycloak.token;

const updateToken = (successCallback) =>
    keycloak.updateToken(5)
        .then(successCallback)
        .catch(doLogin);

const getUsername = () => keycloak.tokenParsed?.preferred_username;

const getGivenName = () => keycloak.tokenParsed?.given_name;

const getFamilyName = () => keycloak.tokenParsed?.family_name;

const getSubject = () => keycloak.subject;

const getDisscoUser = () => keycloak.disscoUser;

const hasRole = (roles) => roles.some((role) => keycloak.hasRealmRole(role));

const UserService = {
    initKeyCloak,
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    getSubject,
    updateToken,
    getUsername,
    getGivenName,
    getFamilyName,
    getDisscoUser,
    hasRole
};

export default UserService;
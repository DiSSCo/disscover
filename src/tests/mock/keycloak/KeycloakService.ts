/* This is a Mock for the Keycloak Service module */

const Login = () => {
    return true;
};

const Logout = () => {
    return true;
};

const GetToken = () => {
    return 'KeycloakToken';
}

const IsLoggedIn = () => {
    return true;
}

const GetSubject = () => {
    return 'SubjectId';
}

const KeycloakService = {
    Login,
    Logout,
    IsLoggedIn,
    GetToken,
    GetSubject
};

export default KeycloakService;
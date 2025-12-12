/* This is a Mock for the Keycloak Service module */

const Login = () => {
    return true;
};

const Logout = () => {
    return true;
};

const GetToken = () => {
    return 'KeycloakToken';
};

const GetParsedToken = () => ({
    orcid: 'https://orcid.org/0000-0000-0000-0000',
    given_name: 'Pietje',
    family_name: 'Puk'
});

const IsLoggedIn = () => {
    return true;
};

const GetSubject = () => {
    return 'SubjectId';
};

const KeycloakService = {
    Login,
    Logout,
    IsLoggedIn,
    GetToken,
    GetParsedToken,
    GetSubject
};

export default KeycloakService;
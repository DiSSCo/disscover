import * as KeycloakMock from "keycloak-mock";


const MockKeycloakService = async () => {
  const keycloak = await KeycloakMock.createMockInstance({
    authServerURL: "https://login-demo.dissco.eu/auth",
    realm: "dissco",
    clientID: "orchestration-service",
    clientSecret: "secret"
  });

  // all requests to `https://myserver.com/auth` will now be
  // intercepted and replied to
  const mock = KeycloakMock.activateMock(keycloak);

  // create a user and a token for it
  const user = keycloak.database.createUser({
    firstName: "test",
    lastName: 'test',
    email: "hello@hello.com", // username will be email
    credentials: [{ value: "mypassword", }],
  });

  const token = keycloak.createBearerToken(user.profile.id);

  // get active mock without a reference
  const sameMock = KeycloakMock.getMock("https://login-demo.dissco.eu/auth");

  // clear user database
  mock.instance.database.clear();

  // de-activate the mock
  KeycloakMock.deactivateMock(sameMock);

  return token;
}

export default MockKeycloakService;
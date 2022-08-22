import UserService from 'keycloak/Keycloak';

/* Import Components*/
import LoginButton from './LoginButton';


const Login = () => {
    function Login() {
        UserService.doLogin();
    }

    return (
        <LoginButton login={Login} />
    );
}

export default Login;
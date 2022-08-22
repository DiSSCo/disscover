function LoginButton(props) {
    return(
        <button className="loginButton" onClick={() => props.login()}>
            Login
        </button>
    );
}

export default LoginButton;
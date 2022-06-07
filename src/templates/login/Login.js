import { useState } from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import './login.css';

/* Import Components*/
import LoginButton from './LoginButton';

const Login = () => {
    function HandleLogin() {
        window.location.href = 'https://login-demo.dissco.eu/auth/admin/dissco/console/#/realms/dissco/clients';
    }

    return (
        <LoginButton onClick={HandleLogin} />
    );
}

export default Login;
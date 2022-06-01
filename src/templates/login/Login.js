import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './login.css';

/* Import Components*/
import LoginButton from './LoginButton';

const Login = () => {
    const [show, setShow] = useState(false);

    function HandleClose() {
        setShow(false);
    }

    function HandleShow() {
        console.log('test');

        setShow(true);
    }

    return (
        <>
            <Modal className="loginModal" show={show} onHide={HandleClose}>
                <Modal.Header>
                    <h1> Titel </h1> 
                </Modal.Header>
                <Modal.Body>
                    <h2> Inhoud </h2>
                </Modal.Body>
            </Modal>

            <LoginButton onClick={HandleShow}/>
        </>
    );
}

export default Login;
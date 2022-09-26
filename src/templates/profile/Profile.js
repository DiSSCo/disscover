import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from 'keycloak/Keycloak';
import './profile.css';

/* Import Components */
import Header from 'templates/header/Header';
import Body from './body/Body';
import Footer from 'templates/footer/Footer';


const Profile = () => {
    const navigate = useNavigate();
    
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (UserService.isLoggedIn()) {
            setLoggedIn(true);
        } else {
            navigate('/');
        }
    }, []);

    if (loggedIn) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />

                <Body />

                <Footer />
            </div>
        );
    }
}

export default Profile;
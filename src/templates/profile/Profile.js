import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from 'keycloak/Keycloak';
import './profile.scss';

/* Import Components */
import Header from 'templates/header/Header';
import Body from './body/Body';
import Footer from 'templates/footer/Footer';


const Profile = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [loggedIn, setLoggedIn] = useState(false);

    /* Try to create a user profile from provided information */
    const [userProfile, setUserProfile] = useState({
        username: 'Unknown'
    });

    useEffect(() => {
        const copyUserProfile = { ...userProfile };

        /* Check if user id is given as a parameter, else if check if logged in, else redirect to home */
        if (params['id']) {
            copyUserProfile['id'] = params['id'];

            copyUserProfile['username'] = "Undefined";
            copyUserProfile['givenName'] = "";
            copyUserProfile['familyName'] = "";

            setUserProfile(copyUserProfile);
            setLoggedIn(true);
        } else if (UserService.isLoggedIn()) {
            copyUserProfile['token'] = UserService.getToken();
            copyUserProfile['id'] = UserService.getSubject();

            if (UserService.getUsername()) {
                copyUserProfile['username'] = UserService.getUsername();
            }

            copyUserProfile['givenName'] = UserService.getGivenName();
            copyUserProfile['familyName'] = UserService.getFamilyName();

            setUserProfile(copyUserProfile);
            setLoggedIn(true);
        } else {
            navigate('/');
        }
    }, []);

    if (loggedIn || params['id']) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />

                <Body userProfile={userProfile} />

                <Footer page={"notHome"} />
            </div>
        );
    }
}

export default Profile;
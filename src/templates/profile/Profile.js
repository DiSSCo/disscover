import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from 'keycloak/Keycloak';
import './profile.scss';

/* Import Components */
import Header from 'templates/header/Header';
import Body from './body/Body';
import Footer from 'templates/footer/Footer';

/* Import API */
import GetUser from 'api/user/GetUser';


const Profile = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [loggedIn, setLoggedIn] = useState(false);

    /* Try to create a user profile from provided information */
    const [userProfile, setUserProfile] = useState({
        username: 'Unknown'
    });

    useEffect(() => {
        /* Check if user id is given as a parameter, else if check if logged in, else redirect to home */
        if (params['id'] || UserService.isLoggedIn()) {
            let userId;

            if (params['id']) {
                userId = params['id'];
            } else {
                userId = UserService.getSubject();
            }

            GetUser(UserService.getToken(), userId, Process);

        } else {
            navigate('/');
        }

        function Process(userData) {
            const copyUserProfile = {
                ...userProfile,
                id: userData['data']['id'],
                firstName: userData['data']['attributes']['firstName'],
                lastName: userData['data']['attributes']['lastName'],
                email: userData['data']['attributes']['email'],
                orcid: userData['data']['attributes']['orcid'],
                organization: userData['data']['attributes']['organization']
            };

            setUserProfile(copyUserProfile);
            setLoggedIn(true);
        }
    }, []);

    if (loggedIn || params['id']) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />

                <Body userProfile={userProfile} 
                    SetUserProfile={(userProfile) => setUserProfile(userProfile)}
                />

                <Footer page={"notHome"} />
            </div>
        );
    }
}

export default Profile;
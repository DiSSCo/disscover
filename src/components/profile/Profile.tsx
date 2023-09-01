/* Import Dependencies */
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import KeycloakService from 'keycloak/Keycloak';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getUser, setUserProfile } from "redux/user/UserSlice";

/* Import Styles */
import styles from './profile.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import Passport from './components/user/Passport';
import ProfileContent from './components/ProfileContent';
import Footer from 'components/general/footer/Footer';


const Profile = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();

    /* Base Variables */
    const user = useAppSelector(getUser);

    /* OnLoad: Check if user id is given as a parameter, else check if logged in, else redirect to home */
    useEffect(() => {
        if (KeycloakService.IsLoggedIn()) {
            if (!isEmpty(user)) {
                dispatch(setUserProfile(user));
            }
        } else {
            if (params['userId']) {
                /* Future Development: Grab foreign user details (and annotations) and display information */
            } else {
                navigate('/');
            }
        }
    }, [user]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Container fluid className={`${styles.profileContent} mt-5`}>
                <Row className="justify-content-center h-100">
                    <Col lg={{ span: 3 }} className="position-relative h-100">
                        <Passport />
                    </Col>

                    <Col lg={{ span: 7 }} className="h-100">
                        <ProfileContent />
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Profile;
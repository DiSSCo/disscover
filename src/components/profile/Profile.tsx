/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import KeycloakService from 'keycloak/Keycloak';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getUser } from 'redux/user/UserSlice';

/* Import Types */
import { User, Annotation } from 'global/Types';

/* Import Styles */
import './profile.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import UserInfo from './components/user/UserInfo';
import UserStatistics from './components/user/UserStatistics';
import AnnotationsOverview from './components/annotate/AnnotationsOverview';
import Footer from 'components/general/footer/Footer';

/* Import API */
import GetUserAnnotations from 'api/user/GetUserAnnotations';


const Profile = () => {
    /* Hooks */
    const navigate = useNavigate();
    const params = useParams();

    /* Base Variables */
    const user = useAppSelector(getUser);
    const [userProfile, setUserProfile] = useState<User>({} as User);
    const [userProfileAnnotations, setUserProfileAnnotations] = useState<Annotation[]>([]);

    /* OnLoad: Check if user id is given as a parameter, else check if logged in, else redirect to home */
    useEffect(() => {
        if (KeycloakService.IsLoggedIn()) {
            if (Object.keys(user).length > 0) {
                setUserProfile(user);

                CheckAnnotations(user);
            }
        } else {
            if (params['userId']) {
                /* Future Development: Grab foreign user details (and annotations) and display information */
            } else {
                navigate('/');
            }
        }
    }, [user]);

    /* Function for checking Annotations of given User */
    const CheckAnnotations = (user: User) => {
        /* Future Development: replace with general function for getting user annotations */

        /* TEMPORARY CONSOLE LOG FOR SONAR */
        console.log(user);

        GetUserAnnotations(KeycloakService.GetToken()).then((annotations) => {
            if (annotations) {
                setUserProfileAnnotations(annotations);
            }
        });
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Container fluid className="h-100">
                <Row className="mt-5">
                    <Col md={{ span: 5, offset: 1 }}>
                        <Row>
                            <Col md={{ span: 9 }}>
                                <UserInfo userProfile={userProfile}
                                    SetUserProfile={(userProfile: User) => setUserProfile(userProfile)}
                                />
                            </Col>
                        </Row>

                        <Row className="mt-5">
                            <Col md={{ span: 12 }}>
                                <UserStatistics />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={{ span: 5 }}>
                        <Tabs defaultActiveKey="annotations">
                            <Tab eventKey="annotations" title="Annotations">
                                <AnnotationsOverview userProfileAnnotations={userProfileAnnotations} />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Profile;
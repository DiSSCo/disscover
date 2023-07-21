/* Import Dependencies */
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classNames from 'classnames';
import KeycloakService from 'keycloak/Keycloak';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getUser, getUserProfile, setUserProfile } from "redux/user/UserSlice";

/* Import Styles */
import styles from './profile.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import UserInfo from './components/user/UserInfo';
import AnnotationsOverview from './components/annotate/AnnotationsOverview';
import Footer from 'components/general/footer/Footer';


const Profile = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();

    /* Base Variables */
    const user = useAppSelector(getUser);
    const userProfile = useAppSelector(getUserProfile);

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

    /* Class Name for Tabs */
    const classTabsList = classNames({
        [`${styles.tabsList}`]: true
    });

    const classTab = classNames({
        'react-tabs__tab': true,
        [`${styles.tab}`]: true
    });

    const classSelectedTab = classNames({
        [`${styles.tabSelected}`]: true
    });

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Container fluid className={`${styles.profileContent} mt-5`}>
                {!isEmpty(userProfile) &&
                    <Row className="h-100 justify-content-center">
                        <Col md={{ span: 5 }} className={`${styles.profileBody} pb-1 border-1-primary-light rounded h-100`}>
                            <Row>
                                <Col className={`${styles.profileTop} position-relative d-flex justify-content-center`}>
                                    <div className={`${styles.profilePicture} rounded-circle text-white position-absolute 
                                    d-flex align-items-center justify-content-center`}
                                    >
                                        {userProfile.firstName ? userProfile.firstName[0].toUpperCase() : 'U'}
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mt-5">
                                <Col className="py-1 fw-bold">
                                    <p className={`${styles.profileTitle} text-center`}>
                                        {(userProfile.firstName && userProfile.lastName) ?
                                            <> {`${userProfile.firstName} ${userProfile.lastName}`} </>
                                            : <> User Profile </>
                                        }
                                    </p>
                                    <p className={`${styles.profileSubTitle} text-center`}> {userProfile['id']} </p>
                                </Col>
                            </Row>

                            <Tabs className={styles.tabs} selectedTabClassName={classSelectedTab}>
                                <TabList className={`${classTabsList} d-flex justify-content-center p-0`}>
                                    <Tab className={classTab} selectedClassName={styles.active}> User information  </Tab>
                                    <Tab className={classTab} selectedClassName={styles.active}> Annotations </Tab>
                                </TabList>

                                {/* Search by Digital Specimen */}
                                <TabPanel className="pt-2">
                                    <UserInfo />
                                </TabPanel>

                                {/* Search by Physical Specimen */}
                                <TabPanel className={styles.profileAnnotationsBlock}>
                                    <AnnotationsOverview />
                                </TabPanel>
                            </Tabs>
                        </Col>
                    </Row>
                }
            </Container>

            <Footer />
        </div>
    );
}

export default Profile;
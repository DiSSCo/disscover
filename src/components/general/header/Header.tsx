/* Import Dependencies */
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from "classnames";
import KeycloakService from 'keycloak/Keycloak';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSidePanelToggle } from 'redux/annotate/AnnotateSlice';

/* Import Styles */
import styles from './header.module.scss';

/* Import Components */
import Languages from './components/Languages';
import Login from './components/Login';
import Profile from './components/Profile';


const Header = () => {
    /* Hooks */
    const { t } = useTranslation();
    const location = useLocation();

    /* Base variables */
    const loggedIn = KeycloakService.IsLoggedIn();
    const sidePanelToggle = useAppSelector(getSidePanelToggle);

    /* ClassNames for Header */
    const classHeader = classNames({
        [`${styles.header}`]: true,
        [`${styles.home}`]: location.pathname === '/'
    });

    const classHeaderContent = classNames({
        'col-md-10 offset-md-1': !sidePanelToggle,
        'col-md-12 px-5': sidePanelToggle
    });

    return (
        <Container fluid className={`${classHeader} z-1`}>
            <Row className="h-100">
                <Col className={`${classHeaderContent} pe-0 h-100 transition`}>
                    {/* Title */}
                    <Row className="h-100 w-100 align-items-end">
                        <Col className="col-md-auto p-0 d-flex align-items-center">
                            <h1 className={`${styles.title} fw-bold`}>DiSSCover</h1>
                        </Col>
                        {/* Navigation */}
                        <Col className="pb-3 d-flex justify-content-center">
                            <nav>
                                <Row>
                                    <Col className="col-md-auto d-flex justify-content-center px-5">
                                        <Link to="/">
                                            <p className={`${location.pathname === '/' ? styles.navItemActive : styles.navItem}`}>
                                                Home
                                            </p>
                                        </Link>
                                    </Col>
                                    <Col className="col-md-auto d-flex justify-content-center px-5">
                                        <Link to="/search">
                                            <p className={`${location.pathname.includes('/search') || location.pathname.includes('/ds') ?
                                                styles.navItemActive : styles.navItem}`
                                            }>
                                                {t('specimens')}
                                            </p>
                                        </Link>
                                    </Col>
                                </Row>
                            </nav>
                        </Col>
                        {/* Language Support */}
                        <Col className="col-md-auto pb-3">
                            <Languages />
                        </Col>
                        {/* Login */}
                        {loggedIn ?
                            <Col className="col-md-auto pb-2">
                                <Profile />
                            </Col> :
                            <Col className="col-md-auto pb-3">
                                <Login />
                            </Col>
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;
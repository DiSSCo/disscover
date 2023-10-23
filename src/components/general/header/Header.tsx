/* Import Dependencies */
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import classNames from "classnames";
import KeycloakService from 'keycloak/Keycloak';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector} from 'app/hooks';
import { getSidePanelToggle } from 'redux/annotate/AnnotateSlice';

/* Import Styles */
import styles from './header.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import IntroTopics from './components/IntroTopics';
import Languages from './components/Languages';
import Login from './components/Login';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import CollapseMenu from './components/CollapseMenu';


/* Props Typing */
interface Props {
    introTopics?: { intro: string, title: string }[]
};


const Header = (props: Props) => {
    const { introTopics } = props;

    /* Hooks */
    const location = useLocation();

    /* Base variables */
    const loggedIn = KeycloakService.IsLoggedIn();
    const sidePanelToggle = useAppSelector(getSidePanelToggle);
    const [collapseMenuToggle, setCollapseMenuToggle] = useState(false);

    /* ClassNames */
    const classHeader = classNames({
        [`${styles.header} d-flex flex-column-reverse`]: true,
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
                    <Row className="h-100 w-100 align-items-end">
                        {/* Title */}
                        <Col className="col-md-auto p-0 d-flex align-items-center">
                            <Link to="/">
                                <h1 className="c-primary fw-bold">DiSSCover</h1>
                            </Link>
                        </Col>
                        {/* Desktop version or Tablet/Mobile version */}
                        <Col className="d-md-none d-lg-block">
                            <Row>
                                {/* Navigation */}
                                <Col className="pb-3 d-flex justify-content-center">
                                    <Navigation />
                                </Col>
                                {/* Intro js if intro topics are present */}
                                {introTopics &&
                                    <Col className="col-md-auto pb-3 pe-2">
                                        <IntroTopics introTopics={introTopics} />
                                    </Col>
                                }
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
                        <Col className="d-lg-none mb-2">
                            <Row>
                                {/* Login */}
                                {loggedIn ?
                                    <Col className="d-flex justify-content-end align-items-center">
                                        <Profile />
                                    </Col> :
                                    <Col className="d-flex justify-content-end align-items-center">
                                        <Login />
                                    </Col>
                                }

                                <Col className="col-md-auto d-flex align-items-center">
                                    <FontAwesomeIcon icon={faBars}
                                        className="fs-2 c-primary c-pointer"
                                        onClick={() => setCollapseMenuToggle(true)}
                                    />
                                </Col>

                                <CollapseMenu collapseMenuToggle={collapseMenuToggle}
                                    introTopics={introTopics}
                                    ToggleCollapseMenu={() => setCollapseMenuToggle(!collapseMenuToggle)}
                                />
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;
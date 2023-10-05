/* Import Dependencies */
import classNames from 'classnames';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from '../header.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import Profile from './Profile';
import Login from './Login';
import Navigation from './Navigation';
import Languages from './Languages';
import IntroTopics from './IntroTopics';


/* Props Typing */
interface Props {
    collapseMenuToggle: boolean,
    introTopics?: { intro: string, title: string }[],
    ToggleCollapseMenu: Function
};


const CollapseMenu = (props: Props) => {
    const { collapseMenuToggle, introTopics, ToggleCollapseMenu } = props;

    /* ClassNames */
    const collapseMenuClass = classNames({
        [`${styles.collapseMenu} shadow-c`]: true,
        [`${styles.active}`]: collapseMenuToggle
    });

    return (
        <div className={`${collapseMenuClass} position-absolute top-0 end-0 bgc-main transition pe-5 py-5 z-2`}>
            <Row>
                {/* Close Icon */}
                <Col className="d-flex justify-content-end">
                    <FontAwesomeIcon icon={faX}
                        className="fs-2 c-primary c-pointer"
                        onClick={() => ToggleCollapseMenu()}
                    />
                </Col>
            </Row>
            <Row className="mt-2">
                {/* Login or Profile */}
                {KeycloakService.IsLoggedIn() ?
                    <Col>
                        <Profile />
                    </Col> :
                    <Col>
                        <Login />
                    </Col>
                }
            </Row>
            <Row className="mt-3">
                {/* Navigation */}
                <Col>
                    <Navigation />
                </Col>
            </Row>
            <Row className="mt-3 px-2">
                {/* Languages */}
                <Col>
                    <p className="fs-3 c-primary fw-lightBold"> Language </p>
                    <Languages />
                </Col>
            </Row>
            {introTopics &&
                <Row className="mt-3 px-2">
                    <Col>
                        {/* Take a tour */}
                        <IntroTopics introTopics={introTopics}
                            ToggleCollapseMenu={() => ToggleCollapseMenu()}
                        />
                    </Col>
                </Row>
            }
        </div>
    );
}

export default CollapseMenu;
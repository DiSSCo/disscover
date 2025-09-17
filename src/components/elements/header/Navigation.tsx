/* Import Dependencies */
import classNames from 'classnames';
import KeycloakService from 'app/Keycloak';
import { Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

/* Import Styles */
import styles from './header.module.scss';


/**
 * Local component file for rendering the navigation in the header
 * @returns JSX Component
 */
const Navigation = () => {
    /* Hooks */
    const location = useLocation();

    /**
     * Function that returns a ClassName for a nav item, active is appointed if the page is currently opened
     * @returns ClassName
     */
    const NavItemClass = (navKey: string) => {
        return classNames({
            [`${styles.navItem}`]: true,
            [`${styles.active}`]: location.pathname.includes(navKey) || (navKey === 'home' && location.pathname === '/')
        });
    };

    return (
        <div className="h-100">
            <Row className="h-100 justify-content-center">
                {/* Link to Home */}
                <Col lg="auto"
                    className="d-flex justify-content-end align-items-center"
                >
                    <Link to="/">
                        <p className={NavItemClass('home')}>Home</p>
                    </Link>
                </Col>
                {/* Link to Search */}
                <Col lg="auto"
                    className="d-flex align-items-center px-5"
                >
                    <Link to="/search">
                        <p className={NavItemClass('search')}>All Specimens</p>
                    </Link>
                </Col>
                {/* Link to Virtual Collections */}
                <Col lg="auto"
                    className="d-flex align-items-center px-5"
                >
                    <Link to="/virtual-collections">
                        <p className={NavItemClass('virtualCollections')}>Virtual Collections</p>
                    </Link>
                </Col>
                {/* Link to About */}
                <Col lg="auto"
                    className="d-flex align-items-center pe-5"
                >
                    <Link to="/about">
                        <p className={NavItemClass('about')}>About</p>
                    </Link>
                </Col>
                {/* Link to Data Export if logged in */}
                {KeycloakService.IsLoggedIn() &&
                    <Col lg="auto"
                        className="d-flex align-items-center"
                    >
                        <Link to="/data-export">
                            <p className={NavItemClass('dataExport')}>Data Export</p>
                        </Link>
                    </Col>
                }
            </Row>
        </div>
    );
};

export default Navigation;
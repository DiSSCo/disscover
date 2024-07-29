/* Import Dependencies */
import classNames from 'classnames';
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
            <Row className="h-100">
                {/* Link to Home */}
                <Col className="d-flex justify-content-end align-items-center pe-5">
                    <Link to="/">
                        <p className={NavItemClass('home')}>Home</p>
                    </Link>
                </Col>
                {/* Link to Search */}
                <Col className="d-flex align-items-center ps-5">
                    <Link to="/search">
                        <p className={NavItemClass('search')}>All Specimens</p>
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

export default Navigation;
/* Import Dependencies */
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppDispatch } from 'app/hooks';
import { setSearchSpecimen } from 'redux/search/SearchSlice';

/* Import Types */
import { Specimen } from 'global/Types';

/* Import Styles */
import styles from '../header.module.scss';


const Navigation = () => {
    /* Hooks */
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const location = useLocation();

    /* ClassNames */
    const classNavItemHome = classNames({
        'fs-3 c-pointer': true,
        [`${styles.navItemActive}`]: location.pathname === '/',
        [`${styles.navItem}`]: location.pathname !== '/',
    });

    const classNavItemSpecimens = classNames({
        'fs-3 c-pointer': true,
        [`${styles.navItemActive}`]: location.pathname === '/search' || location.pathname === '/ds',
        [`${styles.navItem}`]: location.pathname !== '/search' && location.pathname !== '/ds',
    });

    return (
        <nav>
            <Row>
                <Col className="col-md-12 d-lg-none px-4 mb-2">
                    <p className="fs-3 c-primary fw-lightBold"> Navigate to </p>
                </Col>
                <Col className="col-lg-auto col-md-12 px-lg-5 px-4">
                    <Link to="/">
                        <p className={classNavItemHome}>
                            Home
                        </p>
                    </Link>
                </Col>
                <Col className="col-lg-auto col-md-12 px-lg-5 px-4">
                    <Link to="/search" onClick={() => {
                        if (!(location.pathname.includes('search'))) {
                            dispatch(setSearchSpecimen({} as Specimen));
                        }
                    }}>
                        <p className={classNavItemSpecimens}>
                            {t('specimens')}
                        </p>
                    </Link>
                </Col>
            </Row>
        </nav>
    );
}

export default Navigation;
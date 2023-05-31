/* Import Depndencies */
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Styles */
import styles from './breadCrumbs.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


/* Typing */
interface Crumb {
    crumb: string,
    path?: string
}


const BreadCrumbs = () => {
    /* Hooks */
    const location = useLocation();

    /* Base variables */
    const breadCrumbs: Crumb[] = [];
    const pathList = location.pathname.slice(1).split('/');
    const specimen = useAppSelector(getSpecimen);

    /* Format Bread Crumbs */
    if (pathList[0] === 'ds') {
        /* Specimen Page */
        let path: string = '/search';

        if (location.state?.filters) {
            path = `/search?${location.state.filters}`;
        }

        breadCrumbs.push({
            crumb: 'Specimens',
            path: path
        });

        breadCrumbs.push({
            crumb: specimen.specimenName
        });
    } else if (pathList[0] === 'search') {
        /* Search Page */
        breadCrumbs.push({
            crumb: 'Specimens',
            path: '/search'
        });

        /* Check for Sub Pages */
        if (pathList[1] === 'compare') {
            breadCrumbs.push({
                crumb: 'Compare specimens'
            });
        }
    }

    return (
        <Row>
            {breadCrumbs.map((breadCrumb, index) => {
                return (
                    <Col key={breadCrumb.crumb} className={`${styles.breadCrumbs} col-md-auto pe-0 fw-lightBold`}>
                        {breadCrumb.path ?
                            <Link to={breadCrumb.path}>
                                {breadCrumb.crumb}
                            </Link>
                            :
                            <span>
                                {breadCrumb.crumb}
                            </span>
                        }

                        {(index + 1) < breadCrumbs.length &&
                            <FontAwesomeIcon icon={faChevronRight}
                                className={`${styles.breadCrumbIcon} ms-2`}
                            />
                        }
                    </Col>
                );
            })}
        </Row>
    );
}

export default BreadCrumbs;
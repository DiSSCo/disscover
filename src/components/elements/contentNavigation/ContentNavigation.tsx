/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from 'react';

/* Import Utilities */
import { RetrieveEnvVariable } from 'app/Utilities';

/* Import Hooks */
import { useAppDispatch, useAppSelector } from 'app/Hooks';

/* Import Store */
import { getDigitalSpecimen } from 'redux-store/DigitalSpecimenSlice';
import { getSearchUrl, setSearchDigitalSpecimen } from 'redux-store/SearchSlice';

/* Import Icons */
import { faChevronRight, faChevronLeft, faList, IconDefinition, faHome } from '@fortawesome/free-solid-svg-icons';


/* Bread crumb type */
type BreadCrumb = {
    crumb: string,
    path: string
    icon?: IconDefinition,
    onDigitalSpecimen?: boolean
}


/**
 * Component that renders bread crumbs based upon the current location
 * @returns JSX Component
 */
const ContentNavigation = () => {
    /* Hooks */
    const location = useLocation();
    const dispatch = useAppDispatch();

    /* Base variables */
    const digitalSpecimen = useAppSelector(getDigitalSpecimen);
    const searchUrl = useAppSelector(getSearchUrl);
    const breadCrumbs: BreadCrumb[] = [];

    /* Clean up digital specimen in store from search to start fresh */
    useEffect(() => {
        if (digitalSpecimen) {
            dispatch(setSearchDigitalSpecimen(undefined));
        }; 
    }, []);

    /* Construct bread crumbs based on location */
    location.pathname.slice(1).split('/').forEach((pathPart) => {
        switch (pathPart) {
            case 'search': {
                breadCrumbs.push({
                    crumb: 'Back to home',
                    path: '/',
                    icon: faHome,
                });

                break;
            } case 'ds': {
                breadCrumbs.push({
                    crumb: 'Back to list',
                    path: searchUrl || '/search', // specifiek search url
                    icon: faList,
                    onDigitalSpecimen: true
                });

                break;
            } case 'dm': {
                breadCrumbs.push({
                    crumb: 'Back to digital specimen',
                    path: `/ds/${digitalSpecimen?.['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')}`
                });

                break;
            }
        };
    });

    return (
        <div>
            <Row className="mb-2">
                {breadCrumbs.map((breadCrumb, index) => (
                    <Col key={breadCrumb.crumb}
                        lg="auto"
                        className={`${index > 0 ? 'ps-0' : ''} pe-0`}
                    >

                        {/* Bread crumb */}
                        {breadCrumb.icon ?
                            <Link to={breadCrumb.path}>
                                <FontAwesomeIcon icon={breadCrumb.icon} className="fs-4 tc-secondary fw-lightBold pe-2"/>
                                <span className="fs-4 tc-secondary fw-lightBold pe-2">{breadCrumb.crumb}</span>
                            </Link>
                        :
                    
                            <Link to={breadCrumb.path}>
                                <span className="fs-4 tc-secondary fw-lightBold pe-2">{breadCrumb.crumb}</span>
                            </Link>
                        }
                    </Col>
                ))}
                <Col>
                    <Link to="">
                        <FontAwesomeIcon icon={faChevronLeft} className="fs-4 tc-secondary fw-lightBold pe-2"/>
                        <span className="fs-4 tc-secondary fw-lightBold pe-2">Previous</span>
                    </Link>
                    <span className="fs-4 tc-secondary fw-lightBold pe-2">        </span>
                    <Link to="">
                        <span className="fs-4 tc-secondary fw-lightBold pe-2">Next</span>
                        <FontAwesomeIcon icon={faChevronRight} className="fs-4 tc-secondary fw-lightBold pe-2" />
                    </Link>
                </Col>
            </Row>
        </div>
    );
};

export default ContentNavigation;
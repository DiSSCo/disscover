/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import { useLocation, Link } from "react-router-dom";

/* Import Hooks */
import { useAppSelector } from 'app/Hooks';

/* Import Store */
import { getDigitalSpecimen } from 'redux-store/DigitalSpecimenSlice';

/* Import Icons */
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


/* Bread crumb type */
type BreadCrumb = {
    crumb: string,
    path?: string
}


const BreadCrumbs = () => {
    /* Hooks */
    const location = useLocation();

    /* Base variables */
    const digitalSpecimen = useAppSelector(getDigitalSpecimen);
    const breadCrumbs: BreadCrumb[] = [];

    /* Construct bread crumbs based on location */
    location.pathname.slice(1).split('/').forEach((pathPart) => {
        switch (pathPart) {
            case 'search':
                breadCrumbs.push({
                    crumb: 'Specimens',
                    path: '/search'
                });

                if (location.pathname.includes('compare')) {
                    breadCrumbs.push({
                        crumb: 'Compare'
                    });
                };

                break;
            case 'ds':
                breadCrumbs.push({
                    crumb: 'Specimens',
                    path: '/search'
                });

                breadCrumbs.push({
                    crumb: `${digitalSpecimen?.['ods:specimenName'] ?? digitalSpecimen?.['ods:ID'].replace(import.meta.env.VITE_DOI_URL, '')}}`,
                    path: `/ds/${digitalSpecimen?.['ods:ID'].replace(import.meta.env.VITE_DOI_URL, '')}`
                });
        };
    });

    return (
        <div>
            <Row>
                {breadCrumbs.map((breadCrumb, index) => (
                    <Col key={breadCrumb.crumb}
                        lg="auto"
                        className={`${index > 0 ? 'ps-0' : ''} pe-0`}
                    >
                        {/* Add arrow in between crumbs if index is greater than zero */}
                        {(index > 0) &&
                            <FontAwesomeIcon icon={faChevronRight}
                                className="fs-4 tc-secondary fw-lightBold pe-2"
                            />
                        }

                        {/* Bread crumb */}
                        {breadCrumb.path ?
                            <Link to={breadCrumb.path}>
                                <span className="fs-4 tc-secondary fw-lightBold pe-2">{breadCrumb.crumb}</span>
                            </Link>
                            : <span className="fs-4 tc-secondary fw-lightBold pe-2">{breadCrumb.crumb}</span>
                        }
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default BreadCrumbs;
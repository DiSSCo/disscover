/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import { useLocation, Link } from "react-router-dom";

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
    const breadCrumbs: BreadCrumb[] = [];

    /* Construct bread crumbs based on location */
    location.pathname.slice(1).split('/').forEach((pathPart) => {
        switch (pathPart) {
            case 'search':
                breadCrumbs.push({
                    crumb: 'Specimens',
                    path: '/search'
                });
        };
    });

    return (
        <div>
            <Row>
                <Col>
                    {breadCrumbs.map((breadCrumb, index) => (
                        <div key={breadCrumb.crumb}>
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
                        </div>
                    ))}
                </Col>
            </Row>
        </div>
    );
};

export default BreadCrumbs;
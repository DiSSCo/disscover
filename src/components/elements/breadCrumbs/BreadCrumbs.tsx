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
import { getDigitalMedia } from 'redux-store/DigitalMediaSlice';
import { setSearchDigitalSpecimen } from 'redux-store/SearchSlice';

/* Import Icons */
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


/* Bread crumb type */
type BreadCrumb = {
    crumb: string,
    path?: string
}


/**
 * Component that renders bread crumbs based upon the current location
 * @returns JSX Component
 */
const BreadCrumbs = () => {
    /* Hooks */
    const location = useLocation();
    const dispatch = useAppDispatch();

    /* Base variables */
    const digitalSpecimen = useAppSelector(getDigitalSpecimen);
    const digitalMedia = useAppSelector(getDigitalMedia);
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
                    crumb: 'Specimens',
                    path: '/search'
                });

                if (location.pathname.includes('compare')) {
                    breadCrumbs.push({
                        crumb: 'Compare'
                    });
                };

                break;
            } case 'ds': {
                breadCrumbs.push({
                    crumb: 'Specimens',
                    path: '/search'
                });

                breadCrumbs.push({
                    crumb: `${digitalSpecimen?.['ods:specimenName'] ?? digitalSpecimen?.['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')}`,
                    path: `/ds/${digitalSpecimen?.['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')}`
                });

                break;
            } case 'dm': {
                breadCrumbs.push({
                    crumb: 'Specimens',
                    path: '/search'
                });

                const digitalMediaDigitalSpecimenId: string | undefined = digitalMedia?.['ods:hasEntityRelationships']?.find(
                    entityRelationship => entityRelationship['dwc:relationshipOfResource'] === 'hasDigitalSpecimen'
                )?.['dwc:relatedResourceID'].replace(RetrieveEnvVariable('DOI_URL'), '');

                if (digitalMediaDigitalSpecimenId) {
                    breadCrumbs.push({
                        crumb: digitalMediaDigitalSpecimenId,
                        path: `/ds/${digitalMediaDigitalSpecimenId}`
                    });
                }

                breadCrumbs.push({
                    crumb: 'Digital Media'
                });

                breadCrumbs.push({
                    crumb: `${digitalMedia?.['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')}`
                });

                break;
            }
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
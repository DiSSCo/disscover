/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

/* Import Utilities */
import { RetrieveEnvVariable } from 'app/Utilities';

/* Import Hooks */
import { useAppDispatch, useAppSelector, useSearchFilters } from 'app/Hooks';

/* Import Store */
import { getDigitalSpecimen } from 'redux-store/DigitalSpecimenSlice';
import {getSearchResults, getSearchUrl, setSearchDigitalSpecimen, setSearchResults } from 'redux-store/SearchSlice';

/* Import Icons */
import { faChevronRight, faChevronLeft, faList, IconDefinition, faHome } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import Button from '../customUI/button/Button';

/* Import API services */
import GetDigitalSpecimens from 'api/digitalSpecimen/GetDigitalSpecimens';


/* Bread crumb type */
type ContentNavItems = {
    crumb: string,
    path: string
    icon?: IconDefinition,
    onDigitalSpecimen?: boolean
}


/**
 * Component that renders content navigation items based upon the current location with its appropriate action
 * @returns JSX Component
 */
const ContentNavigation = () => {
    /* Hooks */
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const searchFilters = useSearchFilters();
    const [isNavigating, setIsNavigating] = useState(false);

    /* Base variables */
    const digitalSpecimen = useAppSelector(getDigitalSpecimen);
    const searchUrl = useAppSelector(getSearchUrl);
    const contentNavItems: ContentNavItems[] = [];
    const searchResults = useAppSelector(getSearchResults);
    const currentIndex: number | undefined = searchResults?.records?.findIndex((item) => {
        return item['@id'] === digitalSpecimen?.['@id'];
    });
    /* Determine if next/previous buttons should be shown */
    const showPrevious = currentIndex !== undefined && (currentIndex > 0 || (searchResults?.currentPage ?? 1) > 1);
    const showNext = currentIndex !== undefined && (currentIndex < (searchResults?.records?.length ?? 0) - 1 || (searchResults?.currentPage ?? 1) < 399);

    /* Clean up digital specimen in store from search to start fresh */
    useEffect(() => {
        if (digitalSpecimen) {
            dispatch(setSearchDigitalSpecimen(undefined));
        }; 
    }, []);

    const navigateToNextDigitalSpecimen = async () => {
        if (isNavigating) return;

        if (searchResults?.records && currentIndex !== undefined && currentIndex < searchResults.records.length - 1) {
            // If we are not at the end of the list, navigate to the next item
            const nextDigitalSpecimen = searchResults.records[currentIndex + 1];
            navigate(`/ds/${nextDigitalSpecimen['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')}`);
        } else {
            // We are at the end, fetch the next page
            setIsNavigating(true);
            try {
                const nextPageNumber = (searchResults?.currentPage ?? 0) + 1;
                const result = await GetDigitalSpecimens({
                    pageSize: 25,
                    pageNumber: nextPageNumber,
                    searchFilters: searchFilters.GetSearchFilters()
                });
    
                if (result.digitalSpecimens.length > 0) {
                    // Dispatch the new results
                    dispatch(setSearchResults({ records: result.digitalSpecimens, currentPage: nextPageNumber }));
                    // Navigate to the first item of the new page
                    const nextDigitalSpecimen = result.digitalSpecimens[0];
                    navigate(`/ds/${nextDigitalSpecimen['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')}`);
                }
            } catch (error) {
                console.error("Failed to fetch next page of specimens:", error);
                // Optionally, show an error message to the user
            } finally {
                setIsNavigating(false);
            }
        }
    };

    const navigateToPreviousDigitalSpecimen = async () => {
        if (isNavigating) return;

        if (searchResults?.records && currentIndex !== undefined && currentIndex > 0) {
            // If we are not at the beginning of the list, navigate to the previous item
            const previousDigitalSpecimen = searchResults.records[currentIndex - 1];
            navigate(`/ds/${previousDigitalSpecimen['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')}`);
        } else {
            // We are at the beginning of the list, fetch the previous page
            const previousPageNumber = (searchResults?.currentPage ?? 1) - 1;
 
            if (previousPageNumber > 0) {
                setIsNavigating(true);
                try {
                    const result = await GetDigitalSpecimens({
                        pageSize: 25,
                        pageNumber: previousPageNumber,
                        searchFilters: searchFilters.GetSearchFilters()
                    });
    
                    if (result.digitalSpecimens.length > 0) {
                        // Dispatch the new results from the previous page
                        dispatch(setSearchResults({ records: result.digitalSpecimens, currentPage: previousPageNumber }));
                        // Navigate to the last item of the new (previous) page
                        const previousDigitalSpecimen = result.digitalSpecimens[result.digitalSpecimens.length - 1];
                        navigate(`/ds/${previousDigitalSpecimen['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')}`);
                    }
                } catch (error) {
                    console.error("Failed to fetch previous page of specimens:", error);
                } finally {
                    setIsNavigating(false);
                }
            }
        }
    };

    /* Construct content navigation items based on location */
    if (location.pathname.startsWith('/search')) {
        contentNavItems.push({
            crumb: 'Back to home',
            path: '/',
            icon: faHome,
        });
    } else if (location.pathname.startsWith('/ds/')) {
        contentNavItems.push({
            crumb: 'Back to list',
            path: searchUrl || '/search',
            icon: faList,
            onDigitalSpecimen: true
        });
    } else if (location.pathname.startsWith('/dm/')) {
        contentNavItems.push({
            crumb: 'Back to digital specimen',
            path: `/ds/${digitalSpecimen?.['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')}`
        });
    }

    return (
        <div>
            <Row className="mb-2">
                {contentNavItems.map((item, index) => (
                    <Col key={item.crumb}
                        lg="auto"
                        className={`${index > 0 ? 'ps-0' : ''} pe-0`}
                    >

                        {/* item*/}
                        {item.icon ?
                            <Link to={item.path}>
                                <FontAwesomeIcon icon={item.icon} className="fs-4 tc-secondary fw-lightBold pe-2"/>
                                <span className="fs-4 tc-secondary fw-lightBold pe-2">{item.crumb}</span>
                            </Link>
                        :
                    
                            <Link to={item.path}>
                                <span className="fs-4 tc-secondary fw-lightBold pe-2">{item.crumb}</span>
                            </Link>
                        }
                    </Col>
                ))}
                {(location.pathname.includes('/ds/') && (searchResults?.records?.length ?? 0) > 0) &&
                <Col lg="auto" className="ms-4">
                    {showPrevious &&
                        <>
                            <Button type="button"
                                variant="blank"
                                className="px-0 py-0"
                                OnClick={() => navigateToPreviousDigitalSpecimen()}
                                disabled={isNavigating}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faChevronLeft} className="fs-4 tc-secondary fw-lightBold pe-2" />
                                    <span className="fs-4 tc-secondary fw-lightBold pe-2">Previous</span>
                                </div>
                            </Button>
                            <span className="fs-4 tc-secondary fw-lightBold pe-2">        </span>
                        </>
                    }
                    {showNext &&
                        <Button type="button"
                            variant="blank"
                            className="px-0 py-0"
                            OnClick={() => navigateToNextDigitalSpecimen()}
                            disabled={isNavigating}
                        >
                            <div>
                                <span className="fs-4 tc-secondary fw-lightBold pe-2">Next</span>
                                <FontAwesomeIcon icon={faChevronRight} className="fs-4 tc-secondary fw-lightBold pe-2" />
                            </div>
                        </Button>
                    }
                </Col>
                }
            </Row>
        </div>
    );
};

export default ContentNavigation;
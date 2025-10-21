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


/* Content navigation items type */
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
export const ContentNavigation = () => {
    /* Hooks */
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const searchFilters = useSearchFilters();
    const [retrievingMoreResults, setRetrievingMoreResults] = useState(false);

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
    const showNext = currentIndex !== undefined && (currentIndex < (searchResults?.records?.length ?? 0) - 1 || (searchResults?.currentPage ?? 1) < 399); //399 is last page of results due to indexing errors

    /* Clean up digital specimen in store from search to start fresh */
    useEffect(() => {
        if (digitalSpecimen) {
            dispatch(setSearchDigitalSpecimen(undefined));
        }; 
    }, []);

    const navigateDigitalSpecimen = async (direction: 'next' | 'previous') => {
        if (retrievingMoreResults || currentIndex === undefined || !searchResults?.records) return;
        const indexDirection = direction === 'next' ? 1 : -1;
        const newIndex = currentIndex + indexDirection;

        // Check if we can navigate to new digital specimen
        if (newIndex >= 0 && newIndex < searchResults.records.length) {
            const digitalSpecimen = searchResults.records[newIndex];
            navigate(`/ds/${digitalSpecimen['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')}`);
            return;
        }

        // If not, fetch new page
        const currentPage = searchResults.currentPage ?? 1;
        const newPageNumber = currentPage + indexDirection;

        // Boundary check for page numbers
        if (newPageNumber > 0) {
            setRetrievingMoreResults(true);
            try {
                const result = await GetDigitalSpecimens({
                    pageSize: 25,
                    pageNumber: newPageNumber,
                    searchFilters: searchFilters.GetSearchFilters()
                });
    
                if (result.digitalSpecimens.length > 0) {
                    // Dispatch the new results
                    dispatch(setSearchResults({ records: result.digitalSpecimens, currentPage: newPageNumber }));
                    // Navigate to the first item of the new page or the last item of the previous page
                    const specimenToNavigate = direction === 'next' ? result.digitalSpecimens[0] : result.digitalSpecimens.at(-1);

                    if (specimenToNavigate) {
                        navigate(`/ds/${specimenToNavigate['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')}`);
                    }
                }
            } catch (error) {
                console.error(`Failed to fetch ${direction} page of specimens:`, error);
            } finally {
                setRetrievingMoreResults(false);
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
                {(location.pathname.includes('/ds/') && (searchResults?.records?.length ?? 0) > 1) &&
                <Col lg="auto" className="ms-4">
                    {showPrevious &&
                        <>
                            <Button type="button"
                                variant="blank"
                                className="px-0 py-0"
                                OnClick={() => navigateDigitalSpecimen('previous')}
                                disabled={retrievingMoreResults}
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
                            OnClick={() => navigateDigitalSpecimen('next')}
                            disabled={retrievingMoreResults}
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
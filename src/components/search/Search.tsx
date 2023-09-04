/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { GetFilters } from 'global/Utilities';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getPaginationObject, setPaginationObject } from 'redux/general/GeneralSlice';
import {
    getSearchResults, setSearchResults, getSearchSpecimen, setSearchSpecimen,
    setSearchAggregations, getCompareMode, setCompareMode
} from 'redux/search/SearchSlice';

/* Import Types */
import { Specimen, SearchFilter, Dict } from 'global/Types';

/* Import Styles */
import styles from './search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import Header from 'components/general/header/Header';
import BreadCrumbs from 'components/general/breadCrumbs/BreadCrumbs';
import SearchBar from './components/searchMenu/SearchBar';
import SearchFilters from './components/searchMenu/SearchFilters';
import ActiveFilters from './components/searchMenu/ActiveFilters';
import ResultsTable from './components/searchResults/ResultsTable';
import Paginator from 'components/general/paginator/Paginator';
import IDCard from './components/IDCard/IDCard';
import MapMediaExt from './components/IDCard/MapMediaExt';
import CompareBox from './components/compare/CompareBox';
import Footer from 'components/general/footer/Footer';

/* Import Introduction Steps */
import SearchSteps from './steps/SearchSteps';
import CompareSteps from './steps/CompareSteps';

/* Import API */
import SearchSpecimens from 'api/specimen/SearchSpecimens';
import GetRecentSpecimens from 'api/specimen/GetRecentSpecimens';
import GetSpecimenAggregations from 'api/specimen/GetSpecimenAggregations';
import GetSpecimenDisciplines from 'api/specimen/GetSpecimenDisciplines';


const Search = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    /* Base variables */
    const searchResults = useAppSelector(getSearchResults);
    const searchSpecimen = useAppSelector(getSearchSpecimen);
    const compareMode = useAppSelector(getCompareMode);
    const paginationObject = useAppSelector(getPaginationObject);
    const pageSize = 25;
    const [pageNumber, setPageNumber] = useState<number>(
        (paginationObject.page === location.pathname.split('/')[1]) ? paginationObject.pageNumber : 1
    );
    const [paginatorLinks, setPaginatorLinks] = useState<Dict>({});
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [filterToggle, setFilterToggle] = useState(isEmpty(searchSpecimen));

    /* OnChange of search params: reset page number, then search specimens */
    useEffect(() => {
        if (!isEmpty(searchResults)) {
            const filters = GetFilters(searchParams);

            /* If filters differ from previous search, reset Pagination and Page numbers */
            if (JSON.stringify(filters) !== JSON.stringify(paginationObject.filters)) {
                dispatch(setPaginationObject({
                    page: location.pathname.split('/')[1],
                    pageNumber: 1,
                    filters
                }));
                setPageNumber(1);
            }

            SearchWithFilters();
        };
    }, [searchParams]);

    /* OnChange of page number: search specimens */
    useEffect(() => {
        SearchWithFilters();
    }, [pageNumber]);

    /* Function to Search for specimens with filters and page number */
    const SearchWithFilters = () => {
        const searchFilters: SearchFilter[] = [];

        /* ForEach filter, push to Search Filters state */
        for (const searchParam of searchParams.entries()) {
            searchFilters.push({
                [searchParam[0]]: searchParam[1]
            });
        }

        /* If any filter is selected */
        if (!isEmpty(searchFilters)) {
            /* Action Search */
            SearchSpecimens(searchFilters, pageSize, pageNumber).then(({ specimens, links, totalRecords }) => {
                if (!isEmpty(specimens)) {
                    HandleSearch(specimens, links, totalRecords);
                } else {
                    /* Reset Pagination and Page numbers */
                    dispatch(setPaginationObject({
                        page: location.pathname.split('/')[1],
                        pageNumber: 1,
                        filters: GetFilters(searchParams)
                    }));
                    setPageNumber(1);
                }
            }).catch(error => {
                console.warn(error);
            });
        } else {
            /* Grab Recent Specimens */
            GetRecentSpecimens(pageSize, pageNumber).then(({ specimens, links, meta }) => {
                HandleSearch(specimens, links, meta.totalRecords);
            }).catch(error => {
                console.warn(error);
            });
        }

        /* Function for handling Search results, page number and filters after new call */
        const HandleSearch = (specimens: Specimen[], links: Dict, totalRecords: number) => {
            /* Set Search Results / Specimens */
            dispatch(setSearchResults(specimens));

            /* Set Paginator links */
            setPaginatorLinks(links);

            /* Set Total Records */
            setTotalRecords(totalRecords);
        }

        /* Refresh Aggregations */
        GetSpecimenAggregations(searchFilters).then((aggregations) => {
            dispatch(setSearchAggregations(aggregations));
        }).catch(error => {
            console.warn(error);
        });
    };

    /* ClassName for Search Menu Block */
    const classSearchMenu = classNames({
        'transition': true,
        'w-0': !isEmpty(searchSpecimen) && !filterToggle,
    });

    /* ClassName for Search Results Block */
    const classSearchResults = classNames({
        'transition bg-main position-absolute': true,
        'offset-md-6 col-md-6 offset-lg-3 col-lg-9': isEmpty(searchSpecimen) && filterToggle,
        'col-md-12 col-lg-12': !isEmpty(searchSpecimen) && !filterToggle
    });

    /* ClassName for Search Results Table */
    const classSearchResultsTable = classNames({
        'transition z-1 col-md-12': true,
        'w-50': !isEmpty(searchSpecimen)
    });

    /* ClassName for ID Card Block */
    const classIDCard = classNames({
        'transition position-absolute z-0': true,
        [`${styles.IDCard}`]: true,
        'w-50': !isEmpty(searchSpecimen)
    });

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header introTopics={[
                { intro: 'search', title: 'About This Page' },
                { intro: 'compare', title: 'Comparing Specimens' }
            ]} />

            <SearchSteps SetFilterToggle={(toggle: boolean) => setFilterToggle(toggle)} />
            <CompareSteps />

            <Container fluid className={`${styles.content} pt-5 pb-4`}>
                <Row className="h-100 position-relative">
                    <Col md={{ span: 10, offset: 1 }} className="h-100">
                        <div className="h-100 d-flex flex-column">
                            <Row>
                                <Col>
                                    <BreadCrumbs />
                                </Col>
                            </Row>

                            <Row className={`mt-3`}>
                                <Col lg={{ span: 3 }} className="col-md-auto searchBar">
                                    <SearchBar />
                                </Col>

                                {/* If filters are hidden, show toggle button and current active filters */}
                                <Col className="activeFilters">
                                    <Row className="justify-content-end">
                                        {!filterToggle ?
                                            <>
                                                <Col className="h-100 col-md-auto pe-0">
                                                    <button type="button"
                                                        className="primaryButton px-3 py-1"
                                                        onClick={() => { setFilterToggle(true); dispatch(setSearchSpecimen({} as Specimen)) }}
                                                    >
                                                        <FontAwesomeIcon icon={faFilter} className="pe-1" /> Filters
                                                    </button>
                                                </Col>
                                                <Col className="d-md-none">
                                                    <ActiveFilters />
                                                </Col>
                                            </> : <Col />
                                        }
                                    </Row>
                                </Col>

                                <Col className="col-md-auto">
                                    <button type="button"
                                        className={`${styles.compareButton} rounded-full transition px-3 py-1`}
                                        onClick={() => { dispatch(setCompareMode(!compareMode)); dispatch(setSearchSpecimen({} as Specimen)); }}
                                    >
                                        Compare
                                    </button>
                                </Col>
                            </Row>

                            <Row className="flex-grow-1 position-relative overflow-hidden">
                                <Col md={{ span: 6 }} lg={{ span: 3 }} className={`${classSearchMenu} searchMenu h-100`}>
                                    <div className="h-100 d-flex flex-column">
                                        <Row className="flex-grow-1 overflow-scroll">
                                            <Col>
                                                {/* Search Menu */}
                                                <SearchFilters HideFilters={() => setFilterToggle(false)} />
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                                <Col className={`${classSearchResults} h-100 searchResults`}>
                                    <Row className="h-100 position-relative">
                                        <Col className={`${classSearchResultsTable} h-100`}>
                                            <Row className="h-100">
                                                <Col className="h-100">
                                                    <div className="h-100 d-flex flex-column">
                                                        <Row className="flex-grow-1 overflow-hidden">
                                                            {/* Search Results */}
                                                            <Col md={{ span: 12 }} className="h-100 pb-2">
                                                                <ResultsTable pageNumber={pageNumber}
                                                                    HideFilters={() => setFilterToggle(false)}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="justify-content-center position-relative">
                                                            <Col className="fs-4 py-2 position-absolute start-0 ps-4">
                                                                {(totalRecords === 1) ?
                                                                    <p className="fst-italic"> 1 specimen found </p>
                                                                    : <p className="fst-italic"> {`${totalRecords} specimens found`} </p>
                                                                }
                                                            </Col>

                                                            {(searchResults.length > 0) &&
                                                                <Col className="col-lg-auto">
                                                                    <div className="d-flex justify-content-end">
                                                                        <Paginator pageNumber={pageNumber}
                                                                            links={paginatorLinks}
                                                                            totalRecords={totalRecords}

                                                                            SetPageNumber={(pageNumber: number) => setPageNumber(pageNumber)}
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            }
                                                        </Row>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={{ span: 6, offset: 6 }} className={`${classIDCard} IDCard pb-2`}>
                                            {/* ID Card */}
                                            {!isEmpty(searchSpecimen) &&
                                                <IDCard specimen={searchSpecimen}
                                                    extensions={[
                                                        <Row key='mapMedia' className="flex-grow-1 pt-3 overflow-hidden">
                                                            <Col className="h-100">
                                                                <MapMediaExt specimen={searchSpecimen} />
                                                            </Col>
                                                        </Row>
                                                    ]}
                                                    OnClose={() => dispatch(setSearchSpecimen({} as Specimen))}
                                                />
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    {/* Compare box, to compare Specimens if compare mode is true */}
                    <div className={`${styles.compareBoxBlock} position-absolute bottom-0 d-flex justify-content-end pe-5`}>
                        {compareMode &&
                            <CompareBox />
                        }
                    </div>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Search;
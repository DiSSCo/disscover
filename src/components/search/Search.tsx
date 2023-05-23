/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
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
import SearchFilters from './components/searchMenu/SearchFilters';
import ActiveFilters from './components/searchMenu/ActiveFilters';
import ResultsTable from './components/searchResults/ResultsTable';
import Paginator from 'components/general/paginator/Paginator';
import IDCard from './components/IDCard/IDCard';
import CompareBox from './components/compare/CompareBox';
import Footer from 'components/general/footer/Footer';

/* Import API */
import SearchSpecimens from 'api/specimen/SearchSpecimens';
import GetRecentSpecimens from 'api/specimen/GetRecentSpecimens';
import GetSpecimenAggregations from 'api/specimen/GetSpecimenAggregations';


const Search = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    /* Base variables */
    const searchResults = useAppSelector(getSearchResults);
    const searchSpecimen = useAppSelector(getSearchSpecimen);
    const compareMode = useAppSelector(getCompareMode);
    const pageSize = 25;
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [paginatorLinks, setPaginatorLinks] = useState<Dict>({});
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [filterToggle, setFilterToggle] = useState(isEmpty(searchSpecimen));

    /* OnChange of search params: reset page number, then search specimens */
    useEffect(() => {
        setPageNumber(1);

        SearchWithFilters();
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
                HandleSearch(specimens, links, totalRecords);
            }).catch(error => {
                console.warn(error);
            });
        } else {
            /* Grab Recent Specimens */
            GetRecentSpecimens(pageSize, pageNumber).then(({ specimens, links, totalRecords }) => {
                HandleSearch(specimens, links, totalRecords);
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

            /* Set Total Records found */
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
        'offset-md-3 col-md-9': isEmpty(searchSpecimen) && filterToggle,
        'col-md-12': !isEmpty(searchSpecimen) && !filterToggle
    });

    /* ClassName for Search Results Table */
    const classSearchResultsTable = classNames({
        'transition z-1 col-md-12': true,
        'w-50': !isEmpty(searchSpecimen)
    });

    /* ClassName for ID Card Block */
    const classIDCard = classNames({
        'transition position-absolute z-0': true,
        'w-50': !isEmpty(searchSpecimen)
    });

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Container fluid className={`${styles.content} pt-5 pb-4`}>
                <Row className="h-100 position-relative">
                    <Col md={{ span: 10, offset: 1 }} className="h-100">
                        <div className="h-100 d-flex flex-column">
                            <Row>
                                <Col>
                                    <BreadCrumbs />
                                </Col>
                            </Row>

                            <Row className="flex-grow-1 position-relative overflow-hidden mt-3">
                                <Col md={{ span: 3 }} className={`${classSearchMenu} h-100`}>
                                    {/* Search Menu */}
                                    <SearchFilters HideFilters={() => setFilterToggle(false)} />
                                </Col>

                                <Col className={`${classSearchResults} h-100`}>
                                    <Row className={styles.filtersTopBar}>
                                        {!filterToggle &&
                                            <Col className="h-100 col-md-auto">

                                                <button type="button"
                                                    className="primaryButton px-3 py-1"
                                                    onClick={() => { setFilterToggle(true); dispatch(setSearchSpecimen({} as Specimen)) }}
                                                >
                                                    <FontAwesomeIcon icon={faFilter} className="pe-1" /> Filters
                                                </button>

                                            </Col>
                                        }
                                        <Col>
                                            {/* Show current active filters */}
                                            <ActiveFilters />
                                        </Col>
                                        <Col className="col-md-auto">
                                            <button type="button"
                                                className={`${styles.compareButton} px-3 py-1`}
                                                onClick={() => { dispatch(setCompareMode(!compareMode)); dispatch(setSearchSpecimen({} as Specimen)); }}
                                            >
                                                Compare
                                            </button>
                                        </Col>
                                    </Row>
                                    <Row className={styles.searchContent}>
                                        <Col className={`${classSearchResultsTable} h-100`}>
                                            <Row className="h-100">
                                                <Col className="h-100">
                                                    <Row className={`${styles.searchResults} `}>
                                                        {/* Search Results */}
                                                        <Col md={{ span: 12 }} className="h-100 pb-2">
                                                            <ResultsTable pageNumber={pageNumber}
                                                                HideFilters={() => setFilterToggle(false)}
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Row className={`${styles.paginator} justify-content-center position-relative`}>
                                                        <Col className={`${styles.resultCount} col-md-auto py-2 position-absolute start-0 ps-4`}>
                                                            {(totalRecords === 1) ?
                                                                <p className="fst-italic"> 1 specimen found </p>
                                                                : <p className="fst-italic"> {`${totalRecords} specimens found`} </p>
                                                            }
                                                        </Col>

                                                        {(searchResults.length > 0) &&
                                                            <Col className="col-md-auto">
                                                                <Paginator pageNumber={pageNumber}
                                                                    links={paginatorLinks}
                                                                    totalRecords={totalRecords}

                                                                    SetPageNumber={(pageNumber: number) => setPageNumber(pageNumber)}
                                                                />
                                                            </Col>
                                                        }
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={{ span: 6, offset: 6 }} className={`${classIDCard} h-100 pb-2`}>
                                            {/* ID Card */}
                                            {!isEmpty(searchSpecimen) &&
                                                <IDCard />
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    {/* Compare box, to compare Specimens if compare mode is true */}
                    {compareMode &&
                        <div className="position-absolute bottom-0 d-flex justify-content-end pe-5">
                            <CompareBox />
                        </div>
                    }
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Search;
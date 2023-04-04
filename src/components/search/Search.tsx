/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    setSpecimenSearchResults, setSearchFilters, getSpecimenSearchResults
} from "redux/search/SearchSlice";

/* Import Types */
import { SearchFilter } from 'global/Types';

/* Import Styles */
import './search.scss';
import styles from './search.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import SearchBar from './components/searchMenu/SearchBar';
import SearchFilters from './components/searchMenu/SearchFilters';
import ResultsTable from './components/searchResults/ResultsTable';
import Paginator from 'components/general/paginator/Paginator';
import Footer from 'components/general/footer/Footer';

/* Import API */
import SearchSpecimens from "api/specimen/SearchSpecimens";


const Search = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    /* Base variables */
    const specimenSearchResults = useAppSelector(getSpecimenSearchResults);

    /* OnLoad/OnChange of search params : check filters, then action a search */
    useEffect(() => {
        const searchFilters: SearchFilter[] = [];

        for (const searchParam of searchParams.entries()) {
            /* Push to Search Filters state */
            searchFilters.push({
                [searchParam[0]]: searchParam[1]
            });
        }

        /* Action Search */
        SearchSpecimens(searchFilters).then((specimens) => {
            dispatch(setSpecimenSearchResults(specimens));
        });

        /* Set Search Filters state */
        dispatch(setSearchFilters(searchFilters));
    }, [searchParams]);

    /* Pagination */
    const [paginationRange, setPaginationRange] = useState<number[]>();

    /* TEMPORARY CONSOLE LOG FOR SONAR, needs to be updated when API is updated */
    console.log(paginationRange);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Container fluid className={`${styles.content} mt-5`}>
                <Row className="h-100">
                    <Col md={{ span: 10, offset: 1 }} className="h-100">
                        <Row className="h-100">
                            {/* Search Menu */}
                            <Col md="2" className={`${styles.filterMenu} border-2-primary-dark h-100`}>
                                <SearchBar />

                                <SearchFilters />
                            </Col>

                            {/* Search Results */}
                            <Col md="10">
                                <Row>
                                    <Col md={{ span: 12 }} className="search_resultsSection">
                                        <ResultsTable />
                                    </Col>
                                </Row>

                                <Row className="px-5 mt-3">
                                    <Col className="search_resultCount col-md-auto py-2">
                                        {(specimenSearchResults.length === 1) ?
                                            '1 specimen found'
                                            : `${specimenSearchResults.length} specimens found`
                                        }
                                    </Col>

                                    {(specimenSearchResults.length > 0) &&
                                        <Col className="col-md-auto">
                                            <Paginator items={specimenSearchResults}
                                                pageSize={25}

                                                SetPaginationRange={(range: number[]) => setPaginationRange(range)}
                                            />
                                        </Col>
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Search;
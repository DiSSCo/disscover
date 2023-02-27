/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSearchQuery, setSearchQuery, setSpecimenSearchResults, getSpecimenSearchResults } from "redux/search/SearchSlice";

/* Import Styles */
import './search.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import SearchBar from './components/searchMenu/SearchBar';
import SearchFilters from './components/searchMenu/SearchFilters';
import ResultsTable from './components/searchResults/ResultsTable';
import Paginator from 'components/general/paginator/Paginator';
import Footer from 'components/general/footer/Footer';

/* Import API */
import SearchSpecimens from "api/specimen/SearchSpecimens";
import FilterSpecimen from "api/specimen/FilterSpecimen";


const Search = () => {
    /* Configure Store */
    const dispatch = useAppDispatch();

    /* Base search variables */
    const [searchParams, setSearchParams] = useSearchParams();

    const searchQuery = useAppSelector(getSearchQuery);
    const specimenSearchResults = useAppSelector(getSpecimenSearchResults);

    /* On change of search query, check for searchresults */
    useEffect(() => {
        if (!searchQuery && searchParams.get('searchQuery')) {
            /* Store search query */
            dispatch(setSearchQuery(searchParams.get('searchQuery') as string));
        } else {
            /* Search */
            SearchSpecimens(searchQuery).then((searchResults) => {
                searchResults.forEach((searchResult, i) => {
                    searchResults[i].filtered = FilterSpecimen(searchResult);
                });

                dispatch(setSpecimenSearchResults(searchResults));

                /* Update params */
                setSearchParams({searchQuery: searchQuery});
            });
        }
    }, [searchQuery]);

    /* Pagination */
    const [paginationRange, setPaginationRange] = useState<number[]>();

    /* TEMPORARY CONSOLE LOG FOR SONAR, needs to be updated when API is updated */
    console.log(paginationRange);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Container fluid className="mt-4">
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row>
                            {/* Search Menu */}
                            <Col md="2" className="search_filterMenu border-2-primary-dark">
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
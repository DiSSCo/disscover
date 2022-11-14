import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

/* Import components */
import SearchBar from "./searchMenu/SearchBar";
import SearchFilters from "./searchMenu/SearchFilters";
import ResultsTable from "./resultsTable/ResultsTable";
import Paginator from "templates/general/paginator/Paginator";

/* Import API */
import SpecimenSearch from "api/specimen/SpecimenSearch.js";
import FilterSpecimen from "api/specimen/FilterSpecimen";


const Body = () => {
    let location = useLocation();

    const [loaded, setLoaded] = useState();
    const [paginationRange, setPaginationRange] = useState();

    /* Temporary to resolve Sonar Cloud issue */
    console.log(paginationRange);

    const [searchQuery, setSearchQuery] = useState();
    const [searchResults, setSearchResults] = useState([]);

    function UpdateSearchQuery(query) {
        setSearchQuery(query.target.value);
    }

    function HandleSearch(query = null) {
        if (searchQuery) {
            SpecimenSearch(searchQuery, Process);
            localStorage.setItem('searchQuery', searchQuery);
        } else if (query) {
            SpecimenSearch(query, Process);
            localStorage.setItem('searchQuery', query);
        } else {
            setSearchResults([]);
            localStorage.setItem('searchQuery', '');

            setLoaded(true);
        }

        function Process(result) {
            result.forEach((searchResult, i) => {
                result[i] = FilterSpecimen(searchResult);
            });

            setSearchResults(result);

            setSearchQuery(localStorage.getItem('searchQuery'));

            setLoaded(true);
        }
    }

    useEffect(() => {
        const memorySearchQuery = localStorage.getItem('searchQuery');

        if (memorySearchQuery) {
            HandleSearch(memorySearchQuery);
        } else if (memorySearchQuery === '') {
            setSearchQuery('');

            setLoaded(true);
        } else if (location.state) {
            setSearchQuery(location.state.searchQuery);
            setSearchResults(location.state.searchResults);

            setLoaded(true);
        } else {
            setLoaded(true);
        }
    }, []);

    if (loaded) {
        return (
            <Container fluid className="mt-4">
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row>
                            <Col md="2" className="search_filterMenu border-2-primary-dark">
                                <SearchBar
                                    searchQuery={searchQuery}
                                    onSearch={() => HandleSearch()}
                                    updateSearchQuery={(query) => UpdateSearchQuery(query)}
                                />

                                <SearchFilters />
                            </Col>
                            <Col md="10">
                                <Row>
                                    <Col md={{ span: 12 }} className="search_resultsSection">
                                        <ResultsTable searchResults={searchResults} />
                                    </Col>
                                </Row>

                                <Row className="px-5 mt-3">
                                    <Col className="search_resultCount col-md-auto py-2">
                                        {(searchResults.length === 1) ?
                                            '1 specimen found'
                                            : `${searchResults.length} specimens found`
                                        }
                                    </Col>

                                    {(searchResults.length > 0) &&
                                        <Col className="col-md-auto">
                                            <Paginator items={searchResults}
                                                pageSize={25}

                                                SetPaginationRange={(range) => setPaginationRange(range)}
                                            />
                                        </Col>
                                    }
                                </Row>


                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Body;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import './body.css';

/* Import components */
import SearchBar from "./searchMenu/SearchBar";
import ResultsTable from "./resultsTable/ResultsTable";

/* Import API */
import SpecimenSearch from "../../../api/SpecimenSearch.js";

const Body = () => {
    let location = useLocation();

    const [loaded, setLoaded] = useState();

    const [searchQuery, setSearchQuery] = useState();
    const [searchResults, setSearchResults] = useState();

    useEffect(() => {
        const memorySearchQuery = localStorage.getItem('searchQuery');

        if (memorySearchQuery) {
            HandleSearch(memorySearchQuery);
        } else if (memorySearchQuery == '') {
            setSearchQuery('');

            setLoaded(true);
        } else if (location.state.searchResults) {
            setSearchQuery(location.state.searchQuery);
            setSearchResults(location.state.searchResults);

            setLoaded(true);
        }
    }, []);

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
            setSearchResults(result);
            setSearchQuery(localStorage.getItem('searchQuery'));

            setLoaded(true);
        }
    }

    if (loaded) {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md="2" className="search_filterMenu">
                            <SearchBar
                                searchQuery={searchQuery}
                                onSearch={() => HandleSearch()}
                                updateSearchQuery={(query) => UpdateSearchQuery(query)}
                            />
                        </Col>
                        <Col md="10">
                            <Row>
                                <Col md={{ span: '12'}} className="search_resultsSection">
                                    <ResultsTable searchResults={searchResults}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Body;
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './body.css';

/* Import components */
import SearchBar from "./searchMenu/SearchBar";
import ResultsTable from "./resultsTable/ResultsTable";

const Body = (props) => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="2" className="search_filterMenu">
                        <SearchBar />
                    </Col>
                    <Col md="10">
                        <Row>
                            <Col md={{ span: '12'}} className="search_resultsSection">
                                <ResultsTable searchResults={props.searchResults}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Body;
import React from "react";
import { Row, Col } from 'react-bootstrap';

const SearchBar = (props) => {
    return (
        <Row>
            <Col md={{ span: 12 }} className="search_searchBarBlock">
                <h2 className="search_searchBarTitle">
                    Search for occurences:
                </h2>
                <Row>
                    <Col md={{ span: 12 }} className="search_searchBar">
                        <input type="text" id="search_searchBar" class="search_searchBarInput" onChange={props.updateSearchQuery} value={props.searchQuery} placeholder="Thalassodromeus" />
                        <button type="submit" className="search_searchBarSubmit" onClick={props.onSearch}>
                            <i className="fa-solid fa-magnifying-glass" />
                        </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

}

export default SearchBar;
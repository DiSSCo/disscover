import React from "react";
import { Row, Col } from 'react-bootstrap';

/* Fontawesome icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBar = (props) => {
    return (
        <Row>
            <Col md={{ span: 12 }} className="search_searchBarBlock">
                <h2 className="search_searchBarTitle">
                    Search for specimens:
                </h2>
                <Row>
                    <Col md={{ span: 12 }} className="search_searchBar">
                        <input type="text" id="search_searchBar" className="search_searchBarInput" onChange={props.updateSearchQuery} value={props.searchQuery} placeholder="Thalassodromeus" />
                        <button type="submit" className="search_searchBarSubmit" onClick={props.onSearch}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

}

export default SearchBar;
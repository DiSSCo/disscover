import React from "react";
import { Row, Col } from 'react-bootstrap';

function SearchBar(props) {
    return (
        <Row>
            <Col md={{ span: 5, offset: 1 }} className="searchBarBlock">
                <h2 className="searchBarTitle">
                    Search for occurences:
                </h2>
                <Row>
                    <Col md={{ span: 12, offset: 0 }}>
                        <input type="text" id="searchBar" onChange={props.updateSearchQuery} className="searchBar" placeholder="Antarctopelta" />
                        <button type="submit" className="searchBarSubmit" onClick={props.onSearch}>
                            <i className="fa-solid fa-magnifying-glass" />
                        </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

}

export default SearchBar;
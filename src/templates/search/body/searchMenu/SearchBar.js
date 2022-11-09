import React from "react";
import { Row, Col } from 'react-bootstrap';

/* Fontawesome icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBar = (props) => {
    function HandleKeyPress(event) {
        if (event.key === 'Enter') {
            props.onSearch();
        }
    }

    return (
        <Row>
            <Col md={{ span: 12 }} className="bg-primary-dark pt-3 pb-4 px-4">
                <Row>
                    <Col md={{ span: 12 }} className="text-white position-relative">
                        <h6>
                            Search for specimens:
                        </h6>

                        <input type="text"
                            className="search_searchBar w-100"
                            onChange={props.updateSearchQuery} value={props.searchQuery}
                            onKeyPress={HandleKeyPress}
                            placeholder="Iguanodon"
                        />
                        <button type="submit" className="search_searchBarSubmit position-absolute bg-white border-0" onClick={props.onSearch}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

}

export default SearchBar;
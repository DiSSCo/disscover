import React from "react";
import { Row, Col } from 'react-bootstrap';

/* Fontawesome icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchBar(props) {
    function HandleKeyPress(event) {
        if (event.key === 'Enter') {
            props.onSearch();
        }
    }

    return (
        <Row>
            <Col md={{ span: 5 }} className="searchBarBlock ps-4 pt-4 bg-white rounded-c shadow-c z-1">
                <h4>
                    Search for specimens:
                </h4>
                <Row>
                    <Col md={{ span: 12, offset: 0 }}>
                        <input
                            type="text"
                            id="searchBar"
                            onChange={props.updateSearchQuery}
                            onKeyPress={HandleKeyPress}
                            className="searchBar"
                            placeholder="Baculites"
                        />
                        <button type="submit" className="searchBarSubmit bg-primary text-white border-0 br-tr br-br" onClick={props.onSearch}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

}

export default SearchBar;
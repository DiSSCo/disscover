import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import './body.css';

/* Import Components */
import TitleImage from "./titleImage/TitleImage";
import SearchBar from "./searchBar/SearchBar";
import SampleOccurrence from "./sampleOccurence/SampleOccurence";

/* Import API functions */
import SpecimenSearch from "../../../api/SpecimenSearch.js";

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            specimenSearchResults: ''
        }
    }

    updateSearchQuery(query) {
        this.setState({
            searchQuery: query.target.value
        });
    }

    handleSearch() {
        const searchQuery = this.state.searchQuery;

        SpecimenSearch(searchQuery, process);

        function process(result) {
            console.log(result);

            
        }
    }

    render() {
        const items = [
            'Frogger', 'Frogger', 'Frogger',
            'Frogger', 'Frogger', 'Frogger',
            'Frogger', 'Frogger', 'Frogger'
        ];

        return (
            <>
            <TitleImage />
                <Container fluid>
                    <SearchBar 
                        onSearch={() => this.handleSearch()} 
                        updateSearchQuery={(query) => this.updateSearchQuery(query)} 
                    />

                    <Row>
                        <Col md={{span: "10", offset: "1"}} className="sampleOccurences">
                            <Row>
                                <h3 className="sampleOccurencesTitle">
                                    Explore froggies
                                </h3>
                            </Row>
                            <Row>
                                {items.map((value, index) => {
                                    return <SampleOccurrence />
                                })}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Body;
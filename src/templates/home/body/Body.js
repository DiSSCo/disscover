import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './body.css';

/* Import Components */
import TitleImage from "./titleImage/TitleImage";
import SearchBar from "./searchBar/SearchBar";
import SampleOccurrence from "./sampleOccurence/SampleOccurence";

/* Import API functions */
import SpecimenSearch from "../../../api/SpecimenSearch.js";

const Body = () => {
    const [searchQuery, setSearchQuery] = useState();

    function UpdateSearchQuery(query) {
        setSearchQuery(query.target.value);
    }

    function HandleSearch() {
        SpecimenSearch(searchQuery, Process);

        function Process(result) {
            navigate('/search', {
                state: {
                    data: result
                }
            });
        }
    }

    const items = [
        'Frogger', 'Frogger', 'Frogger',
        'Frogger', 'Frogger', 'Frogger',
        'Frogger', 'Frogger', 'Frogger'
    ];

    const navigate = useNavigate();

    return (
        <>
            <TitleImage />
            <Container fluid>
                <SearchBar
                    onSearch={() => HandleSearch()}
                    updateSearchQuery={(query) => UpdateSearchQuery(query)}
                />

                <Row>
                    <Col md={{ span: "10", offset: "1" }} className="sampleOccurences">
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
    )

}

export default Body;
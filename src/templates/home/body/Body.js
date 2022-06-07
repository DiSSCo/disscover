import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './body.css';

/* Import Components */
import TitleImage from "./titleImage/TitleImage";
import SearchBar from "./searchBar/SearchBar";
import SampleSpecimen from "./sampleSpecimen/SampleSpecimen";

/* Import API functions */
import SpecimenSearch from "../../../api/SpecimenSearch";

const Body = () => {
    const [searchQuery, setSearchQuery] = useState();

    function UpdateSearchQuery(query) {
        setSearchQuery(query.target.value);
    }

    function HandleSearch() {
        SpecimenSearch(searchQuery, Process);

        function Process(result) {
            localStorage.setItem('searchQuery', searchQuery);

            navigate('/search', {
                state: {
                    searchQuery: searchQuery,
                    searchResults: result
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
                    <Col md={{ span: "10", offset: "1" }} className="sampleSpecimens">
                        <Row>
                            <h3 className="sampleSpecimensTitle">
                                Explore froggies
                            </h3>
                        </Row>
                        <Row>
                            {items.map(() => {
                                return <SampleSpecimen />
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default Body;
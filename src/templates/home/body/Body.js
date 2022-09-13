import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './body.css';

/* Import Components */
import TitleImage from "./titleImage/TitleImage";
import SearchBar from "./searchBar/SearchBar";
import SampleSpecimen from "./sampleSpecimen/SampleSpecimen";
import RecentAnnotations from "./recentAnnotations/RecentAnnotations";
import RecentAdded from "./recentAdded/RecentAdded";

/* Import API functions */
import SpecimenSearch from "api/specimen/SpecimenSearch";

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
        'Frogger', 'Frogger', 'Frogger', 'Frogger'
    ];

    const navigate = useNavigate();

    return (
        <>
            <TitleImage />
            <Container fluid>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <SearchBar
                            onSearch={() => HandleSearch()}
                            updateSearchQuery={(query) => UpdateSearchQuery(query)}
                        />

                        <Row className="mt-5">
                            <Col md={{ span: 12 }}>
                                <Row>
                                    <Col>
                                        <h3 className="homeTitle">
                                            Explore Sabertoothed Cats
                                        </h3>
                                    </Col>
                                </Row>
                                <Row>
                                    {items.map(() => {
                                        return <SampleSpecimen />
                                    })}
                                </Row>
                            </Col>
                        </Row>

                        <Row className="mt-5">
                            <Col md={{ span: 6 }}>
                                <Row>
                                    <Col>
                                        <h3 className="homeTitle">
                                            Recently Annotated
                                        </h3>
                                    </Col>
                                </Row>
                                
                                <RecentAnnotations />
                            </Col>
                            <Col md={{ span: 6 }}>
                                <Row>
                                    <Col>
                                        <h3 className="homeTitle">
                                            Recently added Specimens
                                        </h3>
                                    </Col>
                                </Row>

                                <RecentAdded />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default Body;
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/* Import Components */
import SearchBar from "./searchBar/SearchBar";
import SampleSpecimen from "./sampleSpecimen/SampleSpecimen";
import RecentAnnotations from "./recentAnnotations/RecentAnnotations";
import RecentAdded from "./recentAdded/RecentAdded";
import ObliqueBanner from './ObliqueBanner';

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
            <ObliqueBanner />

            <Container fluid>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <SearchBar
                            onSearch={() => HandleSearch()}
                            updateSearchQuery={(query) => UpdateSearchQuery(query)}
                        />

                        <Row className="mt-5">
                            <Col>
                                <Row className="mt-3">
                                    <Col md={{ span: 5 }}>
                                        <Row>
                                            <Col className="home_introTitle">
                                                <span className="strong"> U</span>nified we
                                                <span className="strong"> C</span>urate and
                                                <span className="strong"> A</span>nnotate <br />
                                                specimens in this <span className="strong"> S</span>ystem
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="home_introText">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="mt-5 position-relative">
                            <Col>
                                <Row className="mt-4">
                                    <Col md={{ span: 6 }} className="home_recentSection">
                                        <div className="home_recentSectionBackground" />

                                        <div className="home_recentSectionBody">
                                            <Row>
                                                <Col>
                                                    <h3 className="homeTitle">
                                                        Recently Annotated
                                                    </h3>
                                                </Col>
                                            </Row>

                                            <RecentAnnotations />
                                        </div>

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
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default Body;
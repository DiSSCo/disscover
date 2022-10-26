import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/* Import Components */
import ObliqueBanner from './ObliqueBanner';
import SearchBar from "./searchBar/SearchBar";
import RecentAnnotations from "./recentAnnotations/RecentAnnotations";
import SampleSpecimen from "./sampleSpecimen/SampleSpecimen";
import Mids from "./mids/Mids";

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
                                            <Col className="home_mainTitle">
                                                <span className="strong"> U</span>nified we
                                                <span className="strong"> C</span>urate and
                                                <span className="strong"> A</span>nnotate <br />
                                                specimens in this <span className="strong"> S</span>ystem
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="home_introText">
                                                UCAS is a FAIR annotation and curation platform.
                                                Human experts and machines can add annotations on Digital Specimens.
                                                The annotations are stored as FAIR Digital Objects (with a persistent identifier).
                                                UCAS also keeps track of the transactions on the data as provenance information related
                                                to the curation or annotation events.
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="mt-5 position-relative">
                            <Col>
                                <Row className="mt-5">
                                    <Col md={{ span: 12 }} className="home_recentSection">
                                        <div className="home_recentSectionBackground" />

                                        <div className="home_recentSectionBody">
                                            <Row>
                                                <Col>
                                                    <h3 className="home_title secondary">
                                                        Recently Annotated
                                                    </h3>
                                                </Col>
                                            </Row>

                                            <RecentAnnotations />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Mids />

                        <Row className="mt-5 position-relative">
                            <Col md={{ span: 12 }} className="mt-5">
                                <Row className="mt-4">
                                    <Col>
                                        <SampleSpecimen />
                                    </Col>
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
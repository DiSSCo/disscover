/* Import Dependencies */
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CountUp from 'react-countup';

/* Import Hooks */
import { useFetch } from 'app/Hooks';

/* Import Types */
import { Dict } from 'app/Types';

/* Import API */
import GetDigitalSpecimenDisciplines from 'api/digitalSpecimen/GetDigitalSpecimenDisciplines';

/* Import Components */
import { Header, Footer } from 'components/elements/Elements';
import { AdvancedSearch, Introduction, SearchBar, TopicFilters } from './components/HomeComponents';


/**
 * Base component that renders the Home page
 * @returns JSX Component
 */
const Home = () => {
    /* Hooks */
    const fetch = useFetch();

    /* Base variables */
    const [digitalSpecimenDisciplines, setDigitalSpecimenDisciplines] = useState<{
        disciplines: { topicDiscipline: { [topicDiscipline: string]: number } },
        metadata?: Dict
    } | undefined>();

    /* OnLoad: fetch digital specimen disciplines */
    fetch.Fetch({
        Method: GetDigitalSpecimenDisciplines,
        Handler: (digitalSpecimenDisciplines: {
            disciplines: { topicDiscipline: { [topicDiscipline: string]: number } },
            metadata?: Dict
        }) => setDigitalSpecimenDisciplines(digitalSpecimenDisciplines)
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render header*/}
            <Header span={10}
                offset={1}
            />

            {/* Home page body */}
            {(!fetch.loading && digitalSpecimenDisciplines) &&
                <Container fluid className="flex-grow-1">
                    <Row className="h-100">
                        <Col lg={{ span: 10, offset: 1 }}>
                            <Row className="h-100 align-items-center overflow-y-hidden overflow-x-hidden">
                                {/* Left side containing: total count and topic discipline filters */}
                                <Col lg={{ span: 6 }}
                                    className="pe-5"
                                >
                                    {/* Total count */}
                                    <Row>
                                        <Col>
                                            <p className="fs-2 tc-primary fw-bold">
                                                Total specimens: <CountUp end={digitalSpecimenDisciplines?.metadata?.totalRecords ?? 0} />
                                            </p>
                                        </Col>
                                    </Row>
                                    {/* Topic discipline filters */}
                                    <Row className="mt-2">
                                        <Col>
                                            <TopicFilters topicDisciplines={digitalSpecimenDisciplines?.disciplines} />
                                        </Col>
                                    </Row>
                                </Col>
                                {/* Right side containing: title, introduction text and advanced search options */}
                                <Col lg={{ span: 6 }}
                                    className="position-relative mt-1 ps-5"
                                >
                                    {/* Introduction */}
                                    <Row className="pb-3">
                                        <Col>
                                            <Introduction />
                                        </Col>
                                    </Row>
                                    {/* Query bar */}
                                    <Row className="mt-5">
                                        <Col>
                                            <SearchBar />
                                        </Col>
                                    </Row>
                                    {/* Advanced search */}
                                    <Row>
                                        <Col>
                                            <AdvancedSearch />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            }

            {/* Render footer */}
            <Footer span={10}
                offset={1}
            />
        </div>
    );
};

export default Home;
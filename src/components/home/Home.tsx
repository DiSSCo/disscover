/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from './home.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import HomeSteps from './steps/HomeSteps';
import Title from './components/Title';
import TopicDisciplineFilters from "./components/topicDisciplines/TopicDisciplineFilters";
import IntroText from "./components/IntroText";
import GlobalSearchBar from "./components/search/GlobalSearchBar";
import AdvancedSearch from "./components/search/AdvancedSearch";
import Footer from 'components/general/footer/Footer';


const Home = () => {
    /* Base variables */
    const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);

    /* ClassName for Advanced Search */
    const classAdvancedSearch = classNames({
        'opacity-0 transition z--1': true,
        'position-fixed top-100': !advancedSearch,
        'position-absolute opacity-100 z-1 top-0': advancedSearch
    });

    const classAdvancedToggled = classNames({
        'transition mt-2 mt-lg-4': true,
        'opacity-0': advancedSearch,
        'opacity-1': !advancedSearch
    });

    return (
        <div className="h-100 overflow-scroll d-flex flex-column">
            <Header introTopics={[{intro: 'home', title: 'About This Page'}]}/>

            <HomeSteps SetAdvancedSearch={(toggle: boolean) => setAdvancedSearch(toggle)} />

            <Container fluid className={`${styles.content} flex-grow-1`}>
                <Row className="h-100">
                    {/* First part of Homepage, relative to screen height */}
                    <Col md={{ span: 10, offset: 1 }} className="h-100">
                        {/* Title for tablet smaller screens */}
                        <Row className="d-lg-none mt-md-5">
                            <Col>
                                <Title />
                            </Col>
                        </Row>
                        <Row className="h-100 align-items-center">
                            <Col lg={{ span: 6 }} md={{ span: 12 }} className="specimenTypeFilters pe-lg-5 pt-md-4">
                                <TopicDisciplineFilters />
                            </Col>
                            <Col lg={{ span: 6 }} md={{ span: 12 }}
                                className="ps-lg-5 mt-md-4 d-flex flex-lg-column flex-md-column-reverse position-relative"
                            >
                                {/* Introduction Text */}
                                <Row className={classAdvancedToggled}>
                                    <Col>
                                        <IntroText />
                                    </Col>
                                </Row>
                                {/* General Search Bar */}
                                <Row className={`${classAdvancedToggled} globalSearchBar`}>
                                    <Col>
                                        <GlobalSearchBar ToggleAdvancedFilter={() => setAdvancedSearch(true)} />
                                    </Col>
                                </Row>
                                {/* Advanced Search */}
                                <div className={`${classAdvancedSearch} advancedSearch w-100 pe-5`} role="advancedSearch">
                                    <AdvancedSearch HideAdvancedSearch={() => setAdvancedSearch(false)} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Home;
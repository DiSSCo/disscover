/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import { Container, Row, Col } from "react-bootstrap";

/* Import Styles */
import styles from './home.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import SpecimenTypeFilters from "./components/specimenTypes/SpecimenTypeFilters";
import IntroText from "./components/IntroText";
import GlobalSearchBar from "./components/search/GlobalSearchBar";
import AdvancedSearch from "./components/search/AdvancedSearch";
import Footer from 'components/general/footer/Footer';


const Home = () => {
    /* Base variables */
    const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);

    /* ClassName for Advanced Search */
    const classAdvancedSearch = classNames({
        [`${styles.advancedSearch}`]: true,
        [`${styles.active}`]: advancedSearch
    });

    const classAdvancedToggled = classNames({
        [`${styles.advancedToggled}`]: true,
        [`${styles.active}`]: !advancedSearch
    });

    return (
        <div>
            <Header />

            <Container fluid className="vh-100">
                <Row className="h-100">
                    {/* First part of Homepage, relative to screen height */}
                    <Col md={{ span: 10, offset: 1 }} className="h-100">
                        <Row className="h-100 align-items-center">
                            <Col md={{ span: 6 }} className="pe-5">
                                <SpecimenTypeFilters />
                            </Col>
                            <Col md={{ span: 6 }} className="ps-5 position-relative">
                                <Row className={classAdvancedToggled}>
                                    <Col>
                                        {/* Introduction Text */}
                                        <IntroText />
                                    </Col>
                                </Row>
                                <Row className={`${classAdvancedToggled} mt-5`}>
                                    <Col className="mt-4">
                                        {/* General Search Bar */}
                                        <GlobalSearchBar ToggleAdvancedFilter={() => setAdvancedSearch(true)} />
                                    </Col>
                                </Row>

                                <div className={`${classAdvancedSearch} position-absolute w-100 pe-5`}>
                                    {/* Advanced Search */}
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
/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import { Steps } from 'intro.js-react';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getStepsEnabled, setStepsEnabled } from 'redux/general/GeneralSlice';

/* Import Styles */
import styles from './home.module.scss';

/* Import Sources */
import HomeIntro from 'sources/introText/home.json';

/* Import Components */
import Header from 'components/general/header/Header';
import Title from './components/Title';
import SpecimenTypeFilters from "./components/specimenTypes/SpecimenTypeFilters";
import IntroText from "./components/IntroText";
import GlobalSearchBar from "./components/search/GlobalSearchBar";
import AdvancedSearch from "./components/search/AdvancedSearch";
import Footer from 'components/general/footer/Footer';


const Home = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const stepsEnabled = useAppSelector(getStepsEnabled);
    const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);

    /* ClassName for Advanced Search */
    const classAdvancedSearch = classNames({
        [`${styles.advancedSearch}`]: true,
        'position-fixed': !advancedSearch,
        [`${styles.active} position-absolute`]: advancedSearch
    });

    const classAdvancedToggled = classNames({
        [`${styles.advancedToggled}`]: true,
        [`${styles.active}`]: !advancedSearch
    });

    /* Intro Steps */
    const steps = {
        steps: [
            {
                intro: HomeIntro['step_1']
            },
            {
                element: `.${styles.advancedToggled}`,
                intro: HomeIntro['step_2']
            },
            {
                element: `.specimenTypeFilters`,
                intro: HomeIntro['step_3']
            },
            {
                element: ".globalSearchBar",
                intro: HomeIntro['step_4']
            },
            {
                element: `.${styles.advancedToggled}`,
                intro: HomeIntro['step_5']
            }
        ]
    }

    return (
        <div>
            <Header />

            <Steps enabled={stepsEnabled}
                steps={steps.steps}
                initialStep={0}
                onBeforeChange={(nextIndex) => {
                    if (nextIndex >= 4) {
                        setAdvancedSearch(true);
                    } else {
                        setAdvancedSearch(false);
                    }
                }}
                onExit={() => {
                    dispatch(setStepsEnabled(false));
                    setAdvancedSearch(false);
                }}
            />

            <Container fluid className={styles.content}>
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
                                <SpecimenTypeFilters />
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
                                <Row className={`${classAdvancedToggled} globalSearchBar mt-4`}>
                                    <Col>
                                        <GlobalSearchBar ToggleAdvancedFilter={() => setAdvancedSearch(true)} />
                                    </Col>
                                </Row>
                                {/* Advanced Search */}
                                <div className={`${classAdvancedSearch} w-100 pe-5`} role="advancedSearch">
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
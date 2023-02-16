/* Import Dependencies */
import { useNavigate, createSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

/* Import Store */
import { useAppDispatch } from 'app/hooks';
import { setSearchQuery } from "redux/search/SearchSlice";

/* Import Styles */
import './home.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import ObliqueBanner from "./components/ObliqueBanner";
import SearchBar from "./components/SearchBar";
import IntroText from "./components/IntroText";
import RecentAnnotations from "./components/RecentAnnotations";
import Mids from "./components/Mids";
import SampleSpecimen from "./components/SampleSpecimen";
import Footer from 'components/general/footer/Footer';


const Home = () => {
    const navigate = useNavigate();

    /* Configure Store */
    const dispatch = useAppDispatch();

    /* Function for handling Specimen search */
    const HandleSearch = (searchQuery: string) => {
        /* Store search query */
        dispatch(setSearchQuery(searchQuery));

        navigate({
            pathname: '/search',
            search: `?${createSearchParams({ searchQuery: searchQuery })}`
        });
    }

    return (
        <div>
            <Header />

            <ObliqueBanner />

            <Container fluid>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row>
                            <Col>
                                <SearchBar HandleSearch={(searchQuery: string) => HandleSearch(searchQuery)} />
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col>
                                <IntroText />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <RecentAnnotations />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Mids />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <SampleSpecimen />
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
/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { usePagination } from 'app/Hooks';

/* Import API */
import GetDigitalSpecimens from 'api/digitalSpecimen/GetDigitalSpecimens';

/* Import Components */
import { SearchFiltersMenu, SearchResults, TopBar } from './components/SearchComponents';
import { BreadCrumbs, Footer, Header } from "components/elements/Elements";


/**
 * Base component that renders the Search page
 * @returns JSX Component
 */
const Search = () => {
    /* OnLoad: setup pagination */
    const pagination = usePagination({
        pageSize: 25,
        resultKey: 'digitalSpecimens',
        allowSearchParams: true,
        Method: GetDigitalSpecimens
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render header*/}
            <Header />

            {/* Search page body */}
            <Container fluid className="flex-grow-1 overflow-y-hidden my-5">
                <Row className="h-100">
                    <Col lg={{ span: 10, offset: 1 }}
                        className="h-100 d-flex flex-column"
                    >
                        {/* Bread crumbs */}
                        <Row>
                            <Col>
                                <BreadCrumbs />
                            </Col>
                        </Row>
                        {/* Top bar */}
                        <Row className="mt-2">
                            <Col>
                                <TopBar />
                            </Col>
                        </Row>
                        {/* Big body containing on the left: the search filters menu, and on the right: the search results table */}
                        <Row className="flex-grow-1 overflow-y-hidden mt-3">
                            {/* Search filters menu */}
                            <Col lg={{ span: 3 }}
                                className="h-100"
                            >
                                <SearchFiltersMenu />
                            </Col>
                            {/* Search results table */}
                            <Col lg={{ span: 9 }}
                                className="h-100"
                            >
                                <SearchResults pagination={pagination} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            {/* Render footer */}
            <Footer />
        </div>
    );
};

export default Search;
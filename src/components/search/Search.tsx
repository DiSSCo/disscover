/* Import Dependencies */
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useAppSelector, usePagination } from 'app/Hooks';

/* Import Store */
import { getDigitalSpecimen } from 'redux-store/DigitalSpecimenSlice';

/* Import API */
import GetDigitalSpecimens from 'api/digitalSpecimen/GetDigitalSpecimens';

/* Import Components */
import { IdCard, SearchFiltersMenu, SearchResults, TopBar } from './components/SearchComponents';
import { BreadCrumbs, Footer, Header } from "components/elements/Elements";


/**
 * Base component that renders the Search page
 * @returns JSX Component
 */
const Search = () => {
    /* Base variables */
    const digitalSpecimen = useAppSelector(getDigitalSpecimen);

    /* OnLoad: setup pagination */
    const pagination = usePagination({
        pageSize: 25,
        resultKey: 'digitalSpecimens',
        allowSearchParams: true,
        Method: GetDigitalSpecimens
    });

    /* Class Names */
    const searchFiltersMenuClass = classNames({
        'col-lg-3': !digitalSpecimen,
        'w-0 p-0 overflow-hidden': !!digitalSpecimen
    });

    const searchResultsClass = classNames({
        'col-lg-9': !digitalSpecimen,
        'col-lg-6': !!digitalSpecimen
    });

    const idCardClass = classNames({
        'w-0': !digitalSpecimen,
        'col-lg-6': !!digitalSpecimen
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
                            <div className={`${searchFiltersMenuClass} h-100 tr-smooth`}>
                                <SearchFiltersMenu />
                            </div>
                            {/* Search results table */}
                            <div className={`${searchResultsClass} h-100 tr-smooth`}>
                                <SearchResults pagination={pagination} />
                            </div>
                            {/* ID card */}
                            <div className={`${idCardClass} h-100 tr-smooth`}>
                                <IdCard />
                            </div>
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
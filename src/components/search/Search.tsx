/* Import Dependencies */
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';

/* Import Hooks */
import { useAppDispatch, useAppSelector, usePagination } from 'app/Hooks';

/* Import Store */
import { getSearchDigitalSpecimen, getCompareDigitalSpecimen, setSearchDigitalSpecimen, setSearchUrl, setSearchResults } from 'redux-store/SearchSlice';
import { getDigitalSpecimen, setDigitalSpecimenComplete } from 'redux-store/DigitalSpecimenSlice';

/* Import Types */
import { TourTopic } from 'app/Types';

/* Import API */
import GetDigitalSpecimens from 'api/digitalSpecimen/GetDigitalSpecimens';

/* Import Styles */
import styles from './Search.module.scss';

/* Import Components */
import SearchTourSteps from './tourSteps/SearchTourSteps';
import CompareTourSteps from './tourSteps/CompareTourSteps';
import { CompareDigitalSpecimenMenu, IdCard, SearchFiltersMenu, SearchResults, TopBar } from './components/SearchComponents';
import { Footer, Header, ContentNavigation } from "components/elements/Elements";


/**
 * Base component that renders the Search page
 * @returns JSX Component
 */
const Search = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const searchDigitalSpecimen = useAppSelector(getSearchDigitalSpecimen);
    const compareDigitalSpecimen = useAppSelector(getCompareDigitalSpecimen);
    const tourTopics: TourTopic[] = [{
        name: 'search',
        title: 'About This Page'
    }, {
        name: 'compare',
        title: 'Comparing Specimens'
    }];
    const digitalSpecimen = useAppSelector(getDigitalSpecimen);

    /* Clean up digital specimen in store to start fresh */
    useEffect(() => {
        if (digitalSpecimen) {
            dispatch(setDigitalSpecimenComplete({ digitalSpecimen: undefined, digitalMedia: [], annotations: [] }));
            dispatch(setSearchDigitalSpecimen(undefined));
        }; 
    }, []);

    /* OnLoad: setup pagination */
    const pagination = usePagination({
        pageSize: 25,
        resultKey: 'digitalSpecimens',
        allowSearchParams: true,
        Method: GetDigitalSpecimens
    });
    if (pagination) {
        dispatch(setSearchResults({ records: pagination.records, currentPage: pagination.currentPage}))
    }

    /* OnLoad: set search url in store */
    useEffect(() => {
        dispatch(setSearchUrl(location.href));
    }, []);

    /* Class Names */
    const searchResultsClass = classNames({
        'col-lg-6': !!searchDigitalSpecimen,
        'col-lg-9 offset-lg-3': !searchDigitalSpecimen
    });

    const compareDigitalSpecimenMenuClass = classNames({
        'd-none': !compareDigitalSpecimen
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render header*/}
            <Header span={10}
                offset={1}
                tourTopics={tourTopics}
            />

            {/* Search page body */}
            <Container fluid className="flex-grow-1 overflow-y-hidden my-5">
                <Row className="h-100 position-relative">
                    <Col lg={{ span: 10, offset: 1 }}
                        className="h-100 d-flex flex-column"
                    >
                        {/* Content navigation*/}
                        <Row>
                            <Col>
                                <ContentNavigation />
                            </Col>
                        </Row>
                        {/* Top bar */}
                        <Row className="mt-2">
                            <Col>
                                <TopBar />
                            </Col>
                        </Row>
                        {/* Big body containing on the left: the search filters menu, and on the right: the search results table, when toggled the ID card */}
                        <Row className="flex-grow-1 position-relative overflow-y-hidden mt-3">
                            {/* Search filters menu */}
                            <Col lg={{ span: 3 }}
                                className="tourSearch5 tourSearch6 h-100 position-absolute"
                            >
                                <SearchFiltersMenu />
                            </Col>
                            {/* Search results table */}
                            <Col className={`tourSearch3 tourCompare3 tourCompare4 tourCompare5 ${searchResultsClass} h-100 tr-smooth z-1 bgc-default`}>
                                <SearchResults pagination={pagination} />
                            </Col>
                            {/* ID card */}
                            <Col lg={{ span: 6, offset: 6 }}
                                className={`tourSearch4 ${styles.idCard} h-100 position-absolute`}
                            >
                                <IdCard />
                            </Col>
                        </Row>
                    </Col>

                    {/* Compare digital specimens menu */}
                    <div className={`tourCompare6 ${compareDigitalSpecimenMenuClass} position-absolute w-25 end-0 bottom-0 z-1`}>
                        <Row>
                            <Col lg={{ span: 10 }}>
                                <CompareDigitalSpecimenMenu />
                            </Col>
                        </Row>
                    </div>
                </Row>
            </Container>

            {/* Render footer */}
            <Footer span={10}
                offset={1}
            />

            {/* Tour steps */}
            <SearchTourSteps pagination={pagination} />
            <CompareTourSteps pagination={pagination} />
        </div>
    );
};

export default Search;
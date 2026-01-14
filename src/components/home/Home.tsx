/* Import Dependencies */
import { Formik, Form } from 'formik';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';

/* Import Hooks */
import { useAppDispatch, useAppSelector, useFetch } from 'app/Hooks';

/* Import Types */
import { Dict } from 'app/Types';

/* Import API */
import GetDigitalSpecimenDisciplines from 'api/digitalSpecimen/GetDigitalSpecimenDisciplines';

/* Import Components */
import { AdvancedSearch, DatasetDisclaimer, Introduction, SearchBar, TopicFilters } from './components/HomeComponents';
import { Button } from 'components/elements/customUI/CustomUI';

/* Import Store */
import { getDigitalSpecimen, setDigitalSpecimenComplete } from 'redux-store/DigitalSpecimenSlice';
import { setSearchDigitalSpecimen } from 'redux-store/SearchSlice';

/**
 * Base component that renders the Home page
 * @returns JSX Component
 */
const Home = () => {
    /* Hooks */
    const navigate = useNavigate();
    const fetch = useFetch();
    const dispatch = useAppDispatch();

    /* Base variables */
    const [digitalSpecimenDisciplines, setDigitalSpecimenDisciplines] = useState<{
        disciplines: { topicDiscipline: { [topicDiscipline: string]: number } },
        metadata?: Dict
    } | undefined>();
    const [advancedSearchToggle, setAdvancedSearchToggle] = useState<boolean>(false);
    const initialFormValues: {
        query: string,
        topicDisciplines: string[],
        naturalOrigin?: boolean,
        humanMade?: boolean,
        unclassified?: boolean
    } = {
        query: '',
        topicDisciplines: []
    };
    const digitalSpecimen = useAppSelector(getDigitalSpecimen);

    /* Clean up digital specimen in store to start fresh */
    useEffect(() => {
        if (digitalSpecimen) {
            dispatch(setDigitalSpecimenComplete({ digitalSpecimen: undefined, digitalMedia: [], annotations: [] }));
            dispatch(setSearchDigitalSpecimen(undefined));
        }; 
    }, []);

    /* OnLoad, fetch digital specimen disciplines */
    fetch.Fetch({
        Method: GetDigitalSpecimenDisciplines,
        Handler: (digitalSpecimenDisciplines: {
            disciplines: { topicDiscipline: { [topicDiscipline: string]: number } },
            metadata?: Dict
        }) => setDigitalSpecimenDisciplines(digitalSpecimenDisciplines)
    });

    return (
        <div className="h-90 d-flex flex-column">
            {/* Home page body */}
            {(!fetch.loading && digitalSpecimenDisciplines) &&
                <Container fluid className="flex-grow-1 overflow-hidden">
                    <Row className="h-100">
                        <Col lg={{ span: 10, offset: 1 }}
                            className="d-flex align-items-center"
                        >
                            <div className="position-relative">
                                <Formik initialValues={initialFormValues}
                                    onSubmit={async (values) => {
                                        await new Promise((resolve) => setTimeout(resolve, 100));

                                        /* Construct link to search based upon given query and/or selected topic disciplines */
                                        let searchLink: string = '/search';

                                        /* If query is present, add query as search param */
                                        if (values.query) {
                                            searchLink = searchLink.concat(`?q=${values.query}`);
                                        }

                                        /* If any topic disciplines are selected, add them as search params */
                                        ([...values.topicDisciplines, ...(values.unclassified ? ['unclassified'] : [])]).forEach((topicDiscipline, index) => {
                                            let linkExtension: string = `${(index > 0 || searchLink.includes('?')) ? '&' : '?'}topicDiscipline=`;

                                            /* Check if topic discipline belongs to other */
                                            if (topicDiscipline === 'other') {
                                                searchLink = searchLink.concat(linkExtension.concat('Other+Biodiversity&topicDiscipline=Other+Geodiversity'));
                                            } else {
                                                searchLink = searchLink.concat(linkExtension.concat(capitalize(topicDiscipline)));
                                            };
                                        });

                                        navigate(searchLink);
                                    }}
                                >
                                    {({ values, setFieldValue }) => (
                                        <Form>
                                            <Row className="align-items-center overflow-y-hidden overflow-x-hidden">
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
                                                            <TopicFilters topicDisciplines={digitalSpecimenDisciplines?.disciplines}
                                                                formValues={values}
                                                                SetFieldValue={(fieldName: string, value: string[] | boolean) => setFieldValue(fieldName, value)}
                                                            />
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
                                                    {/* Submit button and advanced search */}
                                                    <Row className="mt-3">
                                                        {/* Submit button */}
                                                        <Col>
                                                            <Button type="submit"
                                                                variant="primary"
                                                            >
                                                                Search
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    {/* Dataset disclaimer */}
                                                    <Row className="mt-3">
                                                        <Col>
                                                            <DatasetDisclaimer />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form>
                                    )}
                                </Formik>

                                {/* Advanced search */}
                                <Row className="flex-row-reverse">
                                    <Col lg="auto">
                                        <AdvancedSearch advancedSearchToggle={advancedSearchToggle}
                                            SetAdvancedSearchToggle={setAdvancedSearchToggle}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    );
};

export default Home;
/* Import Dependencies */
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import CountUp from 'react-countup';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppDispatch } from 'app/hooks';
import { setSearchSpecimen } from 'redux/search/SearchSlice';

/* Import Types */
import { DigitalSpecimen, Dict } from 'app/Types';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import Components */
import FilterBlock from './FilterBlock';
import TopicDisciplineText from '../TopicDisciplineText';
import TopicDisciplineIcon from 'components/general/icons/TopicDisciplineIcon';

/* Import API */
import GetSpecimenDisciplines from 'api/specimen/GetSpecimenDisciplines';


const TopicDisciplineFilters = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* Base variables */
    const [initialValues, setInitialValues] = useState<Dict>({
        disciplines: {
            Microbiology: false,
            Anthropology: false,
            Botany: false,
            Zoology: false,
            Palaeontology: false,
            Other: false,
            Ecology: false,
            Geology: false,
            EarthSystem: false,
            Astrogeology: false
        },
        NaturalOrigin: false,
        HumanMade: false,
        Unclassified: false
    });
    const [disciplines, setDisciplines] = useState<Dict>({ reduce: 0 });
    const [totalSpecimenCount, setTotalSpecimenCount] = useState<number>(0);
    const [naturalOriginCount, setNaturalOriginCount] = useState<number>(0);
    const naturalOriginCheckBoxRef = useRef<HTMLInputElement>(null);

    /* OnLoad: fetch Disciplines */
    useEffect(() => {
        GetSpecimenDisciplines().then(({ disciplines, metadata }) => {
            setDisciplines(disciplines.topicDiscipline);

            /* Calculate total records belonging to Natural Origin */
            let naturalOriginCount: number = 0;

            for (const disciplineKey in disciplines.topicDiscipline) {
                if (disciplineKey !== 'Unclassified') {
                    naturalOriginCount += disciplines.topicDiscipline[disciplineKey];
                }
            }

            setNaturalOriginCount(naturalOriginCount);

            /* Set total specimen count */
            if (metadata.totalRecords) {
                setTotalSpecimenCount(metadata.totalRecords);
            }
        }).catch(error => {
            console.warn(error);
        });
    }, []);

    /* Function for selecting or deselecting all filters */
    const SelectAll = (selected: boolean) => {
        const copyInitalValues = {
            NaturalOrigin: selected,
            disciplines: {}
        } as Dict;

        Object.keys(initialValues.disciplines).forEach((discipline) => {
            copyInitalValues.disciplines[discipline] = selected;
        });

        setInitialValues(copyInitalValues);
    }

    return (
        <Row>
            <Col>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={async (values) => {
                        await new Promise((resolve) => setTimeout(resolve, 100));

                        /* Construct Search URL based on disciplines */
                        let searchLink: string = '/search';

                        Object.keys(values.disciplines).concat(['HumanMade', 'Unclassified']).forEach((discipline: string) => {
                            if (values.disciplines[discipline] || values[discipline]) {
                                /* Check for Disciplines with spaces */
                                if (discipline === 'Other') {
                                    discipline = 'Other+Biodiversity&topicDiscipline=Other+Geodiversity';
                                }

                                /* Append variable sign if neccesary */
                                if (searchLink === '/search') {
                                    searchLink = searchLink.concat(`?topicDiscipline=${discipline}`);
                                } else {
                                    searchLink = searchLink.concat(`&&topicDiscipline=${discipline}`);
                                }
                            }
                        });

                        /* Reset specimen (cached chosen one) */
                        dispatch(setSearchSpecimen({} as DigitalSpecimen));

                        navigate(searchLink);
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            {/* Title */}
                            <Row>
                                <Col>
                                    <p className="fs-2 c-primary fw-bold">Total specimens: <CountUp end={totalSpecimenCount} /></p>
                                </Col>
                            </Row>
                            {/* Specimen Type Blocks */}
                            <Row className="mt-2">
                                <Col>
                                    {/* Microbiology, Anthropology and Botany */}
                                    <Row>
                                        <Col md={{ span: 4 }} className="pe-2">
                                            <FilterBlock type="Microbiology"
                                                title="Microbiology"
                                                subTitle="Biology"
                                                discipline={disciplines['Microbiology']}
                                                icon={TopicDisciplineIcon('Microbiology')}
                                                ToggleFilterType={() => setFieldValue('disciplines.Microbiology', !values.disciplines.Microbiology)}
                                            />
                                        </Col>
                                        <Col md={{ span: 4 }} className="px-2">
                                            <FilterBlock type="Anthropology"
                                                title="Anthropology"
                                                subTitle="Biology"
                                                discipline={disciplines['Anthropology']}
                                                icon={TopicDisciplineIcon('Anthropology')}
                                                ToggleFilterType={() => setFieldValue('disciplines.Anthropology', !values.disciplines.Anthropology)}
                                            />
                                        </Col>
                                        <Col md={{ span: 4 }} className="ps-2">
                                            <FilterBlock type="Botany"
                                                title="Botany"
                                                subTitle="Biology"
                                                discipline={disciplines['Botany']}
                                                icon={TopicDisciplineIcon('Botany')}
                                                ToggleFilterType={() => setFieldValue('disciplines.Botany', !values.disciplines.Botany)}
                                            />
                                        </Col>
                                    </Row>
                                    {/* Zoology, Palaeontology and Other Geo/Biodiversity */}
                                    <Row>
                                        <Col md={{ span: 4 }} className="pe-2">
                                            <FilterBlock type="Zoology"
                                                title="Zoology"
                                                subTitle="Biology"
                                                discipline={disciplines['Zoology']}
                                                icon={TopicDisciplineIcon('Zoology')}
                                                ToggleFilterType={() => setFieldValue('disciplines.Zoology', !values.disciplines.Zoology)}
                                            />
                                        </Col>
                                        <Col md={{ span: 4 }} className="px-2">
                                            <FilterBlock type="Palaeontology"
                                                title="Palaeontology"
                                                subTitle="Biology/Geology"
                                                discipline={disciplines['Palaeontology']}
                                                icon={TopicDisciplineIcon('Palaeontology')}
                                                ToggleFilterType={() => setFieldValue('disciplines.Palaeontology', !values.disciplines.Palaeontology)}
                                            />
                                        </Col>
                                        <Col md={{ span: 4 }} className="ps-2">
                                            <FilterBlock type="Other"
                                                title={`Other Bio / Geodiversity`}
                                                subTitle="Biology/Geology"
                                                discipline={disciplines['Other']}
                                                ToggleFilterType={() => setFieldValue('disciplines.Other', !values.disciplines.Other)}
                                            />
                                        </Col>
                                    </Row>
                                    {/* Environment, Earth System and Astrogeology */}
                                    <Row>
                                        <Col md={{ span: 4 }} className="pe-2">
                                            <FilterBlock type="Ecology"
                                                title="Ecology"
                                                subTitle="Biology"
                                                discipline={disciplines['Ecology']}
                                                icon={TopicDisciplineIcon('Ecology')}
                                                ToggleFilterType={() => setFieldValue('disciplines.Ecology', !values.disciplines.Ecology)}
                                            />
                                        </Col>
                                        <Col md={{ span: 4 }} className="px-2">
                                            <FilterBlock type="Geology"
                                                title="Earth Geology"
                                                subTitle="Geology"
                                                discipline={disciplines['Geology']}
                                                icon={TopicDisciplineIcon('Geology')}
                                                ToggleFilterType={() => setFieldValue('disciplines.Geology', !values.disciplines.Geology)}
                                            />
                                        </Col>
                                        <Col md={{ span: 4 }} className="ps-2">
                                            <FilterBlock type="Astrogeology"
                                                title={`Astrogeology`}
                                                subTitle="Geology"
                                                discipline={disciplines['Astrogeology']}
                                                icon={TopicDisciplineIcon('Astrogeology')}
                                                ToggleFilterType={() => setFieldValue('disciplines.Astrogeology', !values.disciplines.Astrogeology)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            {/* Human Made and Unclassified */}
                            <Row className="mt-4">
                                <Col md={{ span: 4 }} className="pe-2">
                                    <button type="button"
                                        className={`${styles.specimenTypeGreenVariant} ${styles.specimenTypeBlock} py-3 px-4 w-100 b-none`}
                                        onClick={() => {
                                            if (naturalOriginCheckBoxRef.current?.value === 'true') {
                                                SelectAll(false);
                                            } else if (naturalOriginCheckBoxRef.current?.value === 'false') {
                                                SelectAll(true);
                                            }
                                        }}
                                    >
                                        <Row className="h-50">
                                            <Col>
                                                <p className={`${styles.topicOriginTitle} fw-lightBold`}> Natural Origin </p>
                                            </Col>
                                            <Col className="col-md-auto">
                                                <Field name={`NaturalOrigin`}
                                                    type="checkbox"
                                                    className={styles.specimenTypeSpecialCheckbox}
                                                    innerRef={naturalOriginCheckBoxRef}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="h-50">
                                            <Col className="d-flex justify-content-end align-items-end">
                                                <p className={`${styles.topicOriginTitle} fw-lightBold`}>
                                                    <CountUp end={naturalOriginCount} />
                                                </p>
                                            </Col>
                                        </Row>
                                    </button>
                                </Col>
                                <Col md={{ span: 4 }} className="px-2">
                                    <button type="button"
                                        className={`${styles.specimenTypeBlueVariant} ${styles.specimenTypeBlock} py-3 px-4 w-100 b-none`}
                                        onClick={() => setFieldValue('HumanMade', !values.HumanMade)}
                                    >
                                        <Row className="h-50">
                                            <Col>
                                                <p className={`${styles.topicOriginTitle} fw-lightBold`}> Human made </p>
                                                <p className={`${styles.specimenTypeSpecialSubTitle} fs-4`}> (Archive material) </p>
                                            </Col>
                                            <Col className="col-md-auto">
                                                <Field name={`HumanMade`}
                                                    type="checkbox"
                                                    className={styles.specimenTypeSpecialCheckbox}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="h-50">
                                            <Col className="d-flex justify-content-end align-items-end">
                                                <p className={`${styles.topicOriginTitle} fw-lightBold`}>
                                                    <CountUp end={disciplines['Human Made']} />
                                                </p>
                                            </Col>
                                        </Row>
                                    </button>
                                </Col>
                                <Col md={{ span: 4 }} className="ps-2">
                                    <button type="button"
                                        className={`${styles.specimenTypeGreenVariant} ${styles.specimenTypeBlock} py-3 px-4 w-100 b-none`}
                                        onClick={() => setFieldValue('Unclassified', !values.Unclassified)}
                                    >
                                        <Row className="h-50">
                                            <Col>
                                                <p className={`${styles.topicOriginTitle} fw-lightBold`}> Unclassified </p>
                                            </Col>
                                            <Col className="col-md-auto">
                                                <Field name={`Unclassified`}
                                                    type="checkbox"
                                                    className={styles.specimenTypeSpecialCheckbox}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="h-50">
                                            <Col className="d-flex justify-content-end align-items-end">
                                                <p className={`${styles.topicOriginTitle} fw-lightBold`}>
                                                    <CountUp end={disciplines['Unclassified']} />
                                                </p>
                                            </Col>
                                        </Row>
                                    </button>
                                </Col>
                            </Row>
                            {/* Select all and Submit */}
                            <Row className="mt-4">
                                <Col className="d-flex justify-content-end">
                                    <button className="primaryButton px-3 py-1" type="submit">
                                        View
                                    </button>
                                </Col>
                            </Row>
                            {/* On smaller screens: Intro text */}
                            <Row className="mt-md-4 d-lg-none">
                                <Col>
                                    <TopicDisciplineText />
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row>
    );
}

export default TopicDisciplineFilters;
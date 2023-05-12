/* Import Dependencies */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import Components */
import FilterBlock from './FilterBlock';


const SpecimenTypeFilters = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const [initialValues, setInitalValues] = useState<Dict>({
        all: false,
        specimenTypes: {
            microbiology: false,
            anthropology: false,
            botany: false,
            zoology: false,
            palaeontology: false,
            other: false,
            environment: false,
            earthSystem: false,
            astrology: false
        },
        humanMade: false,
        unclassified: false
    });

    /* Function for selecting or deselecting all filters */
    const SelectAll = (selected: boolean) => {
        const copyInitalValues = {
            all: selected,
            specimenTypes: {}
        } as Dict;

        Object.keys(initialValues.specimenTypes).forEach((specimenType) => {
            copyInitalValues.specimenTypes[specimenType] = selected;
        });

        setInitalValues(copyInitalValues);
    }

    return (
        <Row>
            <Col>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={async (values) => {
                        await new Promise((resolve) => setTimeout(resolve, 100));

                        navigate('/search');
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            {/* Title */}
                            <Row>
                                <Col>
                                    <p className={`${styles.specimenTypeHead} fw-bold`}>Total specimens: 0</p>
                                    <p className={`${styles.specimenTypeSubHead} mt-2`}>Natural origin</p>
                                </Col>
                            </Row>
                            {/* Specimen Type Blocks */}
                            <Row className="mt-2">
                                <Col>
                                    {/* Microbiology, Anthropology and Botany */}
                                    <Row>
                                        <Col md={{ span: 4 }} className="pe-2">
                                            <FilterBlock type="microbiology"
                                                title="Microbiology"
                                                subTitle="Biology"
                                                ToggleFilterType={() => setFieldValue('specimenTypes.microbiology', !values.specimenTypes.microbiology)}
                                            />
                                        </Col>
                                        <Col md={{ span: 4 }} className="px-2">
                                            <FilterBlock type="anthropology"
                                                title="Anthropology"
                                                subTitle="Biology"
                                                ToggleFilterType={() => setFieldValue('specimenTypes.anthropology', !values.specimenTypes.anthropology)}
                                            />
                                        </Col>
                                        <Col md={{ span: 4 }} className="ps-2">
                                            <FilterBlock type="botany"
                                                title="Botany"
                                                subTitle="Biology"
                                                ToggleFilterType={() => setFieldValue('specimenTypes.botany', !values.specimenTypes.botany)}
                                            />
                                        </Col>
                                    </Row>
                                    {/* Zoology, Palaeontology and Other Geo/Biodiversity */}
                                    <Row>
                                        <Col md={{ span: 4 }} className="pe-2">
                                            <FilterBlock type="zoology"
                                                title="Zoology"
                                                subTitle="Biology"
                                                ToggleFilterType={() => setFieldValue('specimenTypes.zoology', !values.specimenTypes.zoology)}
                                            />
                                        </Col>
                                        <Col md={{ span: 4 }} className="px-2">
                                            <FilterBlock type="palaeontology"
                                                title="Palaeontology"
                                                subTitle="Biology/Geology"
                                                ToggleFilterType={() => setFieldValue('specimenTypes.palaeontology', !values.specimenTypes.palaeontology)}
                                            />
                                        </Col>
                                        <Col md={{ span: 4 }} className="ps-2">
                                            <FilterBlock type="other"
                                                title={`Other Bio / Geodiversity`}
                                                subTitle="Biology/Geology"
                                                ToggleFilterType={() => setFieldValue('specimenTypes.other', !values.specimenTypes.other)}
                                            />
                                        </Col>
                                    </Row>
                                    {/* Environment, Earth System and Extraterres */}
                                    <Row>
                                        <Col md={{ span: 4 }} className="pe-2">
                                            <FilterBlock type="environment"
                                                title="Environment"
                                                ToggleFilterType={() => setFieldValue('specimenTypes.environment', !values.specimenTypes.environment)}
                                            />
                                        </Col>
                                        <Col md={{ span: 4 }} className="px-2">
                                            <FilterBlock type="earthSystem"
                                                title="Earth System"
                                                subTitle="Geology"
                                                ToggleFilterType={() => setFieldValue('specimenTypes.earthSystem', !values.specimenTypes.earthSystem)}
                                            />
                                        </Col>
                                        <Col md={{ span: 4 }} className="ps-2">
                                            <FilterBlock type="astrology"
                                                title={`Astrology`}
                                                subTitle="Geology"
                                                ToggleFilterType={() => setFieldValue('specimenTypes.astrology', !values.specimenTypes.astrology)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            {/* Select all checkbox */}
                            <Row>
                                <Col className="col-md-auto pe-1 d-flex align-items-center">
                                    <Field name="all" type="checkbox"
                                        className={styles.specimenTypeSpecialCheckbox}
                                        onClick={(checkbox: any) => SelectAll(checkbox.target.checked)}
                                    />
                                </Col>
                                <Col className="d-flex align-items-center">
                                    <p className={styles.specimenTypeSelectAllText}> Select all </p>
                                </Col>
                            </Row>

                            {/* Human Made and Unclassified */}
                            <Row className="mt-4">
                                <Col md={{ span: 6 }} className="pe-2">
                                    <div className={`${styles.specimenTypeHumanMade} ${styles.specimenTypeBlock} py-3 px-4`}
                                        onClick={() => setFieldValue('humanMade', !values.humanMade)}
                                    >
                                        <Row className="h-50">
                                            <Col>
                                                <p className={styles.specimenTypeSpecialTitle}> Human Made </p>
                                                <p className={styles.specimenTypeSpecialSubTitle}> (Archive material) </p>
                                            </Col>
                                            <Col className="col-md-auto">
                                                <Field name={`humanMade`}
                                                    type="checkbox"
                                                    className={styles.specimenTypeSpecialCheckbox}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="h-50">
                                            <Col className="d-flex justify-content-end align-items-end">
                                                <p className={styles.specimenTypeAmount}> 0 </p>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col md={{ span: 6 }} className="ps-2">
                                    <div className={`${styles.specimenTypeUnclassified} ${styles.specimenTypeBlock} py-3 px-4`}
                                        onClick={() => setFieldValue('unclassified', !values.unclassified)}
                                    >
                                        <Row className="h-50">
                                            <Col>
                                                <p className={styles.specimenTypeSpecialTitle}> Unclassified </p>
                                            </Col>
                                            <Col className="col-md-auto">
                                                <Field name={`unclassified`}
                                                    type="checkbox"
                                                    className={styles.specimenTypeSpecialCheckbox}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="h-50">
                                            <Col className="d-flex justify-content-end align-items-end">
                                                <p className={styles.specimenTypeAmount}> 0 </p>
                                            </Col>
                                        </Row>
                                    </div>
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
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row>
    );
}

export default SpecimenTypeFilters;
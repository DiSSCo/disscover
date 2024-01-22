/* Import Dependencies */
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getOrganisations } from 'redux/general/GeneralSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import styles from 'components/home/home.module.scss';


const CollectionFacilitySearch = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const organisations = useAppSelector(getOrganisations);

    /* Function for handling Collection Facility search */
    const HandleSearch = (formData: Dict) => {
        if (formData.idType === 'local') {
            /* Navigate to Search page with Organisation as filter */
            navigate(`/search?organisationName=${formData.organisationName}`);
        }
    }

    return (
        <Row className="mt-2">
            <Col>
                <Formik
                    initialValues={{
                        idType: 'local',
                        organisationName: ''
                    }}
                    onSubmit={async (values) => {
                        await new Promise((resolve) => setTimeout(resolve, 100));

                        HandleSearch(values);
                    }}
                >
                    <Form>
                        {/* Search by field (idType) */}
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <p className="fw-lightBold mb-1"> Search by </p>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col>
                                        <Field name="idType" as="select"
                                            className={`${styles.searchBar} rounded-full w-100 px-3`}
                                        >
                                            <option value="local" label="Local Name" />
                                        </Field>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {/* Search by Organisation (needs to add facility as well) */}
                        <Row className="mt-3">
                            <Col>
                                <Row>
                                    <Col>
                                        <p className="fw-lightBold mb-1"> Organisation hosting the collection facility </p>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col>
                                        <Field name="organisationName" as="select"
                                            className={`${styles.searchBar} rounded-full w-100 px-3`}
                                        >
                                            <option value="" label="Choose an Organisation" disabled />

                                            {organisations.map((organisationName) => {
                                                return (
                                                    <option key={organisationName}
                                                        value={organisationName}
                                                        label={organisationName}
                                                    />
                                                );
                                            })}
                                        </Field>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col className="d-flex justify-content-end">
                                <button type="submit" className="primaryButton px-3 py-1">
                                    Search
                                </button>
                            </Col>
                        </Row>
                    </Form>
                </Formik>
            </Col>
        </Row>
    );
}

export default CollectionFacilitySearch;
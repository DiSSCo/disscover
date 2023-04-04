/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSearchFacilityId, setSearchFacility } from 'redux/search/SearchSlice';

/* Import Types */
import { Organisation, Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import API */
import GetOrganisations from 'api/organisation/GetOrganisations';


const CollectionFacilitySearch = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* Base variables */
    const { idType, organisationId } = useAppSelector(getSearchFacilityId);
    const [organisations, setOrganisations] = useState<Organisation[]>([]);

    /* Fetch Organisations */
    useEffect(() => {
        GetOrganisations().then((organisations) => {
            if (!isEmpty(organisations)) {
                setOrganisations(organisations);
            }
        });
    }, []);

    /* Function for handling Collection Facility search */
    const HandleSearch = (formData: Dict) => {
        if (formData.idType === 'local') {
            /* Set search state */
            dispatch(setSearchFacility({
                idType: 'local',
                organisationId: formData.organisationId
            }));

            /* Navigate to Search page with Organisation as filter */
            navigate({
                pathname: '/search',
                search: `?organisationId=${formData.organisationId}`
            });
        }
    }

    return (
        <Row>
            <Col>
                <Formik
                    initialValues={{
                        idType: idType,
                        organisationId: organisationId
                    }}
                    onSubmit={async (values) => {
                        await new Promise((resolve) => setTimeout(resolve, 100));

                        HandleSearch(values);
                    }}
                >
                    {({ values }) => (
                        <Form>
                            {/* Search by field (idType) */}
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <p className="fw-bold mb-1"> Search by </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field name="idType" as="select"
                                                className={`${styles.searchBar} w-100`}
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
                                            <p className="fw-bold mb-1"> Organisation hosting the collection facility </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field name="organisationId" as="select"
                                                className={`${styles.searchBar} w-100`}
                                            >
                                                <option value="" label="Choose an Organisation" disabled />

                                                {organisations.map((organisation) => {
                                                    return (
                                                        <option key={organisation.ror}
                                                            value={organisation.ror}
                                                            label={organisation.name}
                                                        />
                                                    );
                                                })}
                                            </Field>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="pt-3">
                                <Col className="d-flex justify-content-end">
                                    <button type="submit" className={`${styles.searchButton} px-3 py-1`}>
                                        Search
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

export default CollectionFacilitySearch;
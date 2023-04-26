/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSearchPhysicalId, setSearchPhysicalId } from 'redux/search/SearchSlice';

/* Import Types */
import { Organisation, Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import API */
import SearchSpecimens from 'api/specimen/SearchSpecimens';
import GetOrganisations from 'api/organisation/GetOrganisations';


const PhysicalIDSearch = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* Base variables */
    const { idType, idValue, organisationId } = useAppSelector(getSearchPhysicalId);
    const [organisations, setOrganisations] = useState<Organisation[]>([]);
    const [errorActive, setErrorActive] = useState(false);

    /* Fetch Organisations */
    useEffect(() => {
        GetOrganisations().then((organisations) => {
            if (!isEmpty(organisations)) {
                setOrganisations(organisations);
            }
        });
    }, []);

    /* Function for handling Physical ID search */
    const HandleSearch = (formData: Dict) => {
        if (formData.idType === 'gui') {
            /* Set search state */
            dispatch(setSearchPhysicalId({
                idType: 'gui',
                idValue: formData.idValue
            }));

            /* Search for Specimen by Global Unique Identifier */
            SearchSpecimens([{ physicalSpecimenId: formData.idValue }], 25).then((specimens) => {
                if (!isEmpty(specimens)) {
                    navigate({
                        pathname: `/ds/${specimens[0].id}`,
                    });
                } else {
                    /* Display not found message */
                    setErrorActive(true);
                }
            });
        } else if (formData.idType === 'local') {
            /* Set search state */
            dispatch(setSearchPhysicalId({
                idType: 'local',
                idValue: formData.idValue,
                organisationId: formData.organisationId
            }));

            /* Search for Specimen by Local Identifier */
            if (formData.idValue) {
                SearchSpecimens([{ physicalSpecimenId: `${formData.idValue}:${formData.organisationId}` }], 25).then((specimens) => {
                    if (!isEmpty(specimens)) {
                        navigate({
                            pathname: `/ds/${specimens[0].id}`,
                        });
                    } else {
                        /* Display not found message */
                        setErrorActive(true);
                    }
                });
            } else {
                /* If no local id is given, navigate to Search page with chosen Organisation as filter */
                navigate({
                    pathname: '/search',
                    search: `?organisationId=${formData.organisationId}`
                });
            }
        }
    }

    /* Handle error message */
    useEffect(() => {
        if (errorActive) {
            setTimeout(() => {
                setErrorActive(false);
            }, 3000);
        }
    }, [errorActive])

    /* Class Name for Not Found Message */
    const classNotFound = classNames({
        [`${styles.notFound}`]: true,
        [`${styles.active}`]: errorActive
    });

    return (
        <Row className="mt-2">
            <Col>
                <Formik
                    initialValues={{
                        idType: idType,
                        idValue: idValue,
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
                                            <p className="fw-lightBold mb-1"> Search by </p>
                                        </Col>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col>
                                            <Field name="idType" as="select"
                                                className={`${styles.searchBar} w-100`}
                                            >
                                                <option value="gui" label="Global Unique Identifier" />
                                                <option value="local" label="Local Identifier" />
                                            </Field>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {/* Organisation field (organisationId, visible if idType is local */}
                            {(values.idType === 'local') &&
                                <Row className="mt-3">
                                    <Col>
                                        <Row>
                                            <Col>
                                                <p className="fw-lightBold mb-1"> Organisation hosting the specimen </p>
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col>
                                                <Field name="organisationId" as="select"
                                                    className={`${styles.searchBar} w-100`}
                                                >
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
                            }
                            {/* ID field (idValue) */}
                            <Row className="mt-3">
                                <Col>
                                    <Row>
                                        <Col>
                                            <p className="fw-lightBold mb-1">
                                                {(values.idType === 'gui') ?
                                                    <> Global Unique Identifier </>
                                                    : <> Local Identifier </>
                                                }
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col>
                                            <Field name="idValue"
                                                className={`${styles.searchBar} w-100`}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="mt-4">
                                <Col>
                                    <p className={`${classNotFound} m-0`}>
                                        {`No Digital Specimen found with Physical ID: ${idValue}`}
                                    </p>
                                </Col>
                                <Col className="col-md-auto">
                                    <button type="submit" className="primaryButton px-3 py-1">
                                        Search
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row>
    )
}

export default PhysicalIDSearch;
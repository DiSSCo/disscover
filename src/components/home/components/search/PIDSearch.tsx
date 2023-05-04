/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSearchPIDQuery, setSearchPIDQuery } from 'redux/search/SearchSlice';
import { setSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import API */
import GetSpecimen from 'api/specimen/GetSpecimen';


const PIDSearch = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* Base variables */
    const PIDQuery = useAppSelector(getSearchPIDQuery);
    const [errorActive, setErrorActive] = useState(false);

    /* Function for handling PID search */
    const HandleSearch = (PIDQuery: string) => {
        if (PIDQuery) {
            /* Set query to state */
            dispatch(setSearchPIDQuery(PIDQuery));

            /* Try to fetch Specimen using PID */
            GetSpecimen(PIDQuery).then((specimen) => {
                /* Check if an exact Specimen was found */
                if (!isEmpty(specimen)) {
                    /* Set Specimen and navigate to Specimen page */
                    dispatch(setSpecimen(specimen));

                    navigate({
                        pathname: `/ds/${specimen.id}`,
                    });
                } else {
                    /* Display not found message */
                    setErrorActive(true);
                }
            }).catch();
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
                        PIDQuery: PIDQuery
                    }}
                    onSubmit={async (values) => {
                        await new Promise((resolve) => setTimeout(resolve, 100));

                        HandleSearch(values.PIDQuery);
                    }}
                >
                    <Form>
                        <Row>
                            <Col>
                                <p className="mb-1 fw-lightBold"> DOI </p>
                            </Col>
                        </Row>
                        <Row className="mt-1">
                            <Col>
                                <Field name="PIDQuery"
                                    className={`${styles.searchBar} w-100`}
                                    placeholder="20.5000.1025/DW0-BNT-FM0"
                                />
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <p className={`${classNotFound} m-0`}> {`No Digital Specimen found for ID: ${PIDQuery}`} </p>
                            </Col>
                            <Col className="col-md-auto d-flex justify-content-end">
                                <button type="submit" className="primaryButton px-3 py-1">
                                    Search
                                </button>
                            </Col>
                        </Row>
                    </Form>
                </Formik>
            </Col>
        </Row>
    )
}

export default PIDSearch;
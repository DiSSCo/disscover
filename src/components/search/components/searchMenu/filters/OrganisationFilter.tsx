/* Import Dependencies */
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { FieldArray, Field } from "formik";
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Organisation } from "global/Types";

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import API */
import GetOrganisations from "api/organisation/GetOrganisations";


/* Props Typing */
interface Props {
    selectedOrganisations: string[],
    searchQuery: string
};


const OrganisationFilter = (props: Props) => {
    const { selectedOrganisations, searchQuery } = props;

    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base Variables */
    const [organisations, setOrganisations] = useState<Organisation[]>([]);
    const [filteredOrganisatons, setFitleredOrganisations] = useState<Organisation[]>([]);

    /* OnLoad: fetch Organisations */
    useEffect(() => {
        GetOrganisations().then((organisations) => {
            if (organisations) {
                setOrganisations(organisations);
            }
        });
    }, []);

    /* OnChange of selected Organisations or search query, filter selectable Organisations */
    useEffect(() => {
        /* Filter selectable Organisations */
        const filteredOrganisations = organisations.filter((organisation) => {
            return (
                !(selectedOrganisations.includes(organisation.ror)) &&
                (searchQuery ? organisation.name.toLowerCase().search(searchQuery.toLowerCase()) >= 0 : true)
            );
        })

        setFitleredOrganisations(filteredOrganisations);
    }, [organisations, selectedOrganisations, searchQuery]);

    /* Onchange of selected Organisations, filter by Organisations */
    useEffect(() => {
        /* If length of selected and search filters do not comply, empty search filters */
        if (selectedOrganisations.length < searchParams.getAll('organisationId').length) {
            searchParams.delete('organisationId');
        }

        /* Append or update 'organisationId' search param foreach checked Organisation */
        selectedOrganisations.forEach((selectedOrganisation) => {
            if (!searchParams.getAll('organisationId').includes(selectedOrganisation)) {
                searchParams.append('organisationId', selectedOrganisation);
            }
        });

        setSearchParams(searchParams);
    }, [selectedOrganisations]);

    return (
        <Row className={`${styles.filterBlock} h-100`}>
            <Col>
                <Row>
                    <Col>
                        <p> Organisation </p>
                    </Col>
                </Row>

                <FieldArray name="filters.organisations">
                    {({ push, remove }) => (
                        <>
                            {/* Selected Organisations */}
                            {selectedOrganisations.map((ror, index) => {
                                const organisation = organisations.find((organisation) => organisation.ror === ror);

                                return (
                                    <Row key={ror} className={styles.filterSelectedList}>
                                        <Col md={{ span: 10 }}>
                                            <p className={`${styles.filterListItem} py-1`}> {organisation?.name} </p>
                                        </Col>

                                        <Col md={{ span: 2 }} className="d-flex justify-content-center align-items-center">
                                            <Field name={`filters.organisations.${ror}`}
                                                type="checkbox"
                                                checked={true}
                                                onChange={() => {
                                                    remove(index);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                );
                            })}

                            {/* Search bar for searching in optional Organisations */}
                            {/* Disabled untill further notice: <Field name="organisationSearch"
                                className="w-100"
                            /> */}

                            {/* Optional Organisations to select */}
                            {filteredOrganisatons.map((organisation) => {
                                return (
                                    <Row key={organisation.ror}>
                                        <Col md={{ span: 10 }}>
                                            <p className={`${styles.filterListItem} py-1`}> {organisation.name} </p>
                                        </Col>

                                        <Col md={{ span: 2 }} className="d-flex justify-content-center align-items-center">
                                            <Field name={`filters.organisations.${organisation.ror}`}
                                                type="checkbox"
                                                onChange={(field: ChangeEvent<HTMLInputElement>) => {
                                                    if (field.target.checked) {
                                                        push(organisation.ror);
                                                    }
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                );
                            })}
                        </>
                    )}
                </FieldArray>
            </Col>
        </Row>
    );
}

export default OrganisationFilter;
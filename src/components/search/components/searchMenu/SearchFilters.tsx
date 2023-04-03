/* Import Dependencies */
import { useSearchParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Components */
import OrganisationFilter from './filters/OrganisationFilter';


const SearchFilters = () => {
    /* Hooks */
    const [searchParams] = useSearchParams();

    return (
        <Row>
            <Col className="px-4 py-2">
                <Row>
                    <Col className="fw-bold">
                        Filters
                    </Col>
                </Row>

                <Formik
                    initialValues={{
                        filters: {
                            organisations: searchParams.getAll('organisationId'),
                        },
                        organisationSearch: ''
                    }}
                    onSubmit={async (values) => {
                        await new Promise((resolve) => setTimeout(resolve, 100));

                        console.log(values);
                    }}
                >
                    {({ values }) => (
                        <Form>
                            {/* Organisation Filter */}
                            <OrganisationFilter selectedOrganisations={values.filters.organisations}
                                searchQuery={values.organisationSearch}
                            />
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row>
    )
}

export default SearchFilters;
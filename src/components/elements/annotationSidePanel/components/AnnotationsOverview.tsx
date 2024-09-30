/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form } from "formik";
import KeycloakService from "app/Keycloak";
import { Row, Col, Card } from "react-bootstrap";

/* Import Types */
import { Annotation } from "app/types/Annotation";

/* Import Icons */
import { faGears, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

/* Import Components */
import AnnotationCard from "./AnnotationCard";
import SortingFilters from "./SortingFilters";
import { Button } from "components/elements/customUI/CustomUI";


/* Props Type */
type Props = {
    annotations: Annotation[],
    filterSortValues: {
        motivation: string,
        sortBy: string
    },
    SetFilterSortValues: Function,
    StartAnnotationWizard: Function
};


/**
 * Component that renders the annotations overview in the annotation side panel
 * @param annotations The annotations to be rendered in the overview
 * @param filterSortValues The filter/sort values to refine the overview annotations
 * @param SetFilterSortValues Function to set the filter/sort values
 * @param StartAnnotationWizard Function that starts the annotation wizard
 * @returns JSX Component
 */
const AnnotationsOverview = (props: Props) => {
    const { annotations, filterSortValues, SetFilterSortValues, StartAnnotationWizard } = props;;

    /**
     * Function to sort and filter annotations by the selected values
     * @param motivation The annotation motivation to filter by
     * @param sortBy The type of field to sort by
     */
    const SortAndFilerAnnotations = (motivation: string, sortBy: string) => {
        let filteredSortedAnnotations: Annotation[] = [];

        /* Filter by motivation */
        if (!motivation) {
            filteredSortedAnnotations = annotations;
        } else {
            filteredSortedAnnotations = annotations.filter(annotation => annotation["oa:motivation"] === motivation);
        }

        /* Sort by */
        if (sortBy === 'dateLatest') {
            filteredSortedAnnotations.sort((a, b) => a["dcterms:modified"] < b["dcterms:modified"] ? 1 : 0);
        } else if (sortBy === 'dateOldest') {
            filteredSortedAnnotations.sort((a, b) => a["dcterms:modified"] > b["dcterms:modified"] ? 1 : 0);
        }

        return filteredSortedAnnotations;
    };

    const overviewAnnotations = SortAndFilerAnnotations(filterSortValues.motivation, filterSortValues.sortBy);

    return (
        <div className="h-100 d-flex flex-column">
            {/* Sorting filters */}
            <Row>
                <Col>
                    <Formik initialValues={filterSortValues}
                        enableReinitialize={true}
                        onSubmit={async (values) => {
                            await new Promise((resolve) => setTimeout(resolve, 100));

                            /* Set filtered and sorted annotations */
                            // setOverviewAnnotations(SortAndFilerAnnotations(values.motivation, values.sortBy));
                            SetFilterSortValues(values);
                        }}
                    >
                        {({ values, setFieldValue, submitForm }) => (
                            <Form>
                                <SortingFilters formValues={values}
                                    SetFieldValue={setFieldValue}
                                    SubmitForm={submitForm}
                                />
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
            {/* Annotations */}
            <Row className="flex-grow-1 overflow-scroll mt-4">
                <Col>
                    {overviewAnnotations.length ? overviewAnnotations.map(annotation => (
                        <div key={annotation['ods:ID']}
                            className="mb-2"
                        >
                            <AnnotationCard annotation={annotation} />
                        </div>
                    )) : <p className="fs-4 tc-grey fst-italic">
                        Currently, this digital object does not have any annotations
                    </p>}
                </Col>
            </Row>
            {/* Bottom menu with option to add an annotation or toggle machine anotation services */}
            <Row>
                <Col className="px-0">
                    <Card />

                    <Row className="flex-row-reverse mt-3">
                        {/* Add annotation button */}
                        <Col lg="auto"
                            className="ps-1"
                        >
                            <Button type="button"
                                variant="accent"
                                disabled={!KeycloakService.IsLoggedIn()}
                                OnClick={() => KeycloakService.IsLoggedIn() && StartAnnotationWizard()}
                            >
                                <p>
                                    <FontAwesomeIcon icon={faPenToSquare}
                                        className="me-2"
                                    />
                                    Add Annotation
                                </p>
                            </Button>
                        </Col>
                        {/* Machine annotation services button */}
                        <Col lg="auto">
                            <Button type="button"
                                variant="accent"
                            >
                                <p>
                                    <FontAwesomeIcon icon={faGears}
                                        size="lg"
                                        className="me-2"
                                    />
                                    Machine Annotation Services
                                </p>
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationsOverview;
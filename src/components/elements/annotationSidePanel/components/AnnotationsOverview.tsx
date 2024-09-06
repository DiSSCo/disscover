/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form } from "formik";
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
    StartAnnotationWizard: Function
};


/**
 * Component that renders the annotations overview in the annotation side panel
 * @param annotations The annotations to be rendered in the overview
 * @param StartAnnotationWizard Function that starts the annotation wizard
 * @returns JSX Component
 */
const AnnotationsOverview = (props: Props) => {
    const { annotations, StartAnnotationWizard } = props;

    /* Base variables */
    const initialFormValues = {
        filterByMotivation: '',
        sortByDate: ''
    };

    return (
        <div className="h-100 d-flex flex-column">
            {/* Sorting filters */}
            <Row>
                <Col>
                    <Formik initialValues={initialFormValues}
                        onSubmit={async (values) => {
                            await new Promise((resolve) => setTimeout(resolve, 100));


                        }}
                    >
                        <Form>
                            <SortingFilters />
                        </Form>
                    </Formik>
                </Col>
            </Row>
            {/* Annotations */}
            <Row className="flex-grow-1">
                <Col>
                    {annotations.map(annotation => (
                        <AnnotationCard key={annotation['ods:ID']}
                            annotation={annotation}
                        />
                    ))}
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
                                OnClick={() => StartAnnotationWizard()}
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
/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form } from "formik";
import KeycloakService from "app/Keycloak";
import { Row, Col, Card } from "react-bootstrap";

/* Import Hooks */
import { useAppSelector, useAppDispatch } from "app/Hooks";

/* Import Store */
import { setAnnotationTarget } from "redux-store/AnnotateSlice";
import { getAnnotationWizardDummyAnnotation } from "redux-store/TourSlice";

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
    schemaTitle: string,
    SetFilterSortValues: Function,
    StartAnnotationWizard: Function,
    RefreshAnnotations: Function,
    OpenMasMenu: Function,
    ShowPolicyText: Function
};


/**
 * Component that renders the annotations overview in the annotation side panel
 * @param annotations The annotations to be rendered in the overview
 * @param filterSortValues The filter/sort values to refine the overview annotations
 * @param schemaTitle The title of the super class schema
 * @param SetFilterSortValues Function to set the filter/sort values
 * @param StartAnnotationWizard Function that starts the annotation wizard
 * @param RefresAnnotations Function to refresh the annotations in the annotations overview
 * @param OpenMasMenu Function to open the MAS menu
 * @param ShowPolicyText Function to show the annotation policy text in the side panel
 * @returns JSX Component
 */
const AnnotationsOverview = (props: Props) => {
    const { annotations, filterSortValues, schemaTitle, SetFilterSortValues, StartAnnotationWizard, RefreshAnnotations, OpenMasMenu, ShowPolicyText } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const tourAnnotationWizardDummyAnnotation = useAppSelector(getAnnotationWizardDummyAnnotation);

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

    /* Set overview annotations */
    const overviewAnnotations = [
        ...(tourAnnotationWizardDummyAnnotation ? [tourAnnotationWizardDummyAnnotation] : []),
        ...SortAndFilerAnnotations(filterSortValues.motivation, filterSortValues.sortBy)
    ];

    /**
     * Function to start editing an existing annotation
     * @param annotation The annotation to be edited
     */
    const EditAnnotation = (annotation: Annotation) => {
        /* Determine annotation target type */
        let annotationTargetType: 'superClass' | 'class' | 'term' = 'superClass';
        let jsonPath: string = '$';

        if (annotation["oa:hasTarget"]["oa:hasSelector"]?.["@type"] === 'ods:ClassSelector') {
            if (annotation["oa:hasTarget"]["oa:hasSelector"]["ods:class"] !== '$') {
                annotationTargetType = 'class';
            }

            jsonPath = annotation["oa:hasTarget"]["oa:hasSelector"]["ods:class"].replaceAll('"', "'");
        } else if (annotation["oa:hasTarget"]["oa:hasSelector"]?.["@type"] === 'ods:TermSelector') {
            annotationTargetType = 'term';

            jsonPath = annotation["oa:hasTarget"]["oa:hasSelector"]["ods:term"].replaceAll('"', "'");
        }

        /* Set annotation target to this annotation */
        dispatch(setAnnotationTarget({
            type: annotationTargetType,
            jsonPath,
            annotation: {
                id: annotation["@id"],
                motivation: annotation["oa:motivation"],
                values: annotation["oa:hasBody"]["oa:value"]
            }
        }));

        /* Start annotation wizard */
        StartAnnotationWizard();
    };

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
                    {overviewAnnotations.length ? overviewAnnotations.map((annotation, index) => (
                        <div key={annotation['@id']}
                            className={`${!index ? 'tourAnnotate19' : ''} mb-2`}
                        >
                            <AnnotationCard annotation={annotation}
                                schemaTitle={schemaTitle}
                                EditAnnotation={EditAnnotation}
                                RefreshAnnotations={RefreshAnnotations}
                            />
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

                    <p className="fs-5 tc-grey mt-2 text-end">
                        {`To make an annotation you must agree with our `}
                        <span className="tc-accent">
                            <Button type="button"
                                variant="blank"
                                className="py-0 px-0"
                                OnClick={() => ShowPolicyText()}
                            >
                                <p className="fs-5">
                                    annotation policy
                                </p>
                            </Button>
                        </span>
                    </p>

                    <Row className="flex-row-reverse mt-2">
                        {/* Add annotation button */}
                        <Col lg="auto"
                            className="tourAnnotate6 ps-1"
                        >
                            <Button type="button"
                                variant="accent"
                                disabled={!KeycloakService.IsLoggedIn() || !KeycloakService.GetParsedToken()?.orcid}
                                OnClick={() => (KeycloakService.IsLoggedIn() && KeycloakService.GetParsedToken()?.orcid) && StartAnnotationWizard()}
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
                                OnClick={() => OpenMasMenu()}
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
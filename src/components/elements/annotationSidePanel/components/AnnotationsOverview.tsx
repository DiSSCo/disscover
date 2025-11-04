/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form } from "formik";
import KeycloakService from "app/Keycloak";
import { Row, Col, Card } from "react-bootstrap";

/* Import Utilities */
import { ExtractLastSegmentFromPath } from "app/utilities/SchemaUtilities";

/* Import Hooks */
import { useAppSelector, useAppDispatch } from "app/Hooks";

/* Import Store */
import { setAnnotationTarget } from "redux-store/AnnotateSlice";
import { getAnnotationWizardDummyAnnotation } from "redux-store/TourSlice";

/* Import Types */
import { Annotation } from "app/types/Annotation";
import { AnnotationTarget } from "app/Types";

/* Import Icons */
import { faGears, faPenToSquare, faX } from "@fortawesome/free-solid-svg-icons";

/* Import Components */
import AnnotationCard from "./AnnotationCard";
import SortingFilters from "./SortingFilters";
import { Button, Tooltip } from "components/elements/customUI/CustomUI";


/* Props Type */
type Props = {
    annotations: Annotation[],
    annotationTarget?: AnnotationTarget,
    filterSortValues: {
        motivation: string,
        sortBy: string
    },
    SetFilterSortValues: Function,
    StartAnnotationWizard: Function,
    RefreshAnnotations: Function,
    OpenMasMenu: Function,
    ShowPolicyText: Function
};


/**
 * Component that renders the annotations overview in the annotation side panel
 * @param annotations The annotations to be rendered in the overview
 * @param annotationTarget The annotation target that specifies the targetted part of the digital object
 * @param filterSortValues The filter/sort values to refine the overview annotations
 * @param SetFilterSortValues Function to set the filter/sort values
 * @param StartAnnotationWizard Function that starts the annotation wizard
 * @param RefresAnnotations Function to refresh the annotations in the annotations overview
 * @param OpenMasMenu Function to open the MAS menu
 * @param ShowPolicyText Function to show the annotation policy text in the side panel
 * @returns JSX Component
 */
const AnnotationsOverview = (props: Props) => {
    const { annotations, annotationTarget, filterSortValues, SetFilterSortValues, StartAnnotationWizard, RefreshAnnotations, OpenMasMenu, ShowPolicyText } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const tourAnnotationWizardDummyAnnotation = useAppSelector(getAnnotationWizardDummyAnnotation);

    /**
     * Function to sort and filter annotations by the selected values
     * @param motivation The annotation motivation to filter by
     * @param sortBy The type of field to sort by
     */
    const SortAndFilerAnnotations = (motivation: string, sortBy: string, jsonPath?: string) => {
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

        /* Filter by json Path if present */
        if (jsonPath) {
            filteredSortedAnnotations = filteredSortedAnnotations.filter(annotation => {
                if (annotation["oa:hasTarget"]["oa:hasSelector"]?.["@type"] === 'ods:ClassSelector') {
                    return annotation["oa:hasTarget"]["oa:hasSelector"]["ods:class"] === jsonPath.replaceAll("'", '"');
                } else if (annotation["oa:hasTarget"]["oa:hasSelector"]?.["@type"] === 'ods:TermSelector') {
                    return annotation["oa:hasTarget"]["oa:hasSelector"]["ods:term"] === jsonPath.replaceAll("'", '"');
                }
            });
        }

        return filteredSortedAnnotations;
    };

    /* Set overview annotations */
    const overviewAnnotations = [
        ...(tourAnnotationWizardDummyAnnotation ? [tourAnnotationWizardDummyAnnotation] : []),
        ...SortAndFilerAnnotations(filterSortValues.motivation, filterSortValues.sortBy, annotationTarget?.jsonPath)
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
                values: annotation["oa:hasBody"]?.["oa:value"]
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
            {/* Annotation target if defined */}
            {annotationTarget &&
                <Row className="mt-3">
                    <Col lg="auto"
                        className="pe-0"
                    >
                        <Button type="button"
                            variant="blank"
                            className="px-0 py-0"
                            OnClick={() => dispatch(setAnnotationTarget(undefined))}
                        >
                            <FontAwesomeIcon icon={faX}
                                className="tc-primary"
                            />
                        </Button>
                    </Col>
                    <Col className="d-flex align-items-center">
                        <p className="fs-4">
                            <span className="fw-lightBold">
                                {`Annotation target: `}
                            </span>
                            {ExtractLastSegmentFromPath(annotationTarget.jsonPath)}
                        </p>
                    </Col>
                </Row>
            }
            {/* Annotations */}
            <Row className="overflow-scroll mt-4">
                <Col>
                    {overviewAnnotations.length ? overviewAnnotations.map((annotation, index) => (
                        <div key={annotation['@id']}
                            className={`${!index ? 'tourAnnotate19' : ''} mb-2`}
                        >
                            <AnnotationCard annotation={annotation}
                                EditAnnotation={EditAnnotation}
                                RefreshAnnotations={RefreshAnnotations}
                            />
                        </div>
                    )) : <p className="fs-4 tc-grey fst-italic mb-4">
                        Currently, this digital object does not have any annotations
                    </p>}
                </Col>
            </Row>
            {/* Bottom menu with option to add an annotation or toggle machine anotation services */}
            <Row>
                <Col className="px-0">
                    <p className="fs-5 tc-grey mt-2">
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

                    <Row className="mt-2">
                        {/* Add annotation button */}
                        <Col lg="auto"
                            className="tourAnnotate6"
                        >

                            <Button type="button"
                                variant="primary"
                                disabled={!KeycloakService.IsLoggedIn() || !KeycloakService.GetParsedToken()?.orcid}
                                OnClick={() => (KeycloakService.IsLoggedIn() && KeycloakService.GetParsedToken()?.orcid) && StartAnnotationWizard()}
                            >
                                <Tooltip text="You must be logged in and have a valid ORCID attached to your profile to be able to annotate"
                                    placement="top"
                                    active={!KeycloakService.IsLoggedIn() || !KeycloakService.GetParsedToken()?.orcid}
                                >
                                    <p>
                                        Add Annotation
                                    </p>
                                </Tooltip>
                            </Button>

                        </Col>
                        {/* Machine annotation services button */}
                        <Col lg="auto"
                            className="tourMas4"
                        >
                            <Button type="button"
                                variant="secondary"
                                OnClick={() => OpenMasMenu()}
                                className="b-secondary-hard"
                            >
                                <p>
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
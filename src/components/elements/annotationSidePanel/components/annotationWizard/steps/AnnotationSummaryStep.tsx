/* Import Dependencies */
import { capitalize, isEmpty } from 'lodash';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Utilities */
import { MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';
import { AnnotationWizardTourTrigger } from 'app/utilities/TourUtilities';

/* Import Hooks */
import { useAppSelector, useTrigger } from 'app/Hooks';

/* Import Store */
import { getAnnotationTarget } from 'redux-store/AnnotateSlice';
import { getAnnotationWizardFormValues } from 'redux-store/TourSlice';
import { getTourTopic } from 'redux-store/GlobalSlice';

/* Import Types */
import { Dict, SuperClass } from 'app/Types';

/* Import Components */
import SummaryValueBlock from './SummaryValueBlock';
import SummaryValuesBlock from './SummaryValuesBlock';
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    superClass: SuperClass,
    schemaTitle: string,
    formValues?: Dict,
    SetFieldValue?: Function
};


/**
 * Component that renders the fourth and final step of the annotation wizard, presenting a summary of the annotation to the user
 * @param superClass The selected super class
 * @param schemaTitle The title of the super class schema
 * @param formValues The current form values of the annotation form
 * @param SetFieldValue Function to set the value of a field in the annotation wizard form
 * @returns JSX Component
 */
const AnnotationSummaryStep = (props: Props) => {
    const { superClass, schemaTitle, formValues, SetFieldValue } = props;

    /* Hooks */
    const trigger = useTrigger();

    /* Base variables */
    const annotationTarget = useAppSelector(getAnnotationTarget);
    const tourTopic = useAppSelector(getTourTopic);
    const tourAnnotationWizardFormValues = useAppSelector(getAnnotationWizardFormValues);
    let motivationDescription: string;

    /* Trigger for tour annotation wizard form values */
    trigger.SetTrigger(() => {
        /**
         * Only apply tour values if the annotation tour is active.
         * This prevents the tour's dummy data from overwriting the user's real data.
         */
        if (tourTopic === 'annotate' && tourAnnotationWizardFormValues) {
            AnnotationWizardTourTrigger(tourAnnotationWizardFormValues, SetFieldValue);
        }
    }, [tourAnnotationWizardFormValues, tourTopic]);

    /* Define motivation description based upon selected motivation, deleting is not part of this */
    switch (formValues?.motivation) {
        case 'ods:adding': {
            motivationDescription = 'Annotation which will add a new instance of:';

            break;
        } case 'oa:editing': {
            motivationDescription = 'Annotation which modifies this existing instance of:';

            break;
        } case 'oa:assessing': {
            motivationDescription = 'Annotation which assesses this instance of:';

            break;
        } default: {
            motivationDescription = 'Annotation which comments on this instance of:';
        }
    };

    return (
        <div className="h-100 d-flex flex-column">
            {/* Title text */}
            <Row>
                <Col>
                    <p>
                        Please check to see if your annotation is satisfied. Then click on the save button to post and save it.
                    </p>
                </Col>
            </Row>
            {/* Motivation description and annotation target */}
            <Row className="mt-4">
                <Col>
                    <Card className="px-3 py-2">
                        <p className="fs-4 fw-bold">
                            {motivationDescription}
                        </p>
                        <p>
                            <span className="tc-primary fw-lightBold">
                                {`${capitalize(annotationTarget?.type)}: `}
                            </span>
                            {MakeJsonPathReadableString(annotationTarget?.jsonPath !== '$' ? annotationTarget?.jsonPath ?? '' : schemaTitle)}
                        </p>
                    </Card>
                </Col>
            </Row>
            {/* Annotation values */}
            <Row className="mt-3">
                <Col>
                    <p>
                        Values to be annotated:
                    </p>
                </Col>
                <Col lg="auto"
                    className="d-flex align-items-center"
                >
                    <p className="fs-5 tc-grey">
                        (New or modified values are marked with blue)
                    </p>
                </Col>
            </Row>
            <Row className="flex-grow-1 overflow-scroll mt-2">
                {formValues?.jsonPath &&
                    <Col>
                        {(annotationTarget?.type === 'class' && ['ods:adding', 'oa:editing'].includes(formValues?.motivation)) ?
                            <>
                                {Object.entries(formValues?.annotationValues).filter(([className, classValue]) => (!isEmpty(classValue) && className !== 'value')).sort(
                                    (a, b) => a > b ? 1 : 0
                                ).map(([className, classValue]: [string, any]) => (
                                    <div key={className}>
                                        {Array.isArray(classValue) ?
                                            <>
                                                {classValue.map((childValue, index) => {
                                                    const key = `${className}_${index}`;

                                                    return (
                                                        <div key={key}
                                                            className="mb-3"
                                                        >
                                                            <SummaryValuesBlock superClass={superClass}
                                                                className={className}
                                                                values={childValue}
                                                                motivation={formValues?.motivation}
                                                                index={index}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </>
                                            : <div className="mb-3">
                                                <SummaryValuesBlock superClass={superClass}
                                                    className={className}
                                                    values={classValue}
                                                    motivation={formValues?.motivation}
                                                />
                                            </div>
                                        }
                                    </div>
                                ))}
                            </>
                            : <SummaryValueBlock superClass={superClass}
                                termName={MakeJsonPathReadableString(formValues?.jsonPath !== '$' ? formValues?.jsonPath ?? '' : schemaTitle)}
                                value={formValues?.annotationValues.value}
                                jsonPath={formValues?.jsonPath}
                                motivation={formValues?.motivation}
                            />
                        }
                    </Col>
                }
            </Row>
            {/* Save annotation button */}
            <Row className="flex-row-reverse mt-3">
                <Col lg="auto"
                    className="tourAnnotate18"
                >
                    <Button type="submit"
                        variant="primary"
                    >
                        <p>
                            Save Annotation
                        </p>
                    </Button>
                </Col>
            </Row>
        </div >
    );
};

export default AnnotationSummaryStep;
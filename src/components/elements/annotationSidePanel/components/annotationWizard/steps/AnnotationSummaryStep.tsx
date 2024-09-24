/* Import Dependencies */
import { capitalize } from 'lodash';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Utilities */
import { MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Hooks */
import { useAppSelector } from 'app/Hooks';

/* Import Store */
import { getAnnotationTarget } from 'redux-store/AnnotateSlice';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalMedia } from 'app/types/DigitalMedia';
import { Dict } from 'app/Types';

/* Import Components */
import SummaryValuesBlock from './SummaryValuesBlock';
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    superClass: DigitalSpecimen | DigitalMedia | Dict
    formValues?: Dict
};


/**
 * Component that renders the fourth and final step of the annotation wizard, presenting a summary of the annotation to the user
 * @param superClass The selected super class
 * @param formValues The current form values of the annotation form
 * @returns JSX Component
 */
const AnnotationSummaryStep = (props: Props) => {
    const { superClass, formValues } = props;

    /* Base variables */
    const annotationTarget = useAppSelector(getAnnotationTarget);
    let motivationDescription: string;

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
                            {MakeJsonPathReadableString(annotationTarget?.jsonPath ?? '')}
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
                <Col>
                    {annotationTarget?.type === 'class' ?
                        <>
                            {Object.entries(formValues?.annotationValues).sort().map(([className, classValue]: [string, any]) => (
                                <>
                                    {Array.isArray(classValue) ?
                                        <>
                                            {classValue.map((childValue, index) => (
                                                <div className="mb-3">
                                                    <SummaryValuesBlock superClass={superClass}
                                                        className={className}
                                                        values={childValue}
                                                        index={index}
                                                    />
                                                </div>
                                            ))}
                                        </>
                                        : <div className="mb-3">
                                            <SummaryValuesBlock superClass={superClass}
                                                className={className}
                                                values={classValue}
                                            />
                                        </div>
                                    }
                                </>
                            ))}
                        </>
                        : <Card>

                        </Card>
                    }
                </Col>
            </Row>
            {/* Save annotation button */}
            <Row className="flex-row-reverse mt-3">
                <Col lg="auto">
                    <Button type="button"
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
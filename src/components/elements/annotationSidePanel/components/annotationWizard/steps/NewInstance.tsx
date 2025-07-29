/* Import Dependencies */
import classNames from 'classnames';
import jp from 'jsonpath';
import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Utilities */
import { MakeReadableString } from 'app/Utilities';
import { ExtractParentClasses } from 'app/utilities/AnnotateUtilities';
import { MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Hooks */
import { useAppSelector, useTrigger } from 'app/Hooks';

/* Import Store */
import { getAnnotationWizardFormValues } from 'redux-store/TourSlice';

/* Import Types */
import { AnnotationTarget, Dict, ParentClass, SuperClass } from 'app/Types';

/* Import Components */
import ParentClassification from './ParentClassification';
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    superClass: SuperClass,
    selected: boolean,
    annotationTarget?: AnnotationTarget,
    formValues?: Dict,
    SetFieldValue?: Function
};


/**
 * Component that renders a new, annotatable instance of the selected annotation target in the select instance step of the wizard
 * @param superClass The provided super class
 * @param selected Boolean indicating if the new instance option has been selected
 * @param annotationTarget The annotation target set
 * @param formValues The current values in the annotation wizard form
 * @param SetFieldValue Function to set a value of a field in the form
 * @returns JSX Component
 */
const NewInstance = (props: Props) => {
    const { superClass, selected, annotationTarget, formValues, SetFieldValue } = props;

    /* Hooks */
    const trigger = useTrigger();

    /* Base variables */
    const tourAnnotationWizardFormValues = useAppSelector(getAnnotationWizardFormValues);
    const [parentClasses, setParentClasses] = useState<ParentClass[]>([]);

    /* Tour trigger for when new instance needs to become selected */
    trigger.SetTrigger(() => {
        if (tourAnnotationWizardFormValues) {
            /* Set tour class */
            SetFieldValue?.('class', tourAnnotationWizardFormValues.class);

            /* Reset annotation values */
            SetFieldValue?.('annotationValues', {});

            /* Set motivation */
            SetFieldValue?.('motivation', 'ods:adding');

            /* Set JSON path */
            SetFieldValue?.('jsonPath', tourAnnotationWizardFormValues.jsonPath);
        }
    }, [tourAnnotationWizardFormValues]);

    /* Check for parent classes, they either contain the term 'has' or start with a capital */
    trigger.SetTrigger(() => {
        let parentClasses: ParentClass[] = [];

        if (annotationTarget) {
            parentClasses = ExtractParentClasses({
                annotationTarget: {
                    ...annotationTarget,
                    jsonPath: annotationTarget.jsonPath.replace(/\[\d+\]/g, '')
                },
                superClass
            });
        }

        setParentClasses(parentClasses);
    }, [annotationTarget]);

    /* Class Names */
    const selectedDivClass = classNames({
        'b-primary br-selected': selected
    });

    return (
        <div>
            <Card className="tourAnnotate11 bgc-primary mt-3 b-grey br-corner">
                <div className={`${selectedDivClass} bgc-white pt-1 pb-2 px-3 tr-fast`}>
                    {/* Instance title and target type */}
                    <Row>
                        <Col>
                            <p className="tc-primary fw-lightBold">
                                {`${MakeJsonPathReadableString(annotationTarget?.jsonPath ?? '')} *`}
                            </p>
                        </Col>
                        <Col lg="auto">
                            <p className="tc-primary fw-lightBold">
                                {MakeReadableString(annotationTarget?.type ?? '')}
                            </p>
                        </Col>
                    </Row>
                    {/* Render content based upon parent class check or just the set JSON path button if there are not any and the target is a class with an array */}
                    {(!parentClasses.length && annotationTarget && (annotationTarget.type !== 'term' &&
                        (String(jp.parse(annotationTarget.jsonPath).slice(-1)[0].expression.value).includes('has') &&
                            String(jp.parse(annotationTarget.jsonPath).slice(-1)[0].expression.value).at(-1) === 's'
                        )
                    )) ?
                        <Row>
                            <Col>
                                <Button type="button"
                                    variant="primary"
                                    disabled={selected}
                                    className="fs-5 mt-3 py-1 px-3"
                                    OnClick={() => {
                                        const latestIndex: any = jp.query(superClass, annotationTarget.jsonPath)?.[0]?.length ?? 0;

                                        /* Reset annotation values */
                                        SetFieldValue?.('annotationValues', {});

                                        /* Set motivation */
                                        SetFieldValue?.('motivation', 'ods:adding');

                                        /* Set JSON path */
                                        SetFieldValue?.('jsonPath', `${annotationTarget.jsonPath}[${latestIndex}]`);
                                    }}
                                >
                                    {!selected ? `Add instance of ${MakeJsonPathReadableString(annotationTarget.jsonPath)}` : 'Currently selected'}
                                </Button>
                            </Col>
                        </Row>
                        : <Row>
                            <Col>
                                {parentClasses.length ?
                                    <>
                                        {parentClasses.map((parentClass, index) => {
                                            /* Key of parent class component */
                                            const key = `parentClass-${index}`;

                                            return (
                                                <ParentClassification key={key}
                                                    index={index}
                                                    parentClass={parentClass}
                                                    selected={selected}
                                                    parentClasses={parentClasses}
                                                    annotationTarget={annotationTarget}
                                                    formValues={formValues}
                                                    superClass={superClass}
                                                    SetFieldValue={SetFieldValue}
                                                    SetParentClasses={setParentClasses}
                                                />
                                            );
                                        })}
                                    </>
                                    : <Button type="button"
                                        variant="primary"
                                        disabled={selected}
                                        className="fs-5 mt-3 py-1 px-3"
                                        OnClick={() => {
                                            /* Reset annotation values */
                                            SetFieldValue?.('annotationValues', {});

                                            /* Set motivation */
                                            SetFieldValue?.('motivation', 'ods:adding');

                                            /* Set JSON path */
                                            SetFieldValue?.('jsonPath', annotationTarget?.jsonPath);
                                        }}
                                    >
                                        {!selected ? `Add instance of ${MakeJsonPathReadableString(annotationTarget?.jsonPath ?? '')}` : 'Currently selected'}
                                    </Button>
                                }
                            </Col>
                        </Row>
                    }
                </div>
            </Card>
        </div>
    );
};

export default NewInstance;
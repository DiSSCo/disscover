/* Import Dependencies */
import { Formik, Form } from 'formik';
import { isEmpty } from 'lodash';
import jp from 'jsonpath';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { ConstructAnnotationObject, ProcessAnnotationValues } from 'app/utilities/AnnotateUtilities';
import { MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Hooks */
import { useAppSelector, useAppDispatch, useNotification, useTrigger } from 'app/Hooks';

/* Import Store */
import { getAnnotationTarget, setAnnotationTarget } from 'redux-store/AnnotateSlice';
import { getAnnotationWizardSelectedIndex, setAnnotationWizardToggle } from 'redux-store/TourSlice';

/* Import Types */
import { AnnotationTarget, Dict, ProgressDot, SuperClass } from 'app/Types';

/* Import API */
import InsertAnnotation from 'api/annotation/InsertAnnotation';
import PatchAnnotation from 'api/annotation/PatchAnnotation';

/* Import Components */
import { AnnotationFormStep, AnnotationSelectInstanceStep, AnnotationSummaryStep, AnnotationTargetStep } from './AnnotationWizardComponents';
import { Button, ProgressDots, Tabs } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    schema: Dict,
    superClass: SuperClass,
    annotationCases: {
        name: string;
        type: string;
        jsonPath: string;
        icon: string;
    }[],
    StopAnnotationWizard: Function,
    SetLoading: Function,
    SetFilterSortValues: Function
};


/**
 * Component that renders the annotation wizard for adding annotations
 * @param schema The base schema to build upon
 * @param superClass The super class on which the annotation wizard should act
 * @param annotationCases Default annotation cases that can be selected as the annotation target
 * @param StopAnnotationWizard Function to stop and shut down the annotation wizard
 * @param SetLoading Function to set the loading state of the annotation side panel
 * @param SetFilterSortValues Function to set the filter and sort values in the annotations overview
 * @returns JSX Component
 */
const AnnotationWizard = (props: Props) => {
    const { schema, superClass, annotationCases, StopAnnotationWizard, SetLoading, SetFilterSortValues } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const notification = useNotification();
    const trigger = useTrigger();

    /* Base variables */
    const annotationTarget = useAppSelector(getAnnotationTarget);
    const tourAnnotationWizardSelectedIndex = useAppSelector(getAnnotationWizardSelectedIndex);
    const progressDots: ProgressDot[] = [];
    const [localAnnotationTarget, setLocalAnnotationTarget] = useState<AnnotationTarget | undefined>();
    const [initialFormValues, setInitialFormValues] = useState<{
        class: {
            label: string,
            value: string
        } | undefined,
        term: {
            label: string,
            value: string
        } | undefined,
        jsonPath: string | undefined,
        parentClassDropdownValues: {
            [parentClass: string]: number
        },
        motivation: 'ods:adding' | 'ods:deleting' | 'oa:assessing' | 'oa:editing' | 'oa:commenting' | undefined,
        annotationValues: {
            [className: string]: {
                [termName: string]: string
            } | { value: string }
        }
    } | undefined>(undefined);

    /* OnLoad: define initial form values and local annotation target JSON path */
    trigger.SetTrigger(() => {
        setInitialFormValues({
            class: undefined,
            term: undefined,
            jsonPath: annotationTarget?.jsonPath ?? undefined,
            parentClassDropdownValues: {},
            motivation: ((annotationTarget?.jsonPath && jp.value(superClass, annotationTarget?.jsonPath)) && 'oa:editing')
                ?? (annotationTarget?.jsonPath && 'ods:adding') ?? undefined,
            annotationValues: {}
        });
    }, []);

    trigger.SetTrigger(() => {
        if (localAnnotationTarget?.annotation) {
            /* When changing the annotation target when editing an annotation, disable the annotation wizard */
            StopAnnotationWizard();
        } else if (annotationTarget?.directPath) {
            GoToStep(2);
        }
    }, [annotationTarget]);

    /* Define wizard step components using tabs */
    const tabs: { [name: string]: JSX.Element } = {
        /* Do not render the target step if editing an annotation or if the annotation target is predefined */
        ...((!annotationTarget?.annotation) && {
            annotationTarget: <AnnotationTargetStep schema={schema}
                annotationCases={annotationCases}
            />
        }),
        /* Do not render the select instance step if editing an annotation or if the annotation target is predefined */
        ...((!annotationTarget?.annotation) && {
            annotationSelectInstance: <AnnotationSelectInstanceStep superClass={superClass}
                schemaTitle={schema.title}
            />
        }),
        annotationForm: <AnnotationFormStep superClass={superClass}
            schemaName={schema.title}
            localAnnotationTarget={localAnnotationTarget}
            SetLocalAnnotationTarget={setLocalAnnotationTarget}
        />,
        annotationSummary: <AnnotationSummaryStep superClass={superClass}
            schemaTitle={schema.title}
        />
    };
    const [tabStates, setTabStates] = useState<{
        checked: boolean,
        active: boolean
    }[]>(
        Object.keys(tabs).map((_key, index) => ({
            checked: !index,
            active: !index
        }))
    );
    const selectedIndex: number = tabStates.findIndex(tabState => tabState.active);
    const completedTill: number = tabStates.findLastIndex(tabState => tabState.checked);

    /* Onchange of tour annotation wizard selected index, update local state */
    trigger.SetTrigger(() => {
        if (typeof (tourAnnotationWizardSelectedIndex) !== 'undefined') {
            setTabStates([
                {
                    checked: true, active: tourAnnotationWizardSelectedIndex === 0
                },
                {
                    checked: tourAnnotationWizardSelectedIndex > 0, active: tourAnnotationWizardSelectedIndex === 1
                },
                {
                    checked: tourAnnotationWizardSelectedIndex > 1, active: tourAnnotationWizardSelectedIndex === 2,
                },
                {
                    checked: tourAnnotationWizardSelectedIndex > 2, active: tourAnnotationWizardSelectedIndex === 3,
                }
            ]);
        }
    }, [tourAnnotationWizardSelectedIndex]);

    /**
     * Function to go to the provided step in the wizard
     * @param stepIndex The step to move to in the wizard
     */
    const GoToStep = (stepIndex: number) => {
        /* Find current active index */
        const currentIndex: number = tabStates.findIndex(tabState => tabState.active);

        /* Set current index non active */
        tabStates[currentIndex].active = false;

        /* Set next index active */
        tabStates[stepIndex].active = true;

        /* Check if targetted step has been checked */
        if (!tabStates[stepIndex].checked) {
            tabStates[stepIndex].checked = true;
        }

        setTabStates([...tabStates]);
    };

    /* Construct progress dots */
    Object.keys(tabs).forEach((tab, index) => {
        progressDots.push({
            label: tab,
            OnClick: () => GoToStep(index)
        });
    });

    /**
     * Function to set the annotation target based on the user's selection (wizard step one)
     */
    const SetAnnotationTarget = (selectedOption: { label: string, value: string }, targetType: string, doNotContinue?: boolean) => {
        /* Check if class is the super class */
        let classType: 'class' | 'superClass' = 'class';

        if (targetType === 'class' && selectedOption.value === '$') {
            classType = 'superClass';
        }

        /* Set annotation target */
        dispatch(setAnnotationTarget({
            type: targetType === 'class' ? classType : 'term',
            jsonPath: selectedOption.value
        }));

        /* Go to next step in wizard */
        if (!doNotContinue) {
            GoToStep(tabStates.findIndex(tabState => tabState.active) + 1);
        }
    };

    /**
     * Function to check if the user should be allowed to move forwards in the annotation wizard
     */
    const CheckForwardCriteria = (stepIndex: number, formValues: Dict) => {
        let forwardAllowed: boolean = false;

        switch (stepIndex) {
            case 0:
                if (formValues.class || formValues.term || annotationTarget?.annotation || initialFormValues?.jsonPath) {
                    forwardAllowed = true;
                }

                break;
            case 1:
                if ((formValues.class || formValues.term) && formValues.jsonPath && !annotationTarget?.annotation) {
                    forwardAllowed = true;
                }

                break;
            case 2:
                if (!isEmpty(formValues.annotationValues) && formValues.jsonPath) {
                    forwardAllowed = true;
                }

                break;
        };

        return forwardAllowed;
    };

    return (
        <div className="h-100 d-flex flex-column">
            {/* Annotation wizard main body */}
            <Row className="flex-grow-1 overflow-hidden">
                <Col className="h-100">
                    {initialFormValues &&
                        <Formik initialValues={initialFormValues}
                            onSubmit={async (values) => {
                                await new Promise((resolve) => setTimeout(resolve, 100));

                                /* Extract and format annotation values from form values */
                                const annotationValues: (string | Dict)[] = [];

                                if (!('value' in values.annotationValues)) {
                                    annotationValues.push(JSON.stringify(ProcessAnnotationValues(values.jsonPath as string, values.annotationValues)));
                                } else {
                                    annotationValues.push(values.annotationValues.value);
                                }

                                /* Construct annotation object */
                                const newAnnotation = ConstructAnnotationObject({
                                    digitalObjectId: superClass['@id'],
                                    digitalObjectType: superClass['@type'],
                                    motivation: values.motivation ?? 'oa:commenting',
                                    annotationTargetType: values.annotationValues.value ? 'term' : 'class',
                                    jsonPath: values.jsonPath as string,
                                    annotationValues
                                });

                                /* Try to post the new annotation */
                                SetLoading(true);

                                /* If annotation object is not empty and thus the action succeeded, go back to overview and refresh, otherwise show error message */
                                try {
                                    /* If annotation record is present in annotation target, patch annotation, otherwise insert annotation */
                                    if (annotationTarget?.annotation) {
                                        await PatchAnnotation({
                                            annotationId: annotationTarget.annotation.id,
                                            updatedAnnotation: newAnnotation
                                        });
                                    } else {
                                        await InsertAnnotation({
                                            newAnnotation
                                        });
                                    }

                                    StopAnnotationWizard();

                                    /* Reset filter and sort values */
                                    SetFilterSortValues({
                                        motivation: '',
                                        sortBy: 'dateLatest'
                                    });
                                } catch {
                                    notification.Push({
                                        key: `${superClass['@id']}-${Math.random()}`,
                                        message: `Failed to ${annotationTarget?.annotation ? 'update' : 'add'} the annotation. Please try saving it again.`,
                                        template: 'error'
                                    });

                                    SetLoading(false);
                                };
                            }}
                        >
                            {({ values, setFieldValue, setValues }) => (
                                <Form className="h-100 d-flex flex-column overflow-none">
                                    {/* Previous and next step buttons */}
                                    <Row>
                                        <Col lg="auto">
                                            <Button type="button"
                                                variant="blank"
                                                className="px-0 py-0 tc-primary fw-lightBold"
                                                OnClick={() => {
                                                    StopAnnotationWizard();
                                                    dispatch(setAnnotationTarget(undefined));
                                                }}
                                            >
                                                <p>
                                                    Exit
                                                </p>
                                            </Button>
                                        </Col>
                                        {!!selectedIndex &&
                                            <Col lg>
                                                <Button type="button"
                                                    variant="blank"
                                                    className="px-0 py-0 tc-primary fw-lightBold"
                                                    OnClick={() => GoToStep(selectedIndex - 1)}
                                                >
                                                    {`< Previous step`}
                                                </Button>
                                            </Col>
                                        }
                                        {CheckForwardCriteria(selectedIndex, values) &&
                                            <Col lg
                                                className="d-flex justify-content-end"
                                            >
                                                <Button type="button"
                                                    variant="blank"
                                                    className="tourAnnotate12 tourAnnotate16 px-0 py-0 tc-primary fw-lightBold"
                                                    OnClick={() => GoToStep(selectedIndex + 1)}
                                                >
                                                    {`Next step >`}
                                                </Button>
                                            </Col>
                                        }
                                    </Row>

                                    {/* Wizard steps display */}
                                    <Row className="flex-grow-1 overflow-hidden">
                                        <Col className="h-100">
                                            <Tabs tabs={tabs}
                                                selectedIndex={selectedIndex}
                                                tabClassName='d-none'
                                                tabPanelClassName="flex-grow-1 overflow-hidden"
                                                tabProps={{
                                                    formValues: values,
                                                    SetFieldValue: setFieldValue,
                                                    SetFormValues: setValues,
                                                    SetAnnotationTarget,
                                                    GoToStep: GoToStep
                                                }}
                                                SetSelectedIndex={GoToStep}
                                            />
                                        </Col>
                                    </Row>


                                    {/* Progress dots adhering to the wizard */}
                                    <Row className="mt-3">
                                        <Col>
                                            <ProgressDots progressDots={progressDots}
                                                selectedIndex={selectedIndex}
                                                completedTill={completedTill}
                                                ValidationFunction={(index: number) => CheckForwardCriteria(index, values)}
                                            />
                                        </Col>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    }
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationWizard;
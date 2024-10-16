/* Import Dependencies */
import { Formik, Form } from 'formik';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { ConstructAnnotationObject, ProcessAnnotationValues } from 'app/utilities/AnnotateUtilities';

/* Import Hooks */
import { useAppDispatch, useNotification } from 'app/Hooks';

/* Import Store */
import { setAnnotationTarget } from 'redux-store/AnnotateSlice';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalMedia } from 'app/types/DigitalMedia';
import { Dict, ProgressDot } from 'app/Types';

/* Import API */
import InsertAnnotation from 'api/annotation/InsertAnnotation';

/* Import Components */
import { AnnotationFormStep, AnnotationSelectInstanceStep, AnnotationSummaryStep, AnnotationTargetStep } from './AnnotationWizardComponents';
import { Button, ProgressDots, Tabs } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    schema: Dict,
    superClass: DigitalSpecimen | DigitalMedia | Dict,
    StopAnnotationWizard: Function,
    SetLoading: Function,
    SetFilterSortValues: Function
};


/**
 * Component that renders the annotation wizard for adding annotations
 * @param schema The base schema to build upon
 * @param superClass The super class on which the annotation wizard should act
 * @param StopAnnotationWizard Function to stop and shut down the annotation wizard
 * @param SetLoading Function to set the loading state of the annotation side panel
 * @param SetFilterSortValues Function to set the filter and sort values in the annotations overview
 * @returns JSX Component
 */
const AnnotationWizard = (props: Props) => {
    const { schema, superClass, StopAnnotationWizard, SetLoading, SetFilterSortValues } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const notification = useNotification();

    /* Define wizard step components using tabs */
    const tabs: { [name: string]: JSX.Element } = {
        annotationTarget: <AnnotationTargetStep schema={schema} />,
        annotationSelectInstance: <AnnotationSelectInstanceStep superClass={superClass}
            schemaTitle={schema.title}
        />,
        annotationForm: <AnnotationFormStep superClass={superClass} />,
        annotationSummary: <AnnotationSummaryStep superClass={superClass} />
    };

    /* Base variables */
    const [tabStates, setTabStates] = useState<{
        checked: boolean,
        active: boolean
    }[]>(
        Object.keys(tabs).map((_key, index) => ({
            checked: !index,
            active: !index
        }))
    );
    const progressDots: ProgressDot[] = [];
    const selectedIndex: number = tabStates.findIndex(tabState => tabState.active);
    const completedTill: number = tabStates.findLastIndex(tabState => tabState.checked);
    const initialFormValues: {
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
    } = {
        class: undefined,
        term: undefined,
        jsonPath: undefined,
        parentClassDropdownValues: {},
        motivation: undefined,
        annotationValues: {}
    };

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
    const SetAnnotationTarget = (selectedOption: { label: string, value: string }, targetType: string) => {
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
        GoToStep(tabStates.findIndex(tabState => tabState.active) + 1);
    };

    /**
     * Function to check if the user should be allowed to move forwards in the annotation wizard
     */
    const CheckForwardCriteria = (stepIndex: number, formValues: Dict) => {
        let forwardAllowed: boolean = false;

        switch (stepIndex) {
            case 0:
                if (formValues.class || formValues.term) {
                    forwardAllowed = true;
                }

                break;
            case 1:
                if ((formValues.class || formValues.term) && formValues.jsonPath) {
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
                                await InsertAnnotation({
                                    newAnnotation
                                });

                                StopAnnotationWizard();

                                /* Reset filter and sort values */
                                SetFilterSortValues({
                                    motivation: '',
                                    sortBy: 'dateLatest'
                                });
                            } catch {
                                notification.Push({
                                    key: `${superClass['@id']}-${Math.random()}`,
                                    message: `Failed to add the annotation. Please try saving it again.`,
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
                                            OnClick={() => StopAnnotationWizard()}
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
                                                className="px-0 py-0 tc-primary fw-lightBold"
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
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationWizard;
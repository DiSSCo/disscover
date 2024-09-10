/* Import Dependencies */
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict, ProgressDot } from 'app/Types';

/* Import Components */
import { AnnotationTargetStep, AnnotationFormStep, AnnotationInstanceSelectStep } from './AnnotationWizardComponents';
import { ProgressDots, Tabs } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    schema: Dict
};


/**
 * Component that renders the annotation wizard for adding annotations
 * @returns JSX Component
 */
const AnnotationWizard = (props: Props) => {
    const { schema } = props;

    /* Base variables */
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

    /**
     * Function to go the next step in the wizard
     */
    const NextStep = () => {
        setSelectedTabIndex(selectedTabIndex + 1);
    };

    /* Define wizard step components using tabs */
    const tabs: { [name: string]: JSX.Element } = {
        annotationTarget: <AnnotationTargetStep schema={schema}
            NextStep={NextStep}
        />,
        annotationSelectInstance: <AnnotationInstanceSelectStep />,
        annotationForm: <AnnotationFormStep />
    };
    const progressDots: ProgressDot[] = [];

    /* Construct progress dots */
    Object.keys(tabs).forEach((tab, index) => {
        progressDots.push({
            label: tab,
            // state: index < selectedTabIndex ? 'checked' : index === selectedTabIndex ? 'current' : 'open',
            OnClick: () => index < selectedTabIndex && setSelectedTabIndex(index)
        });
    });

    return (
        <div className="h-100 d-flex flex-column">
            <Row className="flex-grow-1">
                <Col>
                    <Tabs tabs={tabs}
                        selectedIndex={selectedTabIndex}
                        tabClassName='d-none'
                        SetSelectedIndex={setSelectedTabIndex}
                    />
                </Col>
            </Row>
            {/* Wizard steps display */}
            <Row>
                <Col>
                    <ProgressDots progressDots={progressDots}
                        selectedIndex={selectedTabIndex}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationWizard;
/* Import Dependencies */
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { ProgressDot } from 'app/Types';

/* Import Components */
import { AnnotationCasesStep, AnnotationFormStep, AnnotationInstanceSelectStep } from './AnnotationWizardComponents';
import { ProgressDots, Tabs } from 'components/elements/customUI/CustomUI';


/**
 * Component that renders the annotation wizard for adding annotations
 * @returns JSX Component
 */
const AnnotationWizard = () => {
    /* Base variables */
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const tabs: { [name: string]: JSX.Element } = {
        annotationCases: <AnnotationCasesStep />,
        annotationSelectInstance: <AnnotationInstanceSelectStep />,
        annotationForm: <AnnotationFormStep />
    };
    const progressDots: ProgressDot[] = [];
    // let stepTitle: string = '';

    /* Determine step title */
    // switch (selectedTabIndex) {
    //     case 0:
    //         stepTitle = 'What do you want to annotate?';

    //         break;
    //     case 1:
    //         stepTitle = 'Annotating an new or existing instance?';

    //         break;
    //     case 2:
    //         stepTitle = 'Please enter the values of your annotation'
    // };

    /* Construct progress dots */
    Object.keys(tabs).forEach((tab, index) => {
        progressDots.push({
            label: tab,
            state: index < selectedTabIndex ? 'checked' : index === selectedTabIndex ? 'current' : 'open',
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
                    <ProgressDots progressDots={progressDots} />
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationWizard;
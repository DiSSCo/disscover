/* Import components */
import { Button } from '@radix-ui/themes';

/* Import styling */
import './MultiStepForm.scss';

/* Import dependencies */
import { useState } from 'react';

/* Import components */
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

interface Props {
    steps: { stepNumber: number, title?: string }[];
    views: JSX.Element[];
    handleCancel: { title: string, action: () => void };
    handleSubmit: { title: string, action: () => void };
}

/**
 * Page for Create Virtual Collection
 * @param steps array with objects containing stepNumber and optional title to render steps for the form
 * @param views array of JSX elements to render. Rendered via showAppropriateView function based on currentStep
 * @param handleCancel object with title and action for the cancel button
 * @param handleSubmit object with title and action for the submit button
 * @returns A JSX element that contains the Create Virtual Collection page with the multistep form
 */
const CreateVirtualCollection = ({ steps, views, handleCancel, handleSubmit }: Props) => {
    /* Base variables */
    const [currentStep, setCurrentStep] = useState(1);

    /* Form navigation */
    const handleNextStep = () => {
        if(currentStep < steps.length) setCurrentStep(currentStep + 1);
    }
    const handlePreviousStep = () => {
        if(currentStep > 1) setCurrentStep(currentStep - 1);
    }

    /* Return correct view based on currentStep */
    const showAppropriateView = () => {
        return views[currentStep - 1];
    }

    return (
        <form id="multi-step-form">
            <div id="multi-step-form-header">
                {steps.map(({stepNumber, title}) => {
                    return (
                        <div key={`step-` + stepNumber + `-` + title} className="form-step-container">
                            <span className={`form-step-indicator ${currentStep === stepNumber ? 'active-form-step' : ''}`}></span>
                            <span className="form-step-title">{stepNumber}. {title}</span>
                        </div>
                    )
                })
                }
            </div>
            <div id="multi-step-form-content">
                {showAppropriateView()}
            </div>
            <div id="multi-step-form-navigation">
                {currentStep === 1 &&
                    <Button variant="soft" onClick={() => handleCancel.action()}>
                        {handleCancel.title}
                    </Button>
                }
                {currentStep > 1 && 
                    <Button variant="soft" onClick={() => handlePreviousStep()}>
                        <ArrowLeftIcon />
                        Back
                    </Button>
                }
                {currentStep < steps.length && 
                    <Button onClick={() => handleNextStep()}>
                        Next
                        <ArrowRightIcon />
                    </Button>
                }
                {currentStep === steps.length &&
                    <Button onClick={() => handleSubmit.action()}>
                        {handleSubmit.title}
                        <ArrowRightIcon />
                    </Button>
                }
            </div>
        </form>
    )
}

export default CreateVirtualCollection;
/* Import components */
import { Button } from '@radix-ui/themes';

/* Import styling */
import './MultiStepForm.scss';

/* Import dependencies */
import React, { useRef, useState } from 'react';

/* Import components */
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

interface Props {
    steps: { title?: string, render: (goToStep: (stepIndex: number) => void) => JSX.Element }[];
    handleCancel: { title: string, action: () => void };
    handleSubmit: { title: string, action: () => void };
}

/**
 * Page for Create Virtual Collection
 * @param steps array with objects containing optional title and views to render steps for the form
 * @param handleCancel object with title and action for the cancel button
 * @param handleSubmit object with title and action for the submit button
 * @returns A JSX element that contains the Create Virtual Collection page with the multistep form
 */
const MultiStepForm = ({ steps, handleCancel, handleSubmit }: Props) => {
    /* Base variables */
    const [currentStep, setCurrentStep] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);
    const [wasValidated, setWasValidated] = useState(false);
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    /* Form navigation */
    const handleNextStep = () => {
        if (formRef.current) {
            if (formRef.current.checkValidity()) {
                setWasValidated(false); // Reset for next step
                setCurrentStep(currentStep + 1);
            } else {
                setWasValidated(true); // This will trigger the red borders
                formRef.current.reportValidity();
            }
        }
    }
    const handlePreviousStep = () => {
        if (!isFirstStep) setCurrentStep((previousStep) => previousStep - 1);
    }

    /* On form submit, to prevent reloading of page and to execute action */
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit.action();
    }

    /* Prevent native required popup to appear on vaidating the form */
    const handleInvalid = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form
            id="multi-step-form"
            onSubmit={onSubmit}
            className={wasValidated ? 'was-validated' : ''} 
            ref={formRef}
            onInvalidCapture={handleInvalid}
            >
            <div id="multi-step-form-header">
                {steps.map(({title}, index) => {
                    return (
                        <div key={`step-` + title} className="form-step-container">
                            <span className={`form-step-indicator ${currentStep === index || currentStep > index ? 'active-form-step' : ''}`}></span>
                            <span className="form-step-title">{index + 1}. {title}</span>
                        </div>
                    )
                })
                }
            </div>
            <div id="multi-step-form-content" aria-live="polite">
                {steps[currentStep]?.render((stepIndex) => setCurrentStep(stepIndex))}
            </div>
            <div id="multi-step-form-navigation">
                {isFirstStep &&
                    <Button type="button" variant="soft" onClick={() => handleCancel.action()}>
                        {handleCancel.title}
                    </Button>
                }
                {!isFirstStep && 
                    <Button type="button" variant="soft" onClick={() => handlePreviousStep()}>
                        <ArrowLeftIcon />
                        Back
                    </Button>
                }
                {!isLastStep && 
                    <Button type="button" onClick={() => handleNextStep()}>
                        Next
                        <ArrowRightIcon />
                    </Button>
                }
                {isLastStep &&
                    <Button type="submit">
                        {handleSubmit.title}
                        <ArrowRightIcon />
                    </Button>
                }
            </div>
        </form>
    )
}

export default MultiStepForm;
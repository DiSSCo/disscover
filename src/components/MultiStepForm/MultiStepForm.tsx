/* Import components */
import { Button } from '@radix-ui/themes';

/* Import styling */
import './MultiStepForm.scss';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

/* Import dependencies */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    steps: { stepNumber: number, title?: string }[];
}

const CreateVirtualCollection = ({ steps }: Props) => {
    /* Base variables */
    const [currentStep, setCurrentStep] = useState(1);

    /* Hooks */
    const navigate = useNavigate();

    const handleNextStep = () => {
        console.log('Next step');
        if(currentStep < steps.length) setCurrentStep(currentStep + 1);
    }

    const handlePreviousStep = () => {
        console.log('Previous step');
        if(currentStep > 1) setCurrentStep(currentStep - 1);
    }

    return (
        <div id="multi-step-form">
            <div id="multi-step-form-header">
                {steps.map(({stepNumber, title}) => {
                    return (
                        <div key={`step-` + stepNumber + `-` + title} className="form-step-container">
                            <span className={`form-step-indicator ${currentStep === stepNumber ? 'active-form-step' : ''}`}></span>
                            <span>{stepNumber}. {title}</span>
                        </div>
                    )
                })
                }
            </div>
            <div id="multi-step-form-navigation">
                {currentStep === 1 &&
                    <Button variant="soft" onClick={() => navigate('/virtual-collections')}>
                        Cancel
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
                    <Button>
                        Create collection
                        <ArrowRightIcon />
                    </Button>
                }
            </div>
        </div>
    )
}

export default CreateVirtualCollection;
/* Import dependencies */
import { RetrieveEnvVariable } from 'app/Utilities';
import { useState } from 'react';

/* Import components */
import { Hero } from 'components/Hero/Hero';
import MultiStepForm from 'components/MultiStepForm/MultiStepForm';
import AboutView from 'components/MultiStepForm/views/AboutView';
import ConfirmView from 'components/MultiStepForm/views/ConfirmView';
import SpecimenView from 'components/MultiStepForm/views/SpecimensView';

/* Import hooks */
import { useNavigate } from 'react-router-dom';
import { useCreateVirtualCollection } from 'hooks/useVirtualCollections';

/* Interface VirtualCollectionData */
interface VirtualCollectionData {
    title: string,
    description: string,
    type: string,
    specimens: string[],
    specimenRawList: string
}

/**
 * Base page for the Create Virtual Collection flow
 * @returns A JSX element for the Create Virtual Collection page
 */
const CreateVirtualCollection = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const [collectionData, setCollectionData] = useState<VirtualCollectionData>({
        title: '',
        description: '',
        type: 'Reference Collection',
        specimens: [],
        specimenRawList: ''
    });

    const updateCollectionData = (fields: Partial<VirtualCollectionData>) => {
        setCollectionData((prevData) => ({
            ...prevData,
            ...fields
        }));
    }

    const { mutate } = useCreateVirtualCollection();

    const handleFormSubmit = () => {
        const requestBody = {
            data: {
                type: "ods:VirtualCollection",
                attributes: {
                    "ltc:collectionName": collectionData.title,
                    "ltc:description": collectionData.description,
                    "ltc:basisOfScheme": collectionData.type,
                    "ods:hasTargetDigitalObjectFilter": {
                        "ods:predicateType": "equals",
                        "ods:predicateKey": "$['dcterms:identifier']",
                        "ods:predicateValues": collectionData.specimens
                    }
                }
            }
        }
        mutate(requestBody, {
            onSuccess: (response) => {
                navigate(`/virtual-collections/${response.id.replace(RetrieveEnvVariable('HANDLE_URL'), '')}`);
            },
            onError: (error) => {
                console.error("Failed to create collection:", error);
            }
        });
    }

    /* Form steps */
    const formSteps = [
        { 
            title: "About", 
            render: (_goToStep: (stepIndex: number) => void, wasValidated?: boolean) => (
                <AboutView 
                    data={collectionData} 
                    onUpdate={updateCollectionData} 
                    wasValidated={!!wasValidated} 
                />
            ) 
        },
        {
            title: "Specimens", 
            render: (_goToStep: (stepIndex: number) => void, wasValidated?: boolean) => (
                <SpecimenView 
                    data={collectionData} 
                    onUpdate={updateCollectionData} 
                    wasValidated={!!wasValidated} 
                />
            ) 
        },
        { 
            title: "Confirm", 
            render: (goToStep: (stepIndex: number) => void, _wasValidated?: boolean) => (
                <ConfirmView 
                    onEditAbout={() => goToStep(0)}
                    onEditSpecimens={() => goToStep(1)}
                    data={collectionData}
                />
            ) 
        }
    ];

    return (
        <>
            <Hero
                title="Create Virtual Collection"
                navigateTo={{pathName: '/virtual-collections', text: 'Virtual Collections'}}
            >
            </Hero>
            <main>
                <MultiStepForm
                    steps={formSteps}
                    handleCancel={{ title: 'Cancel', action: () => navigate('/virtual-collections') }}
                    handleSubmit={{ title: 'Create collection', action: handleFormSubmit }}
                ></MultiStepForm>
            </main>
        </>

    )
}

export default CreateVirtualCollection;
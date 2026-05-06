/* Import components */
import { Hero } from 'components/Hero/Hero';
import MultiStepForm from 'components/MultiStepForm/MultiStepForm';
import AboutView from 'components/MultiStepForm/views/AboutView';
import ConfirmView from 'components/MultiStepForm/views/ConfirmView';
import SpecimenView from 'components/MultiStepForm/views/SpecimensView';
import { useNavigate } from 'react-router-dom';

/**
 * Base page for the Create Virtual Collection flow
 * @returns A JSX element for the Create Virtual Collection page
 */
const CreateVirtualCollection = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Form views */
    const virtualCollectionViews = [
        <AboutView key="about-view"></AboutView>,
        <SpecimenView key="specimens-view"></SpecimenView>,
        <ConfirmView key="confirm-view"></ConfirmView>
    ]

    /* Form steps */
    const formSteps = [{ stepNumber: 1, title: 'About' }, { stepNumber: 2, title: 'Specimens' }, { stepNumber: 3, title: 'Confirm' }];

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
                    views={virtualCollectionViews}
                    handleCancel={{ title: 'Cancel', action: () => navigate('/virtual-collections') }}
                    handleSubmit={{ title: 'Create collection', action: () => navigate('/virtual-collections') }}
                ></MultiStepForm>
            </main>
        </>

    )
}

export default CreateVirtualCollection;
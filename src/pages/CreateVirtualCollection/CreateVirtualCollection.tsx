/* Import components */
import { Hero } from 'components/Hero/Hero';
import MultiStepForm from 'components/MultiStepForm/MultiStepForm';
import AboutView from 'components/MultiStepForm/views/AboutView';
import ConfirmView from 'components/MultiStepForm/views/ConfirmView';
import SpecimenView from 'components/MultiStepForm/views/SpecimensView';

/* Import hooks */
import { useNavigate } from 'react-router-dom';

/**
 * Base page for the Create Virtual Collection flow
 * @returns A JSX element for the Create Virtual Collection page
 */
const CreateVirtualCollection = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Form steps */
    const formSteps = [
        { title: 'About', view: <AboutView></AboutView>},
        { title: 'Specimens', view: <SpecimenView></SpecimenView> },
        { title: 'Confirm', view: <ConfirmView></ConfirmView> }
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
                    handleSubmit={{ title: 'Create collection', action: () => navigate('/virtual-collections') }}
                ></MultiStepForm>
            </main>
        </>

    )
}

export default CreateVirtualCollection;
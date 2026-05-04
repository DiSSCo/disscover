/* Import components */
import { Hero } from 'components/Hero/Hero';
import MultiStepForm from 'components/MultiStepForm/MultiStepForm';

const CreateVirtualCollection = () => {
    return (
        <>
            <Hero
                title="Create Virtual Collection"
                navigateTo={{pathName: '/virtual-collections', text: 'Virtual Collections'}}
            >
            </Hero>
            <main>
                <MultiStepForm
                    steps={[{ stepNumber: 1, title: 'About' }, { stepNumber: 2, title: 'Specimens' }, { stepNumber: 3, title: 'Confirm' }]}
                ></MultiStepForm>
            </main>
        </>

    )
}

export default CreateVirtualCollection;
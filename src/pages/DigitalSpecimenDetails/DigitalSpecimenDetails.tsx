import { Hero } from 'components/Hero/Hero';

const DigitalSpecimenDetails = () => {
    
    return (
        <Hero
            title="Digital Specimen details"
            description="Synonym of something something 1964"
            navigateTo={{ pathName:"/search", text: "Specimens"}}
            share={true}
        >
        </Hero>
    );
};

export default DigitalSpecimenDetails;
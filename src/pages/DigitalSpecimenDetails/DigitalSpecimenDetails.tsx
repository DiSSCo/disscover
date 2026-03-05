import { Hero } from 'components/Hero/Hero';
import { useDigitalSpecimenComplete } from 'hooks/useDigitalSpecimen';

const DigitalSpecimenDetails = () => {
    // TODO:
    // [X] Find identifier of digital specimen
    // [ ] Retrieve digital specimen information
    // [ ] Populate hero with info
    // [ ] Populate Cards with info

    /* Base variables */
    const url = new URL(window.location.href);
    const segments = url.pathname.split('/');
    const identifier = segments.slice(2).join("/");
    const { data } = useDigitalSpecimenComplete({ handle: identifier});
    console.log(data);

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
import { Hero } from 'components/Hero/Hero';
import { useDigitalSpecimenComplete } from 'hooks/useDigitalSpecimen';

const DigitalSpecimenDetails = () => {
    // TODO:
    // [X] Find identifier of digital specimen
    // [X] Retrieve digital specimen information
    // [ ] Populate hero with info
    // [ ] Populate Cards with info

    /* Base variables */
    const url = new URL(window.location.href);
    const segments = url.pathname.split('/');
    const identifier = segments.slice(2).join("/");
    const { digitalSpecimen } = useDigitalSpecimenComplete({ handle: identifier});
    console.log(digitalSpecimen);

    return (
        <Hero
            title={digitalSpecimen['ods:hasIdentifications'][0]['ods:hasTaxonIdentifications'][0]['ods:scientificNameHTMLLabel']}
            description="Synonym of something something 1964"
            navigateTo={{ pathName:"/search", text: "Specimens"}}
            share={true}
        >
        </Hero>
    );
};

export default DigitalSpecimenDetails;
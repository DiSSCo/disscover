/* Import components */
import { DigitalSpecimenCard } from 'components/DigitalSpecimenCard/DigitalSpecimenCard';
import { Hero } from 'components/Hero/Hero';

/* Import hooks */
import { useDigitalSpecimenComplete } from 'hooks/useDigitalSpecimen';

/* Import styling */
import './DigitalSpecimenDetails.scss';

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
    const { digitalSpecimen, isLoading, isError } = useDigitalSpecimenComplete({ handle: identifier});
    console.log(digitalSpecimen);

    if (isLoading) return <main><p>Retrieving the Virtual Collection Details...</p></main>;
    if (isError) return <main><p>Something went wrong with fetching the Virtual Collection Details. Please try again later.</p></main>;

    return (
        <>
            <Hero
                title={digitalSpecimen['ods:hasIdentifications'][0]['ods:hasTaxonIdentifications'][0]['ods:scientificNameHTMLLabel']}
                description="Synonym of something something 1964"
                navigateTo={{ pathName:"/search", text: "Specimens"}}
                share={true}
            >
            </Hero>
            <main className="digital-specimen-container">
                <div id="ds-media-column">
                    <DigitalSpecimenCard cardHeader="Image" />
                </div>
                <div id="ds-content-column">
                    <DigitalSpecimenCard cardHeader="Specimen record" />
                    <DigitalSpecimenCard cardHeader="Identification" annotate={true} />
                    <DigitalSpecimenCard cardHeader="Location" annotate={true}/>
                    <DigitalSpecimenCard cardHeader="Collecting event" />
                    <DigitalSpecimenCard cardHeader="Citation and license" copy={true}/>
                    {/* ... other 57 variables */}
                </div>
            </main>
        </>
    );
};

export default DigitalSpecimenDetails;
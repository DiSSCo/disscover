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
    const { data: specimen, isLoading, isError } = useDigitalSpecimenComplete({ handle: identifier});

    if (isLoading) return <main><p>Retrieving the Virtual Collection Details...</p></main>;
    if (!specimen) return <main><p>No data found</p></main>
    if (isError) return <main><p>Something went wrong with fetching the Virtual Collection Details. Please try again later.</p></main>;
    console.log(specimen);
    return (
        <>
            <Hero
                title={specimen?.IDENTIFICATION?.scientificName.value}
                description="Synonym of something something 1964"
                navigateTo={{ pathName:"/search", text: "Specimens"}}
                share={true}
            >
            </Hero>
            <main className="digital-specimen-container">
                <div id="ds-media-column">
                    {/* <DigitalSpecimenCard cardHeader="Image" /> */}
                </div>
                <div id="ds-content-column">
                    <DigitalSpecimenCard cardHeader="Specimen record" fragment={specimen.SPECIMEN_RECORD}/>
                    <DigitalSpecimenCard cardHeader="Identification" annotate={true} fragment={specimen.IDENTIFICATION}/>
                    <DigitalSpecimenCard cardHeader="Location" annotate={true} fragment={specimen.LOCATION}/>
                    <DigitalSpecimenCard cardHeader="Collecting event" fragment={specimen.COLLECTING_EVENT}/>
                    <DigitalSpecimenCard cardHeader="Citation and license" copy={true} fragment={specimen.CITATION_LICENSE}/>
                </div>
            </main>
        </>
    );
};

export default DigitalSpecimenDetails;
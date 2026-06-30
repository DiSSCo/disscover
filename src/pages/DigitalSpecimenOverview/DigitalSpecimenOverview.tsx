/* Import components */
import { Hero } from 'components/Hero/Hero';
import { SpecimenRecordCard } from 'components/Cards/SpecimenRecordCard';
import { IdentificationCard } from 'components/Cards/IdentificationCard';
import { GeoreferenceCard } from 'components/Cards/GeoreferenceCard';
import { CollectingEventCard } from 'components/Cards/CollectingEventCard';
import { CitationLicenseCard } from 'components/Cards/CitationLicenseCard';

/* Import hooks */
import { useDigitalSpecimenComplete } from 'hooks/useDigitalSpecimen';

/* Import styling */
import './DigitalSpecimenOverview.scss';

const DigitalSpecimenOverview = () => {
    /* Base variables */
    const url = new URL(globalThis.location.href);
    const segments = url.pathname.split('/');
    const identifier = segments.slice(2).join("/");
    const { data: specimen, isLoading, isError } = useDigitalSpecimenComplete({ doi: identifier});

    if (isLoading) return <main><p>Retrieving the Digital Specimen Details...</p></main>;
    if (!specimen) return <main><p>No data found</p></main>
    if (isError) return <main><p>Something went wrong with fetching the Digital Specimen. Please try again later.</p></main>;

    return (
        <>
            <Hero
                title={specimen?.IDENTIFICATION?.scientificName.value}
                navigateTo={{ pathName:"/search", text: "Specimens"}}
                showShareButton={true}
                isHtml={specimen?.IDENTIFICATION?.scientificName?.value?.isHtml}
                badge={[{ content: specimen?.UI_COMPONENTS_DATA?.taxonRank.value.toLowerCase(), type: 'solid', color: 'grass'}, { content: specimen?.UI_COMPONENTS_DATA?.typeStatus.value, type: 'solid', color: 'sky'}]}
                annotate={true}
            >
            </Hero>
            <main className="digital-specimen-container">
                <div id="ds-left-column">
                    <SpecimenRecordCard fragment={specimen.SPECIMEN_RECORD}></SpecimenRecordCard>
                    <IdentificationCard fragment={specimen.IDENTIFICATION}></IdentificationCard>
                </div>
                <div id="ds-right-column">
                    <GeoreferenceCard fragment={specimen.LOCATION}></GeoreferenceCard>
                    <CollectingEventCard fragment={specimen.COLLECTING_EVENT}></CollectingEventCard>
                    <CitationLicenseCard fragment={specimen.CITATION_LICENSE}></CitationLicenseCard>
                </div>
            </main>
        </>
    );
};

export default DigitalSpecimenOverview;
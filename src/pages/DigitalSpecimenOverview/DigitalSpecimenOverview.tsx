/* Import components */
import { DigitalSpecimenCard } from 'components/Cards/DigitalSpecimenCard/DigitalSpecimenCard';
import { Hero } from 'components/Hero/Hero';

/* Import hooks */
import { useDigitalSpecimenComplete } from 'hooks/useDigitalSpecimen';

/* Import types and enums */
import { CardCategory, CARDS_LEFT_COLUMN, CARDS_RIGHT_COLUMN, CARD_CONFIGS } from './types';

/* Import styling */
import './DigitalSpecimenOverview.scss';

const DigitalSpecimenDetails = () => {
    /* Base variables */
    const url = new URL(globalThis.location.href);
    const segments = url.pathname.split('/');
    const identifier = segments.slice(2).join("/");
    const { data: specimen, isLoading, isError } = useDigitalSpecimenComplete({ doi: identifier});

    if (isLoading) return <main><p>Retrieving the Digital Specimen Details...</p></main>;
    if (!specimen) return <main><p>No data found</p></main>
    if (isError) return <main><p>Something went wrong with fetching the Digital Specimen. Please try again later.</p></main>;

    /* Get the correct card category data */
    const getCardFragment = (category: CardCategory) => {
        return specimen?.mappedData?.find((cat: any) => cat.name === category)?.data || [];
    };

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
                    {CARDS_LEFT_COLUMN.map((category) => {
                        return (
                            <DigitalSpecimenCard
                                key={category}
                                cardHeader={category}
                                fragment={getCardFragment(category)}
                                { ...CARD_CONFIGS[category]}
                            />
                        )
                    })}
                </div>
                <div id="ds-right-column">
                    {CARDS_RIGHT_COLUMN.map((category) => (
                            <DigitalSpecimenCard 
                                key={category}
                                cardHeader={category} 
                                fragment={getCardFragment(category)} 
                                {...CARD_CONFIGS[category]}
                            />
                        ))}
                </div>
            </main>
        </>
    );
};

export default DigitalSpecimenDetails;
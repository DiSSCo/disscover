/* Import components */
import { DigitalSpecimenCard } from 'components/Cards/DigitalSpecimenCard/DigitalSpecimenCard';
import { Hero } from 'components/Hero/Hero';

/* Import hooks */
import { useDigitalSpecimenComplete } from 'hooks/useDigitalSpecimen';

/* Import types and enums */
import { CardCategory, CARD_CONFIGS, LEFT_COLUMN_CATEGORIES } from 'types/DigitalSpecimenTypes';

/* Import styling */
import './DigitalSpecimenOverview.scss';
import { MappedCategories } from 'types/DataMapperTypes';

const DigitalSpecimenDetails = () => {
    /* Base variables */
    const url = new URL(globalThis.location.href);
    const segments = url.pathname.split('/');
    const identifier = segments.slice(2).join("/");
    const { data: specimen, isLoading, isError } = useDigitalSpecimenComplete({ doi: identifier});

    if (isLoading) return <main><p>Retrieving the Digital Specimen Details...</p></main>;
    if (!specimen) return <main><p>No data found</p></main>
    if (isError) return <main><p>Something went wrong with fetching the Digital Specimen. Please try again later.</p></main>;

    const actualData = specimen?.mappedData || [];
    
    const leftColumnCards = actualData.filter((category: MappedCategories) => LEFT_COLUMN_CATEGORIES.has(category.name));
    const rightColumnCards = actualData.filter((category: MappedCategories) => !LEFT_COLUMN_CATEGORIES.has(category.name));

    // Helper to get raw data array by Category Enum
    const getCardFragment = (category: CardCategory) => {
        return specimen?.mappedData?.find((cat: any) => cat.name === category)?.data || [];
    };

    // Helper to get a field value
    const getFieldValue = (category: CardCategory, label: string) => {
        return getCardFragment(category).find((field: any) => field.label === label)?.value;
    };

    return (
        <>
            <Hero
                title={getFieldValue(CardCategory.Identification, 'Scientific Name')}
                navigateTo={{ pathName:"/search", text: "Specimens"}}
                showShareButton={true}
                isHtml={specimen?.IDENTIFICATION?.scientificName?.value?.isHtml}
                badge={[{
                    content: getFieldValue(CardCategory.Identification, 'Rank')?.toLowerCase(),
                    type: 'solid',
                    color: 'grass'
                }]}
                annotate={true}
            >
            </Hero>
            <main className="digital-specimen-container">
                <div id="ds-left-column">
                    {leftColumnCards.map((category: MappedCategories) => (
                        <DigitalSpecimenCard 
                            key={category.name}
                            cardHeader={category.name} 
                            fragment={category.data}
                            {...CARD_CONFIGS[category.name as CardCategory]} 
                        />
                    ))}
                </div>
                <div id="ds-right-column">
                    {rightColumnCards.map((category: MappedCategories) => (
                        <DigitalSpecimenCard 
                            key={category.name}
                            cardHeader={category.name} 
                            fragment={category.data} 
                            {...CARD_CONFIGS[category.name as CardCategory]} 
                        />
                    ))}
                </div>
            </main>
        </>
    );
};

export default DigitalSpecimenDetails;
/* Import dependencies */
import { useState } from 'react';

/* Import components */
import { DigitalSpecimenCard } from 'components/Cards/DigitalSpecimenCard/DigitalSpecimenCard';
import { Hero } from 'components/Hero/Hero';
import { ImageCard } from 'components/Cards/DigitalMediaCard/DigitalMediaCard';
import { AnnotationSidePanel } from 'components/elements/Elements';

/* Import hooks */
import { useDigitalSpecimenComplete } from 'hooks/useDigitalSpecimen';

/* Import types and enums */
import { CardCategory, CARD_CONFIGS, LEFT_COLUMN_CATEGORIES, AnnotationTargetPayload } from 'types/digitalSpecimenTypes';
import { CategoryConfig, MappedCategories, UIProperty } from 'types/dataMapperTypes';

/* Import styling */
import './DigitalSpecimenOverview.scss';

/* Import API */
import GetDigitalSpecimenComplete from 'api/digitalSpecimen/GetDigitalSpecimenComplete';
import GetDigitalSpecimenMas from 'api/digitalSpecimen/GetDigitalSpecimenMas';
import GetDigitalSpecimenMasJobRecords from 'api/digitalSpecimen/GetDigitalSpecimenMasJobRecords';
import ScheduleDigitalSpecimenMas from 'api/digitalSpecimen/ScheduleDigitalSpecimenMas';

/* Import schemas */
import DigitalSpecimenSchema from 'sources/dataModel/digitalSpecimen.json';
import DigitalSpecimenAnnotationCases from 'sources/annotationCases/DigitalSpecimenAnnotationCases.json';

/* Import hooks */
import { useAppDispatch } from 'app/Hooks';

/* Import store */
import { setAnnotationTarget } from 'redux-store/AnnotateSlice';

const DigitalSpecimenDetails = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const url = new URL(globalThis.location.href);
    const segments = url.pathname.split('/');
    const identifier = segments.slice(2).join("/");
    const { data: specimen, isLoading, isError } = useDigitalSpecimenComplete({ doi: identifier});
    const [annotationMode, setAnnotationMode] = useState(false);
    const hasImages = specimen?.digitalMedia?.length > 0;

    if (isLoading) return <main><p>Retrieving the Digital Specimen Details...</p></main>;
    if (!specimen) return <main><p>No data found</p></main>
    if (isError) return <main><p>Something went wrong with fetching the Digital Specimen. Please try again later.</p></main>;

    /* Human readable data mapped from the JSON data to use in UI*/
    const actualData = specimen?.mappedData || [];

    /* Set the columns based on whether an image can be found */
    let leftColumnCards = [];
    let rightColumnCards = [];
    
    if (hasImages) {
        leftColumnCards = []; 
        rightColumnCards = actualData; 
    } else {
        leftColumnCards = actualData.filter((category: MappedCategories) => LEFT_COLUMN_CATEGORIES.has(category.name));
        rightColumnCards = actualData.filter((category: MappedCategories) => !LEFT_COLUMN_CATEGORIES.has(category.name));
    }

    /* Helper to get raw data array by Category Enum */
    const getCardFragment = (category: CardCategory) => {
        return specimen?.mappedData?.find((cat: CategoryConfig) => cat.name === category)?.data || [];
    };

    /* Helper to get a field value */
    const getFieldValue = (category: CardCategory, label: string) => {
        return getCardFragment(category).find((field: UIProperty) => field.label === label)?.value;
    };

    const handleOpenAnnotation = (target?: AnnotationTargetPayload) => {
        if (target) {
            dispatch(setAnnotationTarget(target));
        } else {
            /* Fallback if no target is specified, jsonPath resolves to entire class */
            dispatch(setAnnotationTarget({
                type: 'class',
                jsonPath: "",
                directPath: true
            }));
        }
        setAnnotationMode(true);
    };

    return (
        <div className="digital-specimen-page">
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
                AnnotateHelper={() => handleOpenAnnotation()}
            >
            </Hero>
            <main className="digital-specimen-container">
                <div id="ds-left-column">
                    { hasImages ? (
                        <ImageCard specimen={specimen}></ImageCard>
                    ) : (
                        leftColumnCards.map((category: MappedCategories) => (
                            <DigitalSpecimenCard 
                                key={category.name}
                                cardHeader={category.name} 
                                fragment={category.data}
                                {...CARD_CONFIGS[category.name as CardCategory]} 
                            />
                        ))
                    )}
                    
                </div>
                <div id="ds-right-column">
                    {rightColumnCards.map((category: MappedCategories) => (
                        <DigitalSpecimenCard 
                            key={category.name}
                            cardHeader={category.name} 
                            fragment={category.data}
                            AnnotateHelper={handleOpenAnnotation}
                            {...CARD_CONFIGS[category.name as CardCategory]} 
                        />
                    ))}
                </div>
            </main>
            {annotationMode && (
                <>
                    <button
                        type="button"
                        className="annotation-panel-overlay"
                        tabIndex={0}
                        aria-label="Close annotation panel"
                        onClick={() => setAnnotationMode(false)} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                setAnnotationMode(false);
                            }
                        }}
                    ></button>
                    <aside className="annotation-panel-container">
                        <AnnotationSidePanel
                            superClass={specimen.data.attributes.digitalSpecimen}
                            schema={DigitalSpecimenSchema}
                            annotationCases={DigitalSpecimenAnnotationCases.annotationCases}
                            GetAnnotations={GetDigitalSpecimenComplete}
                            GetMas={GetDigitalSpecimenMas}
                            GetMasJobRecords={GetDigitalSpecimenMasJobRecords}
                            ScheduleMas={ScheduleDigitalSpecimenMas}
                            HideAnnotationSidePanel={() => setAnnotationMode(false)}
                        />
                    </aside>
                </>
            )}
        </div>
    );
};

export default DigitalSpecimenDetails;
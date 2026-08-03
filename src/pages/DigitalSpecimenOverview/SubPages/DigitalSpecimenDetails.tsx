/* Import components */
import { DigitalMediaCard } from "components/Cards/DigitalMediaCard/DigitalMediaCard";
import { DigitalSpecimenCard } from "components/Cards/DigitalSpecimenCard/DigitalSpecimenCard";

/* Import types */
import { MappedCategories } from "types/dataMapperTypes";
import { AnnotationTargetPayload, CARD_CONFIGS, CardCategory, LEFT_COLUMN_CATEGORIES } from "types/digitalSpecimenTypes";

/* Import styling */
import "./DigitalSpecimenDetails.scss";

interface Props {
    specimen: any,
    onAnnotate?: (target?: AnnotationTargetPayload) => void;
}

export const DigitalSpecimenDetails = ({ specimen, onAnnotate }: Props ) => {
    /* Base variables */
    const hasImages = specimen?.digitalMedia?.length > 0;
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

    return (
        <>
            {/* Desktop view */}
            <main className="digital-specimen-container" id="ds-desktop-view">
                <div id="ds-left-column">
                    { hasImages ? (
                        <DigitalMediaCard specimen={specimen}></DigitalMediaCard>
                    ) : (
                        leftColumnCards.map((category: MappedCategories) => (
                            <DigitalSpecimenCard 
                                key={category.name}
                                cardHeader={category.name} 
                                fragment={category.data}
                                AnnotateHelper={onAnnotate}
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
                            AnnotateHelper={onAnnotate}
                            {...CARD_CONFIGS[category.name as CardCategory]} 
                        />
                    ))}
                </div>
            </main>
            {/* Mobile view */}
            <main className="digital-specimen-container" id="ds-mobile-view">
                <div id="ds-left-column">
                    { hasImages &&
                        <DigitalMediaCard specimen={specimen}></DigitalMediaCard>
                    }
                    {actualData.map((category: MappedCategories) => (
                        <DigitalSpecimenCard 
                            key={category.name}
                            cardHeader={category.name} 
                            fragment={category.data}
                            AnnotateHelper={onAnnotate}
                            {...CARD_CONFIGS[category.name as CardCategory]} 
                        />
                    ))}
                    
                </div>
            </main>
        </>
    )
}
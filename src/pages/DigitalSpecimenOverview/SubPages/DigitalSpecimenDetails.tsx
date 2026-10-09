/* Import components */
import { DigitalMediaCard } from "components/Cards/DigitalMediaCard/DigitalMediaCard";
import { DigitalMediaList } from "components/Cards/DigitalMediaCard/DigitalMediaList";
import { DigitalSpecimenCard } from "components/Cards/DigitalSpecimenCard/DigitalSpecimenCard";

/* Import hooks */
import { useDigitalMediaRetriever } from "hooks/useDigitalMedia";
import { useNavigate } from "react-router-dom";

/* Import types */
import { MappedCategories } from "types/dataMapperTypes";
import { AnnotationTargetPayload, CARD_CONFIGS, CardCategory, LEFT_COLUMN_CATEGORIES } from "types/digitalSpecimenTypes";

/* Import styling */
import "./DigitalSpecimenDetails.scss";


interface Props {
    specimen: any;
    onAnnotate?: (target?: AnnotationTargetPayload) => void;
}

export const DigitalSpecimenDetails = ({ specimen, onAnnotate }: Props) => {
    /* Execute hook to get the IIIF images or fallback to JPEG */
    const { mainImage, setMainImage, activeId, cleanDoiPath, correctImageFormats } = useDigitalMediaRetriever(specimen);
    const navigate = useNavigate();

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

    const renderMediaGallery = () => (
        <div className="digital-media-container--sticky">
            <DigitalMediaCard 
                imageUri={mainImage} 
                activeId={activeId}
                ImageAction={() => navigate(`/dm/${cleanDoiPath}`)}
            />
            <DigitalMediaList 
                images={correctImageFormats} 
                activeImage={mainImage} 
                onSelectImage={setMainImage} 
            />
        </div>
    );

    return (
        <>
            {/* Desktop view */}
            <section className="digital-specimen-container" id="ds-desktop-view">
                <div id="ds-left-column">
                    {hasImages ? (
                        renderMediaGallery()
                    ) : (
                        leftColumnCards.map((category: MappedCategories) => (
                            <DigitalSpecimenCard 
                                key={category.name}
                                cardHeader={category.name} 
                                fragment={category.data}
                                isVerified={category.isVerified}
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
            </section>

            {/* Mobile view */}
            <section className="digital-specimen-container" id="ds-mobile-view">
                <div id="ds-left-column">
                    {hasImages && renderMediaGallery()}
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
            </section>
        </>
    );
};
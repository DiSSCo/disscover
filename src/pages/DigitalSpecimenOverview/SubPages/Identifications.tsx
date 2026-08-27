import { DigitalSpecimenCard } from "components/Cards/DigitalSpecimenCard/DigitalSpecimenCard"
import { AnnotationTargetPayload, CARD_CONFIGS, CardCategory } from "types/digitalSpecimenTypes";

interface Props {
    data: any,
    onAnnotate?: (target?: AnnotationTargetPayload) => void;
}

export const Identifications = ({ data, onAnnotate }: Props) => {
    return (
        <section className="digital-specimen-container">
            <DigitalSpecimenCard 
                cardHeader="Identification" 
                fragment={data}
                AnnotateHelper={onAnnotate}
                {...CARD_CONFIGS[CardCategory.Identification]} 
            />
        </section>
    )
}
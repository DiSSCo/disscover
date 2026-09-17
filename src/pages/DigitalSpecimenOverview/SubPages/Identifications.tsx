import { DigitalSpecimenCard } from "components/Cards/DigitalSpecimenCard/DigitalSpecimenCard"
import { AnnotationTargetPayload, CARD_CONFIGS, CardCategory, SpecimenField } from "types/digitalSpecimenTypes";

interface Props {
    identificationData: any,
    onAnnotate?: (target?: AnnotationTargetPayload) => void;
}

export const Identifications = ({ identificationData, onAnnotate }: Props) => {
    return (
        <section className="digital-specimen-container">
            <div id="ds-left-column">
                { identificationData.map((id: { mappedFields: SpecimenField[]; isVerified: boolean | undefined; key: string }) => {
                    return <DigitalSpecimenCard 
                        key={id.key}
                        cardHeader="Identification" 
                        fragment={id.mappedFields}
                        AnnotateHelper={onAnnotate}
                        {...CARD_CONFIGS[CardCategory.Identification]}
                        isVerified={id.isVerified}
                    />
                })

                }
                
            </div>
        </section>
    )
}
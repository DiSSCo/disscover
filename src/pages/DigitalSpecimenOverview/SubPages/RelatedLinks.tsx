/* Import components */
import { DigitalSpecimenCard } from "components/Cards/DigitalSpecimenCard/DigitalSpecimenCard";

/* Import types */
import { UIProperty } from "types/dataMapperTypes";

interface Props {
    data: UIProperty[],
}

export const RelatedLinks = ({ data }: Props) => {
    return (
        <section>
            <DigitalSpecimenCard
                fragment={data}
            >

            </DigitalSpecimenCard>
        </section>

    )
}
/* Import components */
import { DigitalSpecimenCard } from "components/Cards/DigitalSpecimenCard/DigitalSpecimenCard";

/* Import types */
import { SpecimenField } from "types/digitalSpecimenTypes";

interface Props {
    data: SpecimenField[],
}

export const DigitalMediaDetails = ({ data }: Props) => {
    return (
        <section>
            <DigitalSpecimenCard fragment={data} layout="three-column"></DigitalSpecimenCard>
        </section>
    )
}
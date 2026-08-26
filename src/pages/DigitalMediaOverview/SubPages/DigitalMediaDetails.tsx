import { DigitalSpecimenCard } from "components/Cards/DigitalSpecimenCard/DigitalSpecimenCard"

interface Props {
    data: any,
}

export const DigitalMediaDetails = ({data}: Props) => {
    return (
        <section>
            <DigitalSpecimenCard fragment={data}></DigitalSpecimenCard>
        </section>
    )
}
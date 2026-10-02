/* Import components */
import { DigitalMediaCard } from "components/Cards/DigitalMediaCard/DigitalMediaCard";
import { DigitalSpecimenCard } from "components/Cards/DigitalSpecimenCard/DigitalSpecimenCard";

interface Props {
    data: any;
}

export const DigitalMediaDetails = ({ data }: Props) => {
    /* Base variables */
    const accessUri = data?.data?.attributes?.['ac:accessURI'] || data?.mainImage;

    return (
        <>                      
            {/* Standard flow layout for details view */}
            <section className="digital-media-container">
                <DigitalMediaCard imageUri={accessUri} />
            </section>
            
            {data?.digitalMediaData && (
                <section>
                    <DigitalSpecimenCard 
                        fragment={data.digitalMediaData} 
                        layout="three-column" 
                    />
                </section>
            )}
        </>
    );
};
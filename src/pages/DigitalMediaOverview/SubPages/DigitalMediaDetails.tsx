/* Import components */
import { DigitalMediaCard } from "components/Cards/DigitalMediaCard/DigitalMediaCard";
import { DigitalSpecimenCard } from "components/Cards/DigitalSpecimenCard/DigitalSpecimenCard";

/* Import styling */
import './DigitalMediaDetails.scss';
import { useSingleIIIFConverter } from "hooks/useDigitalMedia";

interface Props {
    data: any;
}

export const DigitalMediaDetails = ({ data }: Props) => {
    const attributes = data?.data?.attributes;
    const format = attributes?.["dcterms:format"]?.toLowerCase();
    const rawUri = attributes?.["ac:accessURI"];

    /* Check if uri needs to be converted from IIIF to JPG */
    const needsConversion = format === 'application/json';
    const { data: convertedUri, isLoading } = useSingleIIIFConverter(
        needsConversion ? rawUri : null
    );

    /* Resolve imageUri to the correct uri */
    const imageUri = needsConversion ? convertedUri : rawUri;

    if (isLoading && needsConversion) {
        return <div><p>Image is loading...</p></div>;
    }

    return (
        <>
            {imageUri && (
                <section className="digital-media-details-container">
                    <DigitalMediaCard imageUri={imageUri} isFullView={true} />
                </section>
            )}
            
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
import { RetrieveEnvVariable } from "app/Utilities";
import { useDigitalSpecimenComplete } from "hooks/useDigitalSpecimen";

/* Import styling */
import './VirtualCollectionImage.scss';

/* Import images */
import spinner from 'assets/images/_spinner-animation.svg';

interface Props {
    collection: any
}

export const VirtualCollectionImage = ({ collection }: Props) => {
    const specimenDoi = collection['id'].replace(RetrieveEnvVariable('DOI_URL'), '');
    const hasMedia = Boolean(collection.attributes?.['ods:isKnownToContainMedia']);

    const { data: specimen, isLoading, isError } = useDigitalSpecimenComplete({ 
        doi: specimenDoi,
        enabled: hasMedia
    });

    /* Find the first jpg/jpeg media item of the digital specimen */
    const firstJpgItem = specimen?.digitalMedia?.find((item: any) => {
        const format = item?.digitalMediaObject?.['dcterms:format'];
        return ['image/jpeg', 'image/jpg'].includes(format);
    });
    
    const firstJpgUrl = firstJpgItem?.digitalMediaObject?.['ac:accessURI'];

    /* The conditional display states of the images */
    const showLoading = isLoading;
    const showImage = !isLoading && !isError && hasMedia && firstJpgUrl;
    const showFallback = !isLoading && (!hasMedia || isError || !firstJpgUrl);

    return (
        <>
            {showLoading && (
                <div className="vc-card-box-container">
                    <img src={spinner} alt="Loading spinner" id="spinner"/>
                </div>
            )}

            {showImage && (
                <div 
                    className="vc-card-image-container"
                    role="img"
                    aria-label={`Image of digital specimen ${specimenDoi}`}
                    style={{ backgroundImage: `url(${firstJpgUrl})` }} 
                />
            )}

            {showFallback && (
                <div className="vc-card-box-container">
                    <span>{isError ? 'Error loading image' : 'No image'}</span>
                </div>
            )}
        </>
    );
};
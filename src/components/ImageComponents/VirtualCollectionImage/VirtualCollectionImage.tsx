import { RetrieveEnvVariable } from "app/Utilities";
import { useDigitalSpecimenComplete } from "hooks/useDigitalSpecimen";

/* Import styling */
import './VirtualCollectionImage.scss';

interface Props {
    collection: any
}

export const VirtualCollectionImage = ({ collection }: Props) => {
    const specimenDoi = collection['id'].replace(RetrieveEnvVariable('DOI_URL'), '');
    const hasMedia = Boolean(collection.attributes?.['ods:isKnownToContainMedia']);

    const { data: specimen } = useDigitalSpecimenComplete({ 
        doi: specimenDoi,
        enabled: hasMedia
    });

    /* Find the first jpg/jpeg media item of the digital spacimen */
    const firstJpgItem = specimen?.digitalMedia?.find((item: any) => {
        const format = item?.digitalMediaObject?.['dcterms:format'];
        return format === 'image/jpeg' || format === 'image/jpg';
    });
    
    const firstJpgUrl = firstJpgItem?.digitalMediaObject?.['ac:accessURI'];

    return hasMedia && firstJpgUrl ? (
        <div className="vc-card-image-container" style={{ backgroundImage: `url(${firstJpgUrl})` }} />
    ) : (
        <div className="vc-card-box-container">
            <span>{hasMedia ? 'Error loading image' : 'No image'}</span>
        </div>
    );
};
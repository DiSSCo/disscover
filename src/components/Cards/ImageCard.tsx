import { RetrieveEnvVariable } from "app/Utilities";
import { useEffect, useState } from "react";
import { getJpegFromIIIFImages } from 'services/digitalMediaService/getThumbnailImages';

interface Props {
    specimen: any;
}

interface ImageFormat {
    img: string;
    id: string;
}

export const ImageCard = ({ specimen }: Props ) => {
    /* Base variables */
    const allImages = specimen?.DIGITAL_MEDIA?.map((item: any) => item['digitalMediaObject']) || [];
    const [correctImageFormats, setCorrectImageFormats] = useState<ImageFormat[]>([]);
    const [mainImage, setMainImage] = useState<string | null>(null);
    const activeImageObject = correctImageFormats.find(item => item.img === mainImage);
    const activeId = activeImageObject?.id || specimen?.DIGITAL_MEDIA?.[0]?.['digitalMediaObject']?.["@id"] || '';
    const cleanDoiPath = activeId.replace(RetrieveEnvVariable('DOI_URL'), '');

    /**
     * This useEffect hook retrieves the jpg/jpeg url from IIIF images upon loading
     * @returns Either jpg/jpeg id and img or null if image is not jpeg/jpg or iiif (json)
     */
    useEffect(() => {
        (async () => {
            if (!allImages.length) return;

            const promises = allImages.map(async (img: any) => {
                const format = img["dcterms:format"]?.toLowerCase();
                const isJson = format === 'application/json';
                const isJpeg = format === 'image/jpeg' || format === 'image/jpg';
                
                if (isJpeg) return { img: img["ac:accessURI"], id: img["@id"] };
                if (isJson) return { img: await getJpegFromIIIFImages(img), id: img["@id"] };
                return null;
            });
    
            const results = await Promise.all(promises);
            const filteredResults = results.filter((item): item is ImageFormat => item !== null);
            
            setCorrectImageFormats(filteredResults);

            if (filteredResults.length > 0) {
                setMainImage(filteredResults[0].img);
            }
        })();
    }, [specimen]);

    return (
        <div className="digital-media-container">
            <div className="digital-media-card">
                {mainImage ? (
                    <a href={`/dm/${cleanDoiPath}`}>
                        <div 
                            style={{ backgroundImage: `url(${mainImage})` }} 
                            className="digital-media-card-image"
                        ></div>
                    </a>
                ) : (
                    // Laad-indicator of placeholder totdat de async fetch klaar is
                    <div className="digital-media-card-image placeholder">Laden...</div>
                )}
            </div>
            
            {correctImageFormats.length > 0 && (
                <div className="digital-media-list">
                    {correctImageFormats.map((image) => (
                        <button
                            key={image.id}
                            onClick={() => setMainImage(image.img)}
                            className="digital-media-thumb-btn"
                        >
                            <img
                                src={image.img} 
                                alt={`${image.id}`}
                                className={image.img === mainImage ? 'active' : ''}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
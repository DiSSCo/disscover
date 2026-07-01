import { RetrieveEnvVariable } from "app/Utilities";
import { useEffect, useState } from "react";
import { getThumbnailImages } from 'services/digitalMediaService/getThumbnailImages';

interface Props {
    specimen: any;
}

interface ImageFormat {
    img: string | null;
    id: string;
}

export const ImageCard = ({ specimen }: Props ) => {
    /* Base variables */
    const firstImageOfImages = specimen?.DIGITAL_MEDIA?.[0]?.['digitalMediaObject']?.['ac:accessURI'];
    const altText = `Image of ${specimen.IDENTIFICATION.scientificName.value}`;
    const allImages = specimen?.DIGITAL_MEDIA.map((item: any) => { return item['digitalMediaObject'] });
    const [correctImageFormats, setCorrectImageFormats] = useState<ImageFormat[]>([]);
    const [mainImage, setMainImage] = useState(firstImageOfImages);

    useEffect(() => {
        (async () => {
            const promises = allImages.map(async (img: any) => {
                const isJson = img["dcterms:format"] === 'application/json';
                const isJpeg = img["dcterms:format"] === 'image/jpeg' || img["dcterms:format"] === 'image/jpg';
                
                if (isJpeg) return { img: img["ac:accessURI"], id: img["@id"] };
                if (isJson) return { img: await getThumbnailImages(img), id: img["@id"] };
                return null;
            });
    
            const results = await Promise.all(promises);
            setCorrectImageFormats(results.filter(Boolean));
        })();
    }, [specimen]);

    return (
        <div className="digital-media-container">
            <div className="digital-media-card">
                <a href={`/dm/${specimen?.DIGITAL_MEDIA?.[0]?.['digitalMediaObject']?.["@id"].replace(RetrieveEnvVariable('DOI_URL'), '')}`}>
                    <img src={mainImage} alt={altText} className="digital-media-card-image" />
                </a>
            </div>
            { correctImageFormats && 
                <div className="digital-media-list">
                    { correctImageFormats.map((image: any) => {
                        return (
                            <button
                                key={image?.['id']}
                                onClick={() => setMainImage(image?.['img'])}
                            >
                                <img
                                    src={image.img} alt={"Image for " + image['id']}
                                    className={image.img === mainImage ? 'active' : ''}
                                />
                            </button>
                        )
                    })}
                </div>
            }
        </div>

    )
}
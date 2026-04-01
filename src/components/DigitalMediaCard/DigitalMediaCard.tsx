/* Import components */
import { Button, Card } from "@radix-ui/themes";

/* Import styles */
import './DigitalMediaCard.scss';
import { useState } from "react";

type Props = {
    specimen: any
}

export const DigitalMediaCard = ({ specimen }: Props) => {
    /* Base variables */
    const firstImageOfImages = specimen?.DIGITAL_MEDIA?.[0]?.['digitalMediaObject']?.['ac:accessURI'];
    const altText = `Image of ${specimen.IDENTIFICATION.scientificName.value}`;
    const [digitalSpecimenImage, setDigitalSpecimenImage] = useState<string>(firstImageOfImages);
    const findAllImages = specimen?.DIGITAL_MEDIA?.map((image: any) => {
        return image['digitalMediaObject']['ac:accessURI'];
    });
    console.log(findAllImages);

    const showImage = (image: any) => {
        return () => {
            setDigitalSpecimenImage(image);
        }
    }

    return (
        <div>
            <Card className="digital-media-card">
                <img src={digitalSpecimenImage} alt={altText} className="digital-media-card-image" />
            </Card>
            <div className="digital-media-card-list">
                {findAllImages.map((image: any) => {
                    return (
                        <Button key={image} asChild variant="ghost" onClick={showImage(image)}>
                            <img src={image} alt={altText}  />
                        </Button>
                        
                    )
                })}
            </div>
        </div>
    )
}
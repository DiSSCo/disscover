/* Import types */
import { ImageFormat } from "types/digitalMediaTypes";

interface Props {
    images: ImageFormat[];
    activeImage: string | null;
    onSelectImage: (imgUri: string) => void;
}

export const DigitalMediaList = ({ images, activeImage, onSelectImage }: Props) => {
    if (!images.length) return null;

    return (
        <div className="digital-media-list">
            {images.map((image) => (
                <button
                    key={image.id}
                    onClick={() => onSelectImage(image.img)}
                    className="digital-media-thumb-btn"
                    type="button"
                >
                    <img
                        src={image.img} 
                        alt={image.id}
                        className={image.img === activeImage ? 'active' : ''}
                    />
                </button>
            ))}
        </div>
    );
};
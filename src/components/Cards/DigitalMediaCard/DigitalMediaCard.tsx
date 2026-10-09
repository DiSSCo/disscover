/* Import styling */
import './DigitalMediaCard.scss';

interface Props {
    imageUri?: string | null;
    activeId?: string;
    ImageAction?: Function;
    isFullView?: boolean;
}

export const DigitalMediaCard = ({ imageUri, activeId = '', ImageAction, isFullView = false }: Props) => {
    if (!imageUri) {
        return <div className="image-placeholder"><p>Something went wrong with the image</p></div>;
    }

    return (
        <>
        { ImageAction ? 
            <button onClick={() => ImageAction()}>
                <img 
                    src={`${imageUri}`}
                    aria-label={`Image of digital specimen ${activeId}`}
                    className={`digital-media-card-image ${isFullView ? 'fullView' : ''}`}
                />
            </button>
        :
        <img 
            src={`${imageUri}`}
            aria-label={`Image of digital specimen ${activeId}`}
            className={`digital-media-card-image ${isFullView ? 'fullView' : ''}`}
        />
        }
        </>
    );
};
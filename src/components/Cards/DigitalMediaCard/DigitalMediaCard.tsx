/* Import components */
import { Link } from "react-router-dom";

/* Import styling */
import './DigitalMediaCard.scss';

interface Props {
    imageUri?: string | null;
    cleanDoiPath?: string;
    activeId?: string;
}

export const DigitalMediaCard = ({ imageUri, cleanDoiPath = '', activeId = '' }: Props) => {
    if (!imageUri) {
        return <div className="digital-media-card-image placeholder">Loading...</div>;
    }

    return (
        <div className="digital-media-card">
            { cleanDoiPath ? 
            <Link to={`/dm/${cleanDoiPath}`}>
                <div 
                    role="img"
                    aria-label={`Image of digital specimen ${activeId}`}
                    style={{ backgroundImage: `url(${imageUri})` }} 
                    className="digital-media-card-image"
                />
            </Link>
            :
            <div 
                role="img"
                aria-label={`Image of digital specimen ${activeId}`}
                style={{ backgroundImage: `url(${imageUri})` }} 
                className="digital-media-card-image"
            />
            }
            
        </div>
    );
};
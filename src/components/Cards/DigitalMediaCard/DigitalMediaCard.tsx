/* Import styling */
import './DigitalMediaCard.scss';
import '@annotorious/react/annotorious-react.css';

/* Import dependencies */
import { OpenSeadragonAnnotator, OpenSeadragonViewer, W3CImageFormat, Annotorious } from '@annotorious/react';
import { useMemo } from 'react';

/* Import constants */
import { OSD_URL } from 'utils/Constants';

interface Props {
    imageUri?: string | null;
    activeId?: string;
    ImageAction?: Function;
}

export const DigitalMediaCard = ({ imageUri, activeId = '', ImageAction }: Props) => {
    /* Base variables */
    if (!imageUri) {
        return <div className="image-placeholder"><p>Something went wrong with the image</p></div>;
    }

    /* Set OpenSeaDragon options based on ImageUri (that is already converted to jpg) */
    const options = useMemo(() => ({
        tileSources: {
          type: 'image',
          url: imageUri
        },
        /* Zoom adjustments */
        maxZoomLevel: 5,
        minZoomLevel: 0.4,
        prefixUrl: OSD_URL,
        showNavigationControl: true,
    }), [imageUri]);

    return (
        <>
        { ImageAction ? 
            <button onClick={() => ImageAction()}>
                <img 
                    src={`${imageUri}`}
                    aria-label={`Image of digital specimen ${activeId}`}
                    className='digital-media-card-image'
                />
            </button>
        :
        <div className="osd-container">
            <Annotorious>
                <OpenSeadragonAnnotator
                    adapter={W3CImageFormat(imageUri)}
                >
                    <OpenSeadragonViewer options={options} className="osd-viewer" />
                </OpenSeadragonAnnotator>
            </Annotorious>
        </div>
        }
        </>
    );
};
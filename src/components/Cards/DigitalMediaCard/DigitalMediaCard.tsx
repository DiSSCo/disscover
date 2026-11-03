/* Import styling */
import './DigitalMediaCard.scss';
import '@annotorious/react/annotorious-react.css';

/* Import dependencies */
import { Annotorious } from '@annotorious/react';
import { useMemo } from 'react';

/* Import constants */
import { OSD_URL } from 'utils/Constants';

/* Import components */
import { AnnotationControls } from 'components/AnnotationControls/AnnotationControls';

interface Props {
    imageUri?: string | null;
    activeId?: string;
    ImageAction?: Function;
    isDrawingEnabled: boolean;
    digitalMedia?: any;
    onAnnotationSaved?: () => void;
}

export const DigitalMediaCard = ({ imageUri, activeId = '', ImageAction, isDrawingEnabled, digitalMedia,
    onAnnotationSaved }: Props) => {
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
        prefixUrl: OSD_URL,
        showNavigationControl: true,
        defaultZoomLevel: 0,
        minZoomLevel: 0.1,
        maxZoomLevel: 10,
        visibilityRatio: 1,
        constrainDuringPan: true,
        homeFillsViewer: false,
        gestureSettingsMouse: {
            clickToZoom: false,
            dblClickToZoom: false,
        },
        gestureSettingsPen: {
            clickToZoom: false,
            dblClickToZoom: false,
        },
        gestureSettingsTouch: {
            clickToZoom: false,
            pinchToZoom: false,
        }
    }), [imageUri]);

    return (
        <>
        { ImageAction ? 
            <button onClick={() => ImageAction()}>
                <div className="digital-media-card-container">
                    <img 
                        src={`${imageUri}`}
                        aria-label={`Image of digital specimen ${activeId}`}
                        className='digital-media-card-image'
                    />
                </div>
            </button>
        :
        <div className="osd-container">
            <Annotorious>
                <AnnotationControls
                    options={options}
                    imageUri={imageUri}
                    isDrawingEnabled={isDrawingEnabled}
                    digitalMedia={digitalMedia}
                    onAnnotationSaved={onAnnotationSaved}
                ></AnnotationControls>
            </Annotorious>
        </div>
        }
        </>
    );
};
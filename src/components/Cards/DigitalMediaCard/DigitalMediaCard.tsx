/* Import styling */
import './DigitalMediaCard.scss';
import '@annotorious/react/annotorious-react.css';

/* Import dependencies */
import { Annotorious, OpenSeadragonAnnotator, UserSelectAction, W3CImageFormat } from '@annotorious/react';
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
          visibilityRatio: 0.2,
          constrainDuringPan: false,
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
                <div className="osd-annotator-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <OpenSeadragonAnnotator
                        adapter={W3CImageFormat(imageUri)}
                        drawingEnabled={isDrawingEnabled}
                        tool="rectangle"
                        drawingMode="click"
                        userSelectAction={UserSelectAction.SELECT}
                    >
                        <AnnotationControls
                            options={options}
                            imageUri={imageUri}
                            isDrawingEnabled={isDrawingEnabled}
                            digitalMedia={digitalMedia}
                            onAnnotationSaved={onAnnotationSaved}
                        ></AnnotationControls>
                    </OpenSeadragonAnnotator>
                </div>
            </Annotorious>
        </div>
        }
        </>
    );
};
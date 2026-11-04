/* Import styling */
import './DigitalMediaCard.scss';
import '@annotorious/react/annotorious-react.css';

/* Import dependencies */
import { OpenSeadragonAnnotator, W3CImageFormat, Annotorious, UserSelectAction } from '@annotorious/react';
import { useMemo } from 'react';

/* Import constants */
import { OSD_URL } from 'utils/Constants';

/* Import components */
import { AnnotoriousControls } from 'components/AnnotoriousControls/AnnotoriousControls';

/* Import types */
import { OsdOptions } from 'types/annotationTypes';

interface Props {
    imageUri?: string | null;
    activeId?: string;
    ImageAction?: Function;
    isDrawingEnabled: boolean;
    identifier: string;
}

export const DigitalMediaCard = ({ imageUri, activeId = '', ImageAction, isDrawingEnabled, identifier }: Props) => {
    /* Base variables */
    if (!imageUri) {
        return <div className="image-placeholder"><p>Something went wrong with the image</p></div>;
    }

    /* Set OpenSeaDragon options based on ImageUri (that is already converted to jpg) */
    const options: OsdOptions = useMemo(() => ({
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
                <OpenSeadragonAnnotator
                    adapter={W3CImageFormat(imageUri)}
                    drawingEnabled={isDrawingEnabled}
                    tool="rectangle"
                    drawingMode="click"
                    userSelectAction={UserSelectAction.SELECT}
                >
                    <AnnotoriousControls osdOptions={options} identifier={identifier} imageUri={imageUri}>
                    </AnnotoriousControls>
                </OpenSeadragonAnnotator>
            </Annotorious>
        </div>
        }
        </>
    );
};
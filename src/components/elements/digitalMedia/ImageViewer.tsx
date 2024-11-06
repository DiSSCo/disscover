/* Import Dependencies */
import { Annotorious, OpenSeadragonAnnotator, OpenSeadragonViewer } from '@annotorious/react';


/* Props Type */
type Props = {
    mediaUrl: string
};


/**
 * Component that renders a dynamic image viewer including the ability to make annotations
 * @returns JSX Component
 */
const ImageViewer = (props: Props) => {
    const { mediaUrl } = props;

    /* Open Seadragon options */
    const osdOptions: OpenSeadragon.Options = {
        tileSources: {
            type: 'image',
            url: mediaUrl
        },
        prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@3.1/build/openseadragon/images/",
        gestureSettingsMouse: {
            clickToZoom: false
        }
    };

    /* Style of Open Seadragon Annotator */
    const style = () => ({

    });

    return (
        <div className="h-100">
            <Annotorious>
                <OpenSeadragonAnnotator style={style}>
                    <OpenSeadragonViewer options={osdOptions}
                        className="h-100 bgc-grey-light"
                    />
                </OpenSeadragonAnnotator>
            </Annotorious>
        </div>
    );
};

export default ImageViewer;
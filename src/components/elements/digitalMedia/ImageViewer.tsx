// @ts-nocheck

/* Import Dependencies */
import { Annotorious, OpenSeadragonAnnotator, OpenSeadragonViewer, Viewer } from '@annotorious/react';
import { useState } from 'react';

/* Import Hooks */
import { useTrigger } from 'app/Hooks';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';
import { Dict } from 'app/Types';

/* Import Components */
import { LoadingScreen } from '../customUI/CustomUI';


/* Props Type */
type Props = {
    digitalMedia: DigitalMedia
};


/**
 * Component that renders a dynamic image viewer including the ability to make annotations
 * @returns JSX Component
 */
const ImageViewer = (props: Props) => {
    const { digitalMedia } = props;

    /* Hooks */
    const trigger = useTrigger();

    /* Base variables */
    const [osdOptions, setOsdOptions] = useState<OpenSeadragon.Options | undefined>();

    /* OnLoad, check for image format (image/jpeg for still images and application/json for IIIF) and set source url */
    trigger.SetTrigger(async () => {
        if (digitalMedia['dcterms:format'] === 'application/json') {
            /* Get manifest */
            const manifest: Dict = await (await fetch(digitalMedia['ac:accessURI'])).json();

            /* Try to structure the info.json file link from the first image in the manifest file */
            let infoUrl: string = '';
            let context: string | string[] = manifest['@context'][1];
            let width: number = 0;
            let height: number = 0;

            /* First try manifest version 2, if it fails try version 3 */
            try {
                /* Manifest version 2 */
                let versionTwoId = manifest.sequences[0].canvases[0].images[0].resource['@id'];

                if (!(versionTwoId.includes('/info.json'))) {
                    versionTwoId = manifest.sequences[0].canvases[0].images[0].resource.service['@id'];
                }

                infoUrl = versionTwoId.replace('/info.json', '');

                /* Set Canvas Width and Height */
                width = manifest.sequences[0].canvases[0].width;
                height = manifest.sequences[0].canvases[0].height;
            } catch {
                /* Manifest version 3 */
                const versionThreeId = manifest.items[0].items[0].items[0].body.id;

                infoUrl = versionThreeId.replace('/info.json', '');

                /* Set Canvas Width and Height */
                width = versionThreeId.items[0].width;
                height = versionThreeId.items[0].height;
            };

            setOsdOptions({
                id: "openSeaDragon",
                preserveViewport: true,
                visibilityRatio: 1,
                defaultZoomLevel: 0,
                sequenceMode: true,
                tileSources: {
                    "@context": context,
                    "@id": infoUrl,
                    "height": height,
                    "width": width,
                    "profile": ["https://iiif.io/api/image/2/level2.json"],
                    "protocol": "http://iiif.io/api/image",
                    "tiles": [{
                        "scaleFactors": [1, 2, 4, 8, 16, 32],
                        "width": 1024
                    }]
                },
                showFullPageControl: false,
                showHomeControl: false,
                prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@2.4/build/openseadragon/images/"
            });
        } else {
            /* Set OpenSeadragon options */
            setOsdOptions({
                tileSources: {
                    type: 'image',
                    url: digitalMedia['ac:accessURI']
                },
                prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@3.1/build/openseadragon/images/",
                gestureSettingsMouse: {
                    clickToZoom: false
                }
            });
        }
    }, [digitalMedia]);

    /* Style of Open Seadragon Annotator */
    const style = () => ({

    });

    return (
        <div className="h-100 position-relative">
            {osdOptions ?
                <Annotorious>
                    <OpenSeadragonAnnotator style={style}>
                        <OpenSeadragonViewer options={osdOptions}
                            className="h-100 bgc-grey-light"
                        />
                    </OpenSeadragonAnnotator>
                </Annotorious>
                : <LoadingScreen visible
                    text="Loading digital media"
                    displaySpinner
                />
            }
        </div>
    );
};

export default ImageViewer;